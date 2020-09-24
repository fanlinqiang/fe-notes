## 移动端保存图片到手机相册

只能直接打开图片地址，然后提示用户长按图片保存到手机相册,微信中有兼容性问题

```js
let ua = navigator.userAgent.toLowerCase();
if (ua.indexOf('micromessenger') === -1) {  // 非微信环境
    window.location.href = src;
} else {
    let anchor = document.createElement("a");
    anchor.href = src;
    anchor.style.display = "none";
    document.body.appendChild(anchor);
    let timer = setTimeout(function() {
        anchor.click();
        document.body.removeChild(anchor);
        clearTimeout(timer);
    }, 66);
}
```
