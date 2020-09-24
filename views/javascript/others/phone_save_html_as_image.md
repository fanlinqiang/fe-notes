## 前端js保存页面为图片下载到本地

- [手机端点击下载按钮将页面保存成图片到本地](https://www.cnblogs.com/yszr/p/10831447.html)
- [前端js保存页面为图片下载到本地的坑](http://caibaojian.com/h5-download.html)
- [html2canvas 识别 svg 解决方案](https://www.cnblogs.com/richard1015/p/10083141.html)

### 方案

1. html2canvas.js：可将 htmldom 转为 canvas 元素。
2. canvasAPI：toDataUrl() 可将 canvas 转为 base64 格式
3. 替换 html 为 img，src为 base64

### vue代码片段

1. 手机端将页面保存为图片（即页面展现的内容实际是图片），长按后可保存到本地

```js
import html2canvas from 'html2canvas';

replaceHtml2Img () {
    // 获取想要转换的 DOM 节点
    const dom = this.$refs['container'];
    // DOM 节点计算后宽高
    let {width, height} = dom.getBoundingClientRect();
    // 获取像素比
    const dpr = window.devicePixelRatio || 1;
    // 创建自定义 canvas 元素
    const canvas = document.createElement('canvas');
    // 设定 canvas 元素属性宽高为 DOM 节点宽高 * 像素比
    canvas.width = width * dpr;
    canvas.height = height * dpr;
    // 设定 canvas css宽高为 DOM 节点宽高
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;
    // 获取画笔
    const context = canvas.getContext('2d');
    // 将所有绘制内容放大像素比倍,解决dpr不同图片模糊问题
    context.scale(dpr, dpr);
    // 将自定义 canvas 作为配置项传入，开始绘制
    html2canvas(dom, {canvas}).then((canvas) => {
        let dataUrl = canvas.toDataURL("image/png", 1.0);
        let parent = dom.parentNode;
        parent.innerHTML = `<img src="${dataUrl}" style="width: 100%">`;
    });
}
```

2. pc端点击按钮,下载页面dom为图片到本地

```js
handleDownload (id) {
    let ele = document.getElementById(id);
    let ignoreElements = ele.querySelector('.chart-download');
    html2canvas(ele, {
        logging: false,
        ignoreElements: (elements) => { //  忽略的ele
            return elements === ignoreElements;
        }
    }).then(function (canvas) {
        // canvas转为图片流
        let dataurl = canvas.toDataURL('image/png');
        /*
            // 非ie下正常，主要原因是ie下a标签不支持download属性
            let donwLink = document.createElement('a');
            donwLink.href = dataurl;
            donwLink.download = "统计分析" + new Date().getTime(); // 图片名字
            donwLink.click();
            let event = new MouseEvent('click');
            donwLink.dispatchEvent(event);
        */
        
        // 使用downloadjs兼容ie下下载，https://github.com/rndme/download
        // download(data, strFileName, strMimeType);
        downloadjs(dataurl, `统计分析${new Date().getTime()}`, 'image/png');
    });
}
```
