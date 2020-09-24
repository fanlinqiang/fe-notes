## 读取json文件

```js
let tmpInput = document.createElement("input");
tmpInput.setAttribute('type', 'file');
tmpInput.setAttribute('accept', 'application/json');
tmpInput.click();
tmpInput.addEventListener('change', () => {
    if (tmpInput.files[0]) {
        let reader = new FileReader(); // 详见：https://developer.mozilla.org/zh-CN/docs/Web/API/FileReader
        reader.readAsText(tmpInput.files[0]);
        reader.onload = function (ev) {
            try {
                console.log(JSON.parse(ev.target.result));
            } catch (error) {
                console.log('文件内容错误');
            }
        };
    }
});
```
