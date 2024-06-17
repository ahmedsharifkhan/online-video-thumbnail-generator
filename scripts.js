document.addEventListener('DOMContentLoaded', function () {
    const video = document.getElementById('video');
    const videoFileInput = document.getElementById('video-file');
    const videoUrlInput = document.getElementById('video-url');
    const urlRadio = document.getElementById('url-radio');
    const fileRadio = document.getElementById('file-radio');
    const snapPhotoButton = document.getElementById('snap-photo');
    const autoSnapButton = document.getElementById('auto-snap');
    const snapIntervalSelect = document.getElementById('snap-interval');
    const thumbnailsContainer = document.getElementById('thumbnails');
    const canvas = document.getElementById('thumbnail-canvas');
    const context = canvas.getContext('2d');
    const imageWidthInput = document.getElementById('image-width');

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

    thumbnailsContainer.addEventListener('click', function (e) {
        if (e.target.tagName === 'IMG') {
            const img = e.target;
            const dataURL = img.src;
            const link = document.createElement('a');
            link.href = dataURL;
            link.download = 'thumbnail.png';
            link.click();
        }
    });

    function captureThumbnail() {
        const width = parseInt(imageWidthInput.value, 10);
        const height = (video.videoHeight / video.videoWidth) * width;
        canvas.width = width;
        canvas.height = height;
        context.drawImage(video, 0, 0, width, height);
        const dataURL = canvas.toDataURL('image/png');
        const img = document.createElement('img');
        img.src = dataURL;
        thumbnailsContainer.appendChild(img);
    }

    function autoSnapThumbnails(interval) {
        const duration = video.duration;
        const snapCount = Math.floor(duration / interval);
        for (let i = 0; i <= snapCount; i++) {
            setTimeout(function () {
                video.currentTime = i * interval;
                captureThumbnail();
            }, i * 1000); // Adjust this value if needed
        }
    }
});
