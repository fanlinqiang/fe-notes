## 动态样式

能够把 CSS 样式包含到 HTML 页面中的元素有两个。其中，`<link>`元素用于包含来自外部的文件， 而`<style>`元素用于指定嵌入的样式。与动态脚本类似，所谓动态样式是指在页面刚加载时不存在的样式;动态样式是在页面加载完成后动态添加到页面中的。

1. 插入外部文件
 
```js
function loadStyles(url){
    var link = document.createElement("link");
    link.rel = "stylesheet";
    link.type = "text/css";
    link.href = url;
    var head = document.getElementsByTagName("head")[0]; // 需要注意的是，必须将<link>元素添加到<head> 而不是<body>元素，才能保证在所有浏览器中的行为一致。
    head.appendChild(link);
}

loadStyles("styles.css");
```

2. 直接插入 JavaScript 代码

```js
function loadStyleString(css){
    var style = document.createElement("style");
    style.type = "text/css";
    try{
        style.appendChild(document.createTextNode(css));
    } catch (ex){ // IE 将<style>视为 一个特殊的、与<script>类似的节点，不允许访问其子节点。
        style.styleSheet.cssText = css;
    }
    var head = document.getElementsByTagName("head")[0];
    head.appendChild(style);
}

loadStyleString("body{background-color:red}");
```
