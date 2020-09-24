## Comment类型

注释在 DOM 中是通过 Comment 类型来表示的。Comment 节点具有下列特征:
* nodeType 的值为 8;
* nodeName 的值为"#comment";
* nodeValue 的值是注释的内容;
* parentNode 可能是 Document 或 Element;
* 不支持(没有)子节点。

Comment 类型与 Text 类型继承自相同的基类，因此它拥有除 splitText()之外的所有字符串操作方法。与 Text 类型相似，也可以通过 nodeValue 或 data 属性来取得注释的内容。 注释节点可以通过其父节点来访问，以下面的代码为例。

```html
<div id="myDiv"><!--A comment --></div>
```

```js
var div = document.getElementById("myDiv");
var comment = div.firstChild;
alert(comment.data);    //"A comment"
```

另外，使用 document.createComment()并为其传递注释文本也可以创建注释节点，如下面的例
子所示。

```js
var comment = document.createComment("A comment ");
```
    
显然，开发人员很少会创建和访问注释节点，因为注释节点对算法鲜有影响。此外，浏览器也不会 识别位于`</html>`标签后面的注释。如果要访问注释节点，一定要保证它们是<html>元素的后代(即 位于`<html>`和`</html>`之间)。
