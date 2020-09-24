## 打印页面内容

### 整个页面打印

mdn: [window.print](https://developer.mozilla.org/zh-CN/docs/Web/API/Window/print)
```js
window.print();
```

### 局部页面打印

参考： https://www.cnblogs.com/ljwsyt/p/9530525.html

* jQuery插件如：jqprint插件
* 仍使用`window.print()`，打印时使用样式控制，将不需要打印的内容隐藏`<style media="print">`、`<link media="print">`的用法合理应用，`media="print"`是不被网页所显示的，只能在打印的效果上存在，可以设置出打印效果和在网页上所显示的不一样。此外也可以使用媒体查询属性`@media print`,如：
```sass
@media print
    .layout-aside
        display: none
```

#### vue 代码片段

```js
import html2canvas from 'html2canvas';
import download from 'download.js';
export default {
    methods: {
        getQRCodeImage () {
            return new Promise((resolve, reject) => {
                let dom = this.$refs['qr-code'];
                if (dom) {
                    html2canvas(dom).then(function(canvas) {
                        resolve(canvas.toDataURL("image/png", 1.0));
                    });
                } else {
                    reject();
                }
            });
        },
        async handlePrint () {
            let dataUrl = await this.getQRCodeImage();
            let iframe = document.createElement('iframe');
            Object.assign(iframe.style, {
                position: 'fixed',
                'z-index': -999
            });
            let container = document.body;
            container.appendChild(iframe);

            let iframeContentWindow = iframe.contentWindow;
            let iframeDoc = iframeContentWindow.document;
            iframeDoc.write(`
                <style type="text/css" media="print">
                    body {
                        display: flex;
                        align-items: center;
                        justify-content: center;
                    }
                    img {
                        height: 305px;
                        width: 520px;
                    }
                </style>
                <img />
            `);
            let img = iframeDoc.querySelector('img');
            img.onload = function () {
                iframeContentWindow.focus();
                iframeContentWindow.print();
                let timer = setTimeout(() => {
                    container.removeChild(iframe);
                    iframe = null;
                    clearTimeout(timer);
                });
            };
            img.src = dataUrl;
        },
        async handleDownload () {
            let dataUrl = await this.getQRCodeImage();
            download(dataUrl, `QR-${new Date().getTime()}`, 'image/png');
        }
    }
};
</script>
```
