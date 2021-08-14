'use strict';

function openMeme() {
    document.querySelector('.gallery').style.display = 'none';
    document.querySelector('.editor').style.display = 'none';
    document.querySelector('.meme').style.display = 'grid';
    document.querySelector('.contact').style.display = 'none';
    renderMemeImg()
}

function onSaveMeme() {
    var meme = getMeme();
    const data = gCanvas.toDataURL();
    gMemeSave.push({
        img: data,
        meme
    });
    _saveMemeToStorage();
}

function renderMemeImg() {
    var savedMemes = loadFromStorage('meme');
    var strHtmls = savedMemes.map((savedMeme,idx) => {
        return ` <div onclick='onEditorSaved(${idx})' class='image'><img src='${savedMeme.img}' alt=''></div>`
    })
    var elMeme = document.querySelector('.meme');
    elMeme.innerHTML = strHtmls.join('');
}


function onEditorSaved(idx) {
    var savedMemes = loadFromStorage('meme');
    document.querySelector('.gallery').style.display = 'none';
    document.querySelector('.editor').style.display = 'flex';
    document.querySelector('.meme').style.display = 'none';
    document.querySelector('.contact').style.display = 'none';
    setSavedMeme(savedMemes[idx].meme);
    renderCanvas();
}

function _saveMemeToStorage() {
    saveToStorage('meme', gMemeSave)
}