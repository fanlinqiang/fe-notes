## 全屏

```js
handleFullScreen () {
    let elementToSendFullscreen = this.$refs['fullScreen'];
    if (this.isFullscreen(elementToSendFullscreen)) {
        this.exitFullscreen();
    } else {
        this.requestFullscreen(elementToSendFullscreen);
    }
   /* document.onwebkitfullscreenchange =
        document.onmsfullscreenchange =
            document.onmozfullscreenchange =
                document.onfullscreenchange = function() {
                    if (isFullscreen(elementToSendFullscreen)) {
                        fullscreenControl.classList.add('is-fullscreen');
                    } else {
                        fullscreenControl.classList.remove('is-fullscreen');
                    }
                };*/
}
isFullscreen (element) {
    return (document.fullscreenElement ||
        document.webkitFullscreenElement ||
        document.mozFullScreenElement ||
        document.msFullscreenElement) == element;
}
requestFullscreen (element) {
    if (element.requestFullscreen) {
        element.requestFullscreen();
    } else if (element.webkitRequestFullScreen) {
        element.webkitRequestFullScreen();
    } else if (element.mozRequestFullScreen) {
        element.mozRequestFullScreen();
    } else if (element.msRequestFullScreen) {
        element.msRequestFullScreen();
    }
}
exitFullscreen() {
    if (document.exitFullscreen) {
        document.exitFullscreen();
    } else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen();
    } else if (document.mozCancelFullScreen) {
        document.mozCancelFullScreen();
    } else if (document.msCancelFullScreen) {
        document.msCancelFullScreen();
    }
}
```
