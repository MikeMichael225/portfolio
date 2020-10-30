(function () {
    var alert = document.querySelector('.confirm-save');
    var fileNameINP = document.querySelector('.confirm-save .file-name-inp');
    var confirmSaveBTN = document.querySelector('.confirm-save-btn');
    var cancelSaveBTN = document.querySelector('.cancel-save-btn');

    fileNameINP.value = 'text.txt';

    confirmSaveBTN.addEventListener('click', () => {
        if (!fileNameINP.value) fileNameINP.value = 'text.txt'
        if (fileNameINP.value.substr(-4, 4) != '.txt') fileNameINP.value += '.txt';
        alert.classList.add('hide');
    });
    cancelSaveBTN.addEventListener('click', () => {
        alert.classList.add('hide');
    });
}());

(function () {
    var alert = document.querySelector('.confirm-overwrite');
    var cancelOverwrite = document.querySelector('.confirm-overwrite .cancel-upload');
    var confirmOverwrite = document.querySelector('.confirm-overwrite .confirm-upload');

    cancelOverwrite.addEventListener('click', () => {
        alert.classList.add('hide');
    });
    confirmOverwrite.addEventListener('click', () => {
        alert.classList.add('hide');
    });
}());
