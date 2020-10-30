(function () {
    var alert = document.querySelector('.confirm-overwrite');
    var alertConfirmBTN = document.querySelector('.confirm-overwrite .confirm-upload');
    var dropZone = document.querySelector('.text-field');

    dropZone.addEventListener('drop', getFile);

    dropZone.addEventListener('dragover', function (event) {
        event.preventDefault();
    })

    dropZone.addEventListener('dragleave', function (event) {
        event.preventDefault();
    })

    function getFile(event) {
        try {
            event.preventDefault();

            const uploadedFile = event.dataTransfer.items[0].getAsFile();
            const reader = new FileReader();

            reader.addEventListener('load', readFile);
            reader.readAsText(uploadedFile);
        } catch (err) { console.error(err) }
    }

    function readFile(event) {
        const RESULT = event.target.result;
        document.querySelector('.confirm-overwrite').classList.remove('hide');
        alertConfirmBTN.addEventListener('click', () => {
            dropZone.innerText = RESULT;
        }, { once: true });
    }
}());

(function () {
    var alert = document.querySelector('.confirm-save')
    var alertConfirmBTN = document.querySelector('.confirm-save .confirm-save-btn');
    var alertINP = document.querySelector('.confirm-save .file-name-inp');

    var saveBTN = document.querySelector('.save-file-btn');
    var textField = document.querySelector('.text-field');

    saveBTN.addEventListener('click', () => {
        alert.classList.remove('hide');
    });

    alertConfirmBTN.addEventListener('click', () => {
        setTimeout(function () {
            var file = new Blob([textField.innerText], {
                type: 'text/plain'
            });

            saveFile(file, alertINP.value)

            alert.classList.add('hide');
        }, 100)
    });

    function saveFile(blob, filename) {
        if (window.navigator.msSaveOrOpenBlob) {
            window.navigator.msSaveOrOpenBlob(blob, filename);
        } else {
            const a = document.createElement('a');
            document.body.appendChild(a);
            const url = window.URL.createObjectURL(blob);
            a.href = url;
            a.download = filename;
            a.click();
            setTimeout(() => {
                window.URL.revokeObjectURL(url);
                document.body.removeChild(a);
            }, 0)
        }
    }
}());