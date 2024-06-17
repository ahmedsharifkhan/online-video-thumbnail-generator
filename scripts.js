document.addEventListener('DOMContentLoaded', function () {
    const video = document.getElementById('video');
    const videoFileInput = document.getElementById('video-file');
    const videoUrlInput = document.getElementById('video-url');
    const urlRadio = document.getElementById('url-radio');
    const fileRadio = document.getElementById('file-radio');
    const snapPhotoButton = document.getElementById('snap-photo');
    const autoSnapButton = document.getElementById('auto-snap');
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');
    const imageWidthInput = document.getElementById('image-width');
    const snapIntervalSelect = document.getElementById('snap-interval');
    const thumbnailsContainer = document.getElementById('thumbnails');

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
        const interval = snapIntervalSelect.value;
        autoSnapThumbnails(interval);
    });

    function captureThumbnail() {
        const width = parseInt(imageWidthInput.value, 10);
        const height = (video.videoHeight / video.videoWidth) * width;
        canvas.width = width;
        canvas.height = height;
        context.drawImage(video, 0, 0, width, height);
        displayThumbnail(canvas.toDataURL());
    }

    function autoSnapThumbnails(interval) {
        const duration = video.duration;
        let snapCount;
        let timeInterval;
        
        if (interval.includes('sec
