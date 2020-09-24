## 动态脚本

使用`<script>`元素可以向页面中插入 JavaScript 代码，一种方式是通过其 src 特性包含外部文件， 另一种方式就是用这个元素本身来包含代码。

1. 插入外部文件

```js
function loadScript(url){
    var script = document.createElement("script");
    script.type = "text/javascript";
    script.src = url;
    // 在执行最后一行代码把<script> 元素添加到页面中之前，是不会下载外部文件的。
    // 并没有什么标准方式来探知脚本加载完成
    document.body.appendChild(script); 
}

loadScript('./test.js');
```

2. 直接插入 JavaScript 代码

```js
function loadScriptString(code){
    var script = document.createElement("script");
    script.type = "text/javascript";
    try { // Safari 3.0 之前 的版本虽然不能正确地支持 text 属性，但却允许使用文本节点技术来指定代码。
        script.appendChild(document.createTextNode(code));
    } catch (ex){ // IE 将<script>视为一个特殊的元素，不允许 DOM 访问其子节点。
        script.text = code; 
    }
    document.body.appendChild(script);
}

loadScriptString("function sayHi(){alert('hi');}");
```
