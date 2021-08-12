'use strict';

var gImgs = [];
var gId = 1;
var gMeme;;
var gStickers = [];
_createImgs();
gId = 1;
_createStickers();

function getStickers(){
    return gStickers;
}
function changeColor(color) {
    gMeme.lines[gMeme.selectedLineIdx].color = color;

}

function changeBorderColor(color) {
    gMeme.lines[gMeme.selectedLineIdx].borderColor = color;

}

function changeFont(fontName) {
    const line = gMeme.lines[gMeme.selectedLineIdx];
    line.font = fontName;
}

function deleteLine() {
    var index = gMeme.selectedLineIdx;


    gMeme.lines.splice(index, 1);
    if (!gMeme.lines.length) {

        addLine();
    }
    gMeme.selectedLineIdx--;
}

function addLine() {
    var index = gMeme.lines.length - 1
    if (gMeme.lines.length > 2) {
        var yPx = gMeme.lines[index].y + 50;
    } else if (gMeme.lines.length === 2) {
        yPx = gMeme.lines[0].y + 50;
    } else if (!gMeme.lines.length) {
        yPx = 10;
    } else {
        yPx = 400;
    }
    gMeme.lines.push({
        font: 'Impact',
        txt: '',
        size: 20,
        align: 'left',
        color: '#fff',
        borderColor: '#000',
        x: 30,
        y: yPx
    })
    gMeme.selectedLineIdx++;
}

function transferIdx() {
    if (gMeme.lines.length - 1 === gMeme.selectedLineIdx) {
        gMeme.selectedLineIdx = 0
    } else {
        gMeme.selectedLineIdx++;
    }
}

function setMeme(imgId) {
    gMeme = {
        selectedImgId: imgId,
        selectedLineIdx: 0,
        lines: [{
            font: 'Impact',
            txt: '',
            size: 20,
            align: 'left',
            color: '#fff',
            borderColor: '#000',
            x: 30,
            y: 10,
            widthSize: 0
        }]
    };
}

function setSavedMeme(meme) {
    gMeme = meme
}

function changeAlign(align) {
    const line = gMeme.lines[gMeme.selectedLineIdx]
    line.align = align
    if (align === 'left') {
        line.x = 30
        // line.y = 10

    } else if (align === 'center') {
        line.x = gCanvas.width / 2
        // line.y = 10


    } else {
        line.x = gCanvas.width - 10
        // line.y = 10
    }
}

function setTxt(txt, sizeTxt) {
    const index = gMeme.selectedLineIdx;
    gMeme.lines[index].txt = txt;
    gMeme.lines[index].widthSize = sizeTxt.width;
}

function changeSize(num, sizeTxt) {
    const index = gMeme.selectedLineIdx;
    gMeme.lines[index].size += num;
    gMeme.lines[index].widthSize = sizeTxt.width;
}

function _createImgs() {
    var keyWords = 'first';
    createImg(gId++, './image/1.jpg', keyWords);
    createImg(gId++, './image/2.jpg', keyWords);
    createImg(gId++, './image/3.jpg', keyWords);
    createImg(gId++, './image/4.jpg', keyWords);
    createImg(gId++, './image/5.jpg', keyWords);
    createImg(gId++, './image/6.jpg', keyWords);
    createImg(gId++, './image/7.jpg', keyWords);
    createImg(gId++, './image/8.jpg', keyWords);
    createImg(gId++, './image/9.jpg', keyWords);
    createImg(gId++, './image/10.jpg', keyWords);
    createImg(gId++, './image/11.jpg', keyWords);
    createImg(gId++, './image/12.jpg', keyWords);
    createImg(gId++, './image/13.jpg', keyWords);
    createImg(gId++, './image/14.jpg', keyWords);
    createImg(gId++, './image/15.jpg', keyWords);
    createImg(gId++, './image/16.jpg', keyWords);
    createImg(gId++, './image/17.jpg', keyWords);
    createImg(gId++, './image/18.jpg', keyWords);
}

function _createStickers() {
    createSticker(gId++, './sticker/1.png');
    createSticker(gId++, './sticker/2.png');
    createSticker(gId++, './sticker/3.png');
 
}


function createImg(id, url, keyWords) {
    gImgs.push({
        id,
        url,
        keyWords
    })
}

function createSticker(id, url) {
    gStickers.push({
        id,
        url
    })
}

function getImgs() {
    return gImgs;
}

function findImg(id) {
    return gImgs.find(img => img.id === id);
}

function getMeme() {
    return gMeme;
}

function movePosTxt(dx, dy) {
    gMeme.lines[gMeme.selectedLineIdx].x += dx
    gMeme.lines[gMeme.selectedLineIdx].y += dy

}

function isTxtClicked(clickedPos) {
    var index = gMeme.selectedLineIdx;
    const pos = {
        x: getPosMeme(),
        y: gMeme.lines[index].y
    }
    if ((clickedPos.x >= pos.x && clickedPos.x <= pos.x + gMeme.lines[index].widthSize) && (clickedPos.y >= pos.y && clickedPos.y <= pos.y + gMeme.lines[index].size)) return true
    return false
}

function getPosMeme() {
    var meme = getMeme()
    var line = meme.lines[meme.selectedLineIdx];
    if (line.align === 'left') {
        return line.x

    } else if (line.align === 'right') {
        return line.x - line.widthSize
    } else {
        return line.x - line.widthSize / 2
    }

}