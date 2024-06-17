document.addEventListener('DOMContentLoaded', function () {
    const video = document.getElementById('video');
    const videoFileInput = document.getElementById('video-file');
    const videoUrlInput = document.getElementById('video-url');
    const urlRadio = document.getElementById('url-radio');
    const fileRadio = document.getElementById('file-radio');
    const snapPhotoButton = document.getElementById('snap-photo');
    const autoSnapButton = document.getElementById('auto-snap');
    const saveImageButton = document.getElementById('save-image');
    const canvas = document.getElementById('thumbnail-canvas');
    const context = canvas.getContext('2d');
    const imageWidthInput = document.getElementById('image-width');
    const snapIntervalSelect = document.getElementById('snap-interval');

    urlRadio.addEventListener('change', function () {
        videoFileInput.disabled = true;
        videoUrlInput.disabled = false;
    });

    fileRadio.addEventListener('change', function () {
        videoFileInput.disabled = false;
        videoUrlInput.disabled = true;
    });

    videoFileInput.addEventListener('change', function () {
        const file = videoFileInput.files[0];
        if (file) {
            const url = URL.createObjectURL(file);
            video.src = url;
        }
    });

    videoUrlInput.addEventListener('input', function () {
        const url = videoUrlInput.value;
        video.src = url;
    });

    snapPhotoButton.addEventListener('click', function () {
        captureThumbnail();
    });

    autoSnapButton.addEventListener('click', function () {
        const interval = parseInt(snapIntervalSelect.value, 10);
        autoSnapThumbnails(interval);
    });

    saveImageButton.addEventListener('click', function () {
        const dataURL = canvas.toDataURL('image/png');
        const link = document.createElement('a');
        link.href = dataURL;
        link.download = 'thumbnail.png';
        link.click();
    });

    function captureThumbnail() {
        const width = parseInt(imageWidthInput.value, 10);
        const height = (video.videoHeight / video.videoWidth) * width;
        canvas.width = width;
        canvas.height = height;
        context.drawImage(video, 0, 0, width, height);
    }

    function autoSnapThumbnails(interval) {
        const duration = video.duration;
        const snapCount = Math.floor(100 / interval);
        for (let i = 0; i <= snapCount; i++) {
            setTimeout(function () {
                video.currentTime = (duration * i * interval) / 100;
                captureThumbnail();
            }, i * 1000); // Adjust this value if needed
        }
    }
});
