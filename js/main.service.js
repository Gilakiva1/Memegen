'use strict';

var gImgs = [];
var gId = 1;
var gMeme;;

_createImgs();


function changeFont(fontName){
    const line = gMeme.lines[gMeme.selectedLineIdx];
    line.font = fontName;
}

function  deleteLine(){
    var index = gMeme.selectedLineIdx;
 
   
    gMeme.lines.splice(index,1);
    if(!gMeme.lines.length){
        
        addLine();
    }
    gMeme.selectedLineIdx --;
}

function addLine() {
    var index = gMeme.lines.length - 1
    if (gMeme.lines.length > 2) {
        var yPx = gMeme.lines[index].y + 50;
    }
    else if (gMeme.lines.length === 2){
        yPx = gMeme.lines[0].y + 50;
    }
    else if(!gMeme.lines.length){
        yPx = 10;
    }
    else {
        yPx = 400;
    }
    gMeme.lines.push({
        font:'Impact',
        txt: '',
        size: 20,
        align: 'left',
        color: '#fff',
        x: 30,
        y: yPx
    })
    gMeme.selectedLineIdx ++;
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
            font:'Impact',
            txt: 'Never ate falafel',
            size: 20,
            align: 'left',
            color: '#fff',
            x: 30,
            y: 10
        }]
    };

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

function setTxt(txt) {
    const index = gMeme.selectedLineIdx;
    gMeme.lines[index].txt = txt;
}

function changeSize(num) {
    const index = gMeme.selectedLineIdx;
    gMeme.lines[index].size += num;
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

function createImg(id, url, keyWords) {
    gImgs.push({
        id,
        url,
        keyWords
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