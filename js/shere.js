'use strict'
var gIsDownload = false;
var gMemeSave = [];
//share to facebook
function shareImg() {
    const imgDataUrl = gCanvas.toDataURL('image/jpeg');
    // A function to be called if request succeeds
    function onSuccess(uploadedImgUrl) {
        const encodedUploadedImgUrl = encodeURIComponent(uploadedImgUrl);
        // document.querySelector('.user-msg').innerText = `Your photo is available here: ${uploadedImgUrl}`;
        window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodedUploadedImgUrl}&t=${encodedUploadedImgUrl}" title="Share on Facebook" target="_blank" onclick="window.open('https://www.facebook.com/sharer/sharer.php?u=${uploadedImgUrl}&t=${uploadedImgUrl}`, '_blank');
    }
    doUploadImg(imgDataUrl, onSuccess);
}

function doUploadImg(imgDataUrl, onSuccess) {
    const formData = new FormData();
    formData.append('img', imgDataUrl);
    fetch('//ca-upload.com/here/upload.php', {
            method: 'POST',
            body: formData,
        })
        .then((res) => res.text())
        .then((url) => {
            console.log('Got back live url:', url);
            onSuccess(url);
        })
        .catch((err) => {
            console.error(err);
        });
}

function onDownload() {
    setIsDownload();
    renderCanvas();
    const data = gCanvas.toDataURL('image/jpeg');
    var element = document.createElement('a');
    element.setAttribute('href', data);
    element.setAttribute('download', 'my-img.jpg');
    element.click();
    element.remove();
    
   
}

function setIsDownload() {
    gIsDownload = !gIsDownload
}

function getIsDownload(){
    return gIsDownload
}

