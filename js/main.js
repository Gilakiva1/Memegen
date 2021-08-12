'use strict';
var gCanvas;
var gCtx;
var gIsMouseDown = false;
var gStartPos;
var gNextShape;
var gIsDownload = false;
var countDownload = 0;
var sticker = []
const gTouchEvs = ['touchstart', 'touchmove', 'touchend']



function init() {
    gCanvas = document.querySelector('canvas')
    gCtx = gCanvas.getContext('2d')
    // renderCanvas();
    renderImg();
    renderStickers();
    addListeners();
}

function onDown(ev) {
    const pos = getEvPos(ev);
    if (!isTxtClicked(pos)) return
    gStartPos = pos
    document.body.style.cursor = 'grabbing'
    gIsMouseDown = true
}

function onUp(ev) {
    gIsMouseDown = false;
}

function onMove(ev) {
    if (!gIsMouseDown) return;
    if (!gStartPos) return
    const pos = getEvPos(ev);
    const dx = pos.x - gStartPos.x
    const dy = pos.y - gStartPos.y
    gStartPos = pos;
    movePosTxt(dx, dy);
    renderCanvas();
}

function getEvPos(ev) {
    var pos = {
        x: ev.offsetX,
        y: ev.offsetY
    }
    if (gTouchEvs.includes(ev.type)) {
        ev.preventDefault()
        ev = ev.changedTouches[0]
        pos = {
            x: ev.pageX - ev.target.offsetLeft - ev.target.clientLeft,
            y: ev.pageY - ev.target.offsetTop - ev.target.clientTop
        }
    }
    return pos
}

function addMouseListeners() {
    gCanvas.addEventListener('mousemove', onMove)
    gCanvas.addEventListener('mousedown', onDown)
    gCanvas.addEventListener('mouseup', onUp)
}

function addTouchListeners() {
    gCanvas.addEventListener('touchmove', onMove)
    gCanvas.addEventListener('touchstart', onDown)
    gCanvas.addEventListener('touchend', onUp)
}

function addListeners() {
    addMouseListeners();
    addTouchListeners();
    window.addEventListener('resize', () => {
        // resizeCanvas();
        renderCanvas()
    })
}
function onSetSticker(stickerId){
    
}

function renderStickers(){
    var stickers = getStickers()
    var strHtmls = stickers.map(sticker => {
        return `<div onclick="onSetSticker(${sticker.id})" class="sticker"><img src= "${sticker.url}"alt=""></div>`
    })
    var elStickers = document.querySelector('.stickers');
    elStickers.innerHTML = strHtmls.join('');
}

function renderImg() {
    var imgs = getImgs();
    var strHtmls = imgs.map(img => {
        return ` <div onclick =onEditor(${img.id}) class='image'><img src='${img.url}' alt=''></div>`
    })
    var elGallery = document.querySelector('.gallery');
    elGallery.innerHTML = strHtmls.join('');
}

function onEditor(imgId) {
    document.querySelector('.gallery').style.display = 'none';
    document.querySelector('.editor').style.display = 'flex';
    document.querySelector('.meme').style.display = 'none';
    setMeme(imgId)
    renderCanvas();
}

function exitEditor() {
    document.querySelector('.gallery').style.display = 'grid';
    document.querySelector('.editor').style.display = 'none';
    document.querySelector('.meme').style.display = 'none';
}


function renderCanvas() {
    const meme = getMeme();
    if (!meme) return
    if (meme.lines.length) {
        document.querySelector('.text').value = meme.lines[meme.selectedLineIdx].txt;
    } else {
        document.querySelector('.text').value = ''
    }
    document.querySelector('.text').value = meme.lines[meme.selectedLineIdx].txt;

    const img = new Image()
    const selecetdImg = findImg(meme.selectedImgId)
    img.src = `${selecetdImg.url}`;
    img.onload = () => {
        drewImg(img);
        meme.lines.forEach(drewTxt);
        // console.log(!getIsDownload() === false );
        if (!getIsDownload() && meme.lines[meme.selectedLineIdx].txt) {
            var pos = getPosRect();
            drawRect(pos.xStart, pos.yStart, pos.xEnd, pos.yEnd)
        } else if (getIsDownload()) {
            setIsDownload();
        }

    }

}

function drewTxt(line) {
    gCtx.font = `${line.size}px ${line.font}`;
    gCtx.lineWidth = 2;
    gCtx.textBaseline = 'top';
    gCtx.fillStyle = line.color
    gCtx.textAlign = line.align;
    gCtx.fillText(line.txt, line.x, line.y);
    gCtx.strokeStyle = line.borderColor
    gCtx.strokeText(line.txt, line.x, line.y);
}

function onChangeTxt(txt) {
    setTxt(txt, setSizeTxt(txt));
    renderCanvas();
}

function onTransferIdx() {
    transferIdx();
    const meme = getMeme()
    const index = meme.selectedLineIdx;
    const line = meme.lines[index];
    document.querySelector('.text').value = line.txt;
    renderCanvas();
}

function resizeCanvas(img) {
    gCanvas.width = img.url.w;
    gCanvas.height = img.height;
}

function drewImg(img) {
    gCtx.drawImage(img, 0, 0, gCanvas.width, gCanvas.height);
}

function onChangeFont(fontName) {
    changeFont(fontName);
    renderCanvas();
}


function setSizeTxt(txt) {
    return gCtx.measureText(txt);
}

function onChangeSize(num) {
    var txt = document.querySelector('.text').value;
    changeSize(num, setSizeTxt(txt))
    renderCanvas()
}

function onAddLine() {
    addLine();
    renderCanvas();
}

function onDeleteLine() {
    deleteLine();
    renderCanvas();
}

function onChangeAlign(align) {
    changeAlign(align)
    renderCanvas()
}

function drawRect(xStart, yStart, xEnd, yEnd) {
    gCtx.beginPath()
    gCtx.rect(xStart, yStart, xEnd, yEnd)
    gCtx.strokeStyle = 'black'
    gCtx.stroke()
}

function getPosRect() {
    var meme = getMeme()
    var line = meme.lines[meme.selectedLineIdx];
    if (line.align === 'left') {
        return {
            xStart: line.x - 10,
            yStart: line.y + line.size,
            xEnd: line.widthSize + 15,
            yEnd: 0 - line.size - 5
        }

    } else if (line.align === 'right') {
        return {
            xStart: line.x - line.widthSize - 10,
            yStart: line.y + 5 + line.size,
            xEnd: line.widthSize + 10,
            yEnd: 0 - line.size - 5
        }
    } else {
        return {
            xStart: line.x - line.widthSize / 2 - 5,
            yStart: line.y + 5 + line.size,
            xEnd: line.widthSize + 10,
            yEnd: 0 - line.size - 5
        }
    }
}

function onChangeColor() {
    var color = document.querySelector('.color').value;
    changeColor(color);
    renderCanvas();
}

function onChangeBorderColor() {
    var color = document.querySelector('.border-color').value;
    changeBorderColor(color);
    renderCanvas();
}

function _saveMemeToStorage() {
    saveToStorage('meme', gMemeSave)
}