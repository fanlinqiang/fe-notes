## Element类型

Element 节点具有以下特征:
* nodeType 的值为 1;
* nodeName 的值为元素的标签名(同tagName); 
* nodeValue 的值为 null;
* parentNode 可能是 Document 或 Element;
* 其子节点可能是 Element、Text、Comment、ProcessingInstruction、CDATASection 或 EntityReference。

!> 在 HTML 中，标签名始终都以全部大写表示(如：`document.body.tagName === 'BODY'`);而在 XML(有时候也包括 XHTML) 中，标签名则始终会与源代码中的保持一致。

元素中指定的所有信息，都可以通过下列 JavaScript 代码取得,也可以修改对应的每个特性

```js
document.body.tagName // BODY

// HTMLElement 类型直接继承自 Element 并添加了一些属性,添加的这些属性分别对应于每个 HTML 元素中都存在的下列标准特性。
Object.assign(document.body, {
    id: 'body', // 元素在文档中的唯一标识符。
    title: 'body', // 有关元素的附加说明信息，一般通过工具提示条显示出来
    lang: 'en', // 元素内容的语言代码，很少使用。
    dir: 'rtl', // 语言的方向，值为"ltr"(left-to-right，从左至右)或"rtl"(right-to-left，从右至左)，也很少使用。
    className: 'body' // 与元素的 class 特性对应，即为元素指定的 CSS 类。没有将这个属性命名为 class，是因为 class 是 ECMAScript 的保留字
});
```

#### 取得特性

每个元素都有一或多个特性，这些特性的用途是给出相应元素或其内容的附加信息。操作特性的 DOM 方法主要有三个，分别是`getAttribute()`、`setAttribute()`和 `removeAttribute()`这三 个方法可以针对任何特性使用

注意，传递给 getAttribute()的特性名与实际的特性名相同。因此要想得到 class 特性值，应 该传入"class"而不是"className"，后者只有在通过对象属性访问特性时才用。如果给定名称的特性 不存在，getAttribute()返回 null。通过 getAttribute()方法也可以取得自定义特性(即标准 HTML 语言中没有的特性)的值，以下面的元素为例:

```pug
.container(id="container", data-info="abc")
```

```js
let div = document.getElementById('container');
let info = div.getAttribute("data-info"); // 等同于dataset 方式： div.dataset.info
```

有两类特殊的特性，它们虽然有对应的属性名，但属性的值与通过 getAttribute()返回的值并不 相同。第一类特性就是 style，用于通过 CSS 为元素指定样式。在通过 getAttribute()访问时，返 回的 style 特性值中包含的是 CSS 文本，而通过属性来访问它则会返回一个对象。由于 style 属性是 用于以编程方式访问元素样式的(本章后面讨论)，因此并没有直接映射到 style 特性。
第二类与众不同的特性是 onclick 这样的事件处理程序。当在元素上使用时，onclick 特性中包 含的是 JavaScript 代码，如果通过 getAttribute()访问，则会返回相应代码的字符串。而在访问 onclick 属性时，则会返回一个 JavaScript 函数(如果未在元素中指定相应特性，则返回 null)。这是 因为 onclick 及其他事件处理程序属性本身就应该被赋予函数值。
由于存在这些差别，在通过 JavaScript 以编程方式操作 DOM 时，开发人员经常不使用 getAttri- bute()，而是只使用对象的属性。只有在取得自定义特性值的情况下，才会使用 getAttribute()方法。

#### 设置特性

与 getAttribute()对应的方法是 setAttribute()，这个方法接受两个参数:要设置的特性名和 值。如果特性已经存在，setAttribute()会以指定的值替换现有的值;如果特性不存在，setAttribute() 则创建该属性并设置相应的值。通过 setAttribute()方法既可以操作 HTML 特性也可以操作自定义特性。通过这个方法设置的 特性名会被统一转换为小写形式，即"ID"最终会变成"id"。因为所有特性都是属性，所以直接给属性赋值可以设置特性的值，像下面这样为 DOM 元素添加一个自定义的属性，该属性不会自动成为元素的特性。
 
```js
div.mycolor = "red";
alert(div.getAttribute("mycolor")); //null(IE 除外)
div.dataset.class = "t" // <div data-class="t"></div>
```

这个例子添加了一个名为 mycolor 的属性并将它的值设置为"red"。在大多数浏览器中，这个属 性都不会自动变成元素的特性，因此想通过 getAttribute()取得同名特性的值，结果会返回 null。 可是，自定义属性在 IE 中会被当作元素的特性，反之亦然。

* getNamedItem(name):返回 nodeName 属性等于 name 的节点;
* removeNamedItem(name):从列表中移除 nodeName 属性等于 name 的节点; 
* setNamedItem(node):向列表中添加节点，以节点的 nodeName 属性为索引; 
* item(pos):返回位于数字 pos 位置处的节点

#### 创建元素

使用 document.createElement()方法可以创建新元素。这个方法只接受一个参数，即要创建元素的标签名。这个标签名在 HTML 文档中不区分大小写，而在 XML(包括 XHTML)文档中，则是区 分大小写的。例如，使用下面的代码可以创建一个`<div>`元素。

```js
var div = document.createElement("div"); // 在使用 createElement()方法创建新元素的同时，也为新元素设置了 ownerDocuemnt 属性。
div.id = "myNewDiv";
div.className = "box";
```

要把新元素添加到文档树，可以使用 appendChild()、insertBefore()或 replaceChild()方法。

#### 元素的子节点

元素可以有任意数目的子节点和后代节点，因为元素可以是其他元素的子节点。元素的 childNodes 属性中包含了它的所有子节点，这些子节点有可能是元素、文本节点、注释或处理指令。 不同浏览器在看待这些节点方面存在显著的不同，以下面的代码为例。

```
<ul id="myList">
    <li>Item 1</li>
    <li>Item 2</li>
    <li>Item 3</li>
</ul>
```

如果是 IE 来解析这些代码，那么`<ul>`元素会有 3 个子节点，分别是 3 个`<li>`元素。但如果是在其 他浏览器中，`<ul>`元素都会有 7 个元素，包括 3 个`<li>`元素和 4 个文本节点(表示`<li>`元素之间的空 白符)。如果像下面这样将元素间的空白符删除，那么所有浏览器都会返回相同数目的子节点。

```
<ul id="myList"><li>Item 1</li><li>Item 2</li><li>Item 3</li></ul>
```

对于这段代码，`<ul>`元素在任何浏览器中都会包含 3 个子节点。如果需要通过 childNodes 属性 遍历子节点，那么一定不要忘记浏览器间的这一差别。这意味着在执行某项操作以前，通常都要先检查 一下 nodeTpye 属性，如下面的例子所示。

```js
for (var i=0, len=element.childNodes.length; i < len; i++){
    if (element.childNodes[i].nodeType == 1){ //  1 表示是元素 节点
        //执行某些操作
    }
}
```
