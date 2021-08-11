'use strict';
var gCanvas;
var gCtx;

function init() {
    gCanvas = document.querySelector('canvas')
    gCtx = gCanvas.getContext('2d')
    // renderCanvas();
    addListeners();
    renderImg();
}

function onDown(ev) {
    console.log(ev);
    const pos = getEvPos(ev);
    gStartPos = pos;
    gIsMouseMove = true;
}

function onUp(ev) {
    gIsMouseMove = false;
}

function onMove(ev) {
    if (!gIsMouseMove) return;
    gNextShape = getEvPos(ev);
    drawShapes(ev);
    if (!gStartPos) return
    gSpeed = ((gStartPos.x - gNextShape.x) / 200) * 1.5;
    console.log(Math.abs(gSpeed));
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

function renderImg() {
    var imgs = getImgs();
    var strHtmls = imgs.map(img => {
        return ` <div onclick =onEditor(${img.id}) class='image'><img src='${img.url}' alt=''></div>`
    })
    var elGallery = document.querySelector('.gallery');
    elGallery.innerHTML = strHtmls.join('');
}

function onEditor(imgId) {

    document.querySelector('.gallery').style.visibility = 'hidden';
    document.querySelector('.editor').style.display = 'flex';
    setMeme(imgId)
    renderCanvas();
}

function exitEditor() {
    document.querySelector('.gallery').style.visibility = 'visible';
    document.querySelector('.editor').style.display = 'none';
}

function renderCanvas() {
    const meme = getMeme();
    if(meme.lines.length){
        document.querySelector('.text').value = meme.lines[meme.selectedLineIdx].txt;    
    }
    else {
        document.querySelector('.text').value = ''
    }
    document.querySelector('.text').value = meme.lines[meme.selectedLineIdx].txt;
    const img = new Image()
    const selecetdImg = findImg(meme.selectedImgId)
    img.src = `${selecetdImg.url}`;
    img.onload = () => {
        drewImg(img);
        meme.lines.forEach(drewTxt);
    }
}

function getAlignPos() {
   
}

function onChangeAlign(align){
    changeAlign(align)
    renderCanvas()
}

function drewTxt(line) {
    gCtx.font = `${line.size}px ${line.font}`;
    gCtx.lineWidth = 2;
    gCtx.textBaseline = 'top';
    gCtx.fillStyle = line.color
    gCtx.textAlign = line.align;
    gCtx.fillText(line.txt, line.x, line.y);
    gCtx.strokeStyle = '#000'
    gCtx.strokeText(line.txt, line.x, line.y);
}

function onChangeTxt(txt) {
    setTxt(txt);
    renderCanvas()
}

function onChangeSize(num) {
    changeSize(num)
    renderCanvas()
}

function onAddLine() {
    addLine();
    renderCanvas();
}
function onDeleteLine(){
    deleteLine();
    renderCanvas();
}

function onTransferIdx(){
    transferIdx();
    const meme = getMeme()
    const index = meme.selectedLineIdx;
    const line = meme.lines[index];
    console.log(index);
    document.querySelector('.text').value = line.txt;
}

function resizeCanvas(img) {
    gCanvas.width = img.url.w;
    gCanvas.height = img.height;
}

function drewImg(img) {
    gCtx.drawImage(img, 0, 0, gCanvas.width, gCanvas.height);
}

function onChangeFont(fontName){
    
    changeFont(fontName);
    renderCanvas();
}
function onEditMeme() {
    // editMeme();
}