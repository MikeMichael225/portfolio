var upload = document.querySelector('.drop-area');


var videoContainer = document.querySelector('.video-container');

var videoProgressBarContainer = document.querySelector('.progress-bar-container');
var videoProgressBar = document.querySelector('.progress-bar');

var canvas = document.querySelector('.canvas');

var playBTN = document.querySelector('.play');
var pauseBTN = document.querySelector('.pause');
var stopBTN = document.querySelector('.stop');
var currentVideoTime = document.querySelector('.video-current-time');
var volumeInput = document.querySelector('.volume-input');

var video = document.querySelector('.video');

var c = canvas.getContext('2d');

upload.addEventListener('dragover', function (event) {
    event.preventDefault();
    event.target.classList.add('over');
})

upload.addEventListener('dragleave', function (event) {
    event.preventDefault();
    event.target.classList.remove('over');
})

upload.addEventListener('drop', changeFile);

function changeFile(event) {
    if (event.dataTransfer.items[0].getAsFile().type.includes('video')) {
        try {
            event.preventDefault();
            var file = event.dataTransfer.items[0].getAsFile();
            var reader = new FileReader();
            reader.addEventListener('load', readFile);
            reader.readAsArrayBuffer(file)
            event.target.classList.add('hide')
            videoContainer.classList.remove('hide')
        } catch { console.error('Wrong file!'); }
    } else {
        event.preventDefault();
        upload.classList.remove('over');
        console.error("The uploaded file is not a video!");
    }
}

function readFile(event) {
    video.src = URL.createObjectURL(new Blob([event.target.result]));
}

video.addEventListener('play', function () {
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    canvas.style.display = 'block';
    video.style.display = 'none';

    function draw() {
        requestAnimationFrame(draw);

        currentVideoTime.innerText = `${moment.unix(Math.round(video.currentTime)).format('mm:ss')} / ${moment.unix(Math.round(video.duration)).format('mm:ss')}`;

        videoProgressBar.style.width = (video.currentTime / video.duration) * 100 + '%';

        c.drawImage(video, 0, 0);

        let imgData = c.getImageData(0, 0, video.videoWidth, video.videoHeight)
        for (var y = 0; y < imgData.height; y++) {
            for (var x = 0; x < imgData.width; x++) {
                var i = (y * 4) * imgData.width + x * 4;
                var avg = (imgData.data[i] + imgData.data[i + 1] + imgData.data[i + 2]) / 3;
                imgData.data[i] = avg;
                imgData.data[i + 1] = avg;
                imgData.data[i + 2] = avg;
            }
        }

        c.putImageData(imgData, 0, 0, 0, 0, imgData.width, imgData.height);
    }
    requestAnimationFrame(draw)
});

video.addEventListener('ended', function (event) {
    upload.classList.remove('hide')
    upload.classList.remove('over');
    videoContainer.classList.add('hide')
})

videoProgressBarContainer.addEventListener('mousedown', function (e) {
    video.currentTime = (e.clientX - ((innerWidth - videoProgressBarContainer.offsetWidth)) / 2) / videoProgressBarContainer.offsetWidth * video.duration
})

playBTN.addEventListener('click', function () {
    video.play();
})

pauseBTN.addEventListener('click', function () {
    video.pause();
})

stopBTN.addEventListener('click', function () {
    video.currentTime = video.duration;
})

volumeInput.addEventListener('input', function () {
    const VOLUME = parseInt(volumeInput.value)
    video.volume = VOLUME / 100;
    document.cookie = "video-volume=" + VOLUME;
})