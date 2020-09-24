## Attr类型

元素的特性在 DOM 中以 Attr 类型来表示。在所有浏览器中(包括 IE8)，都可以访问 Attr 类型 的构造函数和原型。从技术角度讲，特性就是存在于元素的 attributes 属性中的节点。特性节点具有 下列特征:

* nodeType 的值为 2;
* nodeName 的值是特性的名称;
* nodeValue 的值是特性的值;
* parentNode 的值为 null;
* 在 HTML 中不支持(没有)子节点;
* 在 XML 中子节点可以是 Text 或 EntityReference。

尽管它们也是节点，但特性却不被认为是 DOM 文档树的一部分。开发人员最常使用的是 getAt- tribute()、setAttribute()和 remveAttribute()方法，很少直接引用特性节点。Attr 对象有 3 个属性:name、value 和 specified。其中，name 是特性名称(与 nodeName 的 值相同)，value 是特性的值(与 nodeValue 的值相同)，而 specified 是一个布尔值，用以区别特 性是在代码中指定的，还是默认的。使用 document.createAttribute()并传入特性的名称可以创建新的特性节点。例如，要为元素 添加 align 特性，可以使用下列代码:

```js
var attr = document.createAttribute("align");
attr.value = "left";
element.setAttributeNode(attr);
alert(element.attributes["align"].value); //"left"
alert(element.getAttributeNode("align").value); //"left"
alert(element.getAttribute("align"));           //"left"
```

这个例子创建了一个新的特性节点。由于在调用 createAttribute()时已经为 name 属性赋了值， 所以后面就不必给它赋值了。之后，又把 value 属性的值设置为"left"。为了将新创建的特性添加到 5 元素中，必须使用元素的 setAttributeNode()方法。添加特性之后，可以通过下列任何方式访问该 特性:attributes 属性、getAttributeNode()方法以及 getAttribute()方法。其中，attributes 和 getAttributeNode()都会返回对应特性的 Attr 节点，而 getAttribute()则只返回特性的值。
