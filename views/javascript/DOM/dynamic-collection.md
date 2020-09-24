## 动态集合

dom操作中要注意动态集合每当文档结构发生变化时，它们都会得到更新，常见的动态集合如下：

```
// 1. NodeList
document.getElementsByName('pm');
document.querySelectorAll('div')
// 2. NamedNodeMap
document.body.attributes
// 3. HTMLCollection
document.getElementsByTagName('div')

// 以下是个无限循环的例子
var divs = document.getElementsByTagName("div"),i,div;
for (i=0; i < divs.length; i++){
    div = document.createElement("div");
    document.body.appendChild(div);
}
```
