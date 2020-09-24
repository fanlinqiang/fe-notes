## 扩展

### classList 属性

在操作类名时，需要通过 className 属性添加、删除和替换类名。因为 className 中是一个字 符串，所以即使只修改字符串一部分，也必须每次都设置整个字符串的值。 classList 属性是新集合类型 DOMTokenList 的实例。与其他 DOM 集合类似，DOMTokenList 有一个表示自己包含多少元素的 length 属性，而要取得每个元素可以使用 item()方 法，也可以使用方括号语法。

|方法|描述|
|:-:|:-:|
|item(index)|返回DOMTokenList中对应当前索引的值，如果该索引没有值则返回`null`|
|add(value)|将给定的字符串值添加到列表中。如果值已经存在，就不添加了。|
|contains(value)|表示列表中是否存在给定的值，如果存在则返回 true，否则返回 false。|
|remove(value)|从列表中删除给定的字符串|
|toggle(value)|如果列表中已经存在给定的值，删除它;如果列表中没有给定的值，添加它|
|replace(value)|替换对应的值|

兼容性及Polyfill详见：[Element.classList](https://developer.mozilla.org/en-US/docs/Web/API/Element/classList)

### 焦点管理

HTML5 也添加了辅助管理 DOM 焦点的功能。首先就是 document.activeElement 属性，这个 属性始终会引用 DOM 中当前获得了焦点的元素。元素获得焦点的方式有页面加载、用户输入(通常是 通过按 Tab 键)和在代码中调用 focus()方法。来看几个例子。

```js
var button = document.getElementById("myButton");
button.focus();
alert(document.activeElement === button);   //true
```

默认情况下，文档刚刚加载完成时，document.activeElement 中保存的是 document.body元素的引用。文档加载期间，document.activeElement 的值为 null。另外就是新增了 document.hasFocus()方法，这个方法用于确定文档是否获得了焦点。

```js
var button = document.getElementById("myButton");
button.focus();
alert(document.hasFocus());  //true
```

通过检测文档是否获得了焦点，可以知道用户是不是正在与页面交互。
查询文档获知哪个元素获得了焦点，以及确定文档是否获得了焦点，这两个功能最重要的用途是提 高 Web 应用的无障碍性。无障碍 Web 应用的一个主要标志就是恰当的焦点管理，而确切地知道哪个元 素获得了焦点是一个极大的进步，至少我们不用再像过去那样靠猜测了。

兼容性详见：[activeElement](https://developer.mozilla.org/en-US/docs/Web/API/DocumentOrShadowRoot/activeElement)、[hasFocus](https://developer.mozilla.org/zh-CN/docs/Web/API/Document/hasFocus)

### 字符集属性

HTML5新增了几个与文档字符集有关的属性。其中，charset属性表示文档中实际使用的字符集， 也可以用来指定新字符集。默认情况下，这个属性的值为"UTF-16"，但可以通过`<meta>`元素、响应头 部或直接设置 charset 属性修改这个值。来看一个例子。

```js
 alert(document.charset); //"UTF-16"
document.charset = "UTF-8";
```

另一个属性是 defaultCharset，表示根据默认浏览器及操作系统的设置，当前文档默认的字符集 应该是什么。如果文档没有使用默认的字符集，那 charset 和 defaultCharset 属性的值可能会不一 样，例如:

```js
if (document.charset != document.defaultCharset){
    alert("Custom character set being used.");
}
```

通过这两个属性可以得到文档使用的字符编码的具体信息，也能对字符编码进行准确地控制。运行 适当的情况下，可以保证用户正常查看页面或使用应用。
 支持 document.charset 属性的浏览器有 IE、Firefox、Safari、Opera 和 Chrome。支持 document.defaultCharset 属性的浏览器有 IE、Safari 和 Chrome。
 
### 自定义数据属性

HTML5 规定可以为元素添加非标准的属性，但要添加前缀 data-，目的是为元素提供与渲染无关的信息，或者提供语义信息。这些属性可以任意添加、随便命名，只要以 data-开头即可。来看一个例子。

```html
<div id="myDiv" data-appId="12345" data-myname="Nicholas"></div>
```

添加了自定义属性之后，可以通过元素的 dataset 属性来访问自定义属性的值。dataset 属性的 值是 DOMStringMap 的一个实例，也就是一个名值对儿的映射。在这个映射中，每个 data-name 形式 的属性都会有一个对应的属性，只不过属性名没有 data-前缀(比如，自定义属性是 data-myname， 那映射中对应的属性就是 myname)。还是看一个例子吧。

```js
var div = document.getElementById("myDiv");
//取得自定义属性的值
var appId = div.dataset.appId; var myName = div.dataset.myname;
//设置值
div.dataset.appId = 23456; div.dataset.myname = "Michael";
//有没有"myname"值呢?
if (div.dataset.myname){
    alert("Hello, " + div.dataset.myname);
}
```

详见：[dataset](https://developer.mozilla.org/en-US/docs/Web/API/HTMLOrForeignElement/dataset)

### 插入标记

#### innerHTML 属性

在读模式下，innerHTML 属性返回与调用元素的所有子节点(包括元素、注释和文本节点)对应 的 HTML 标记。在写模式下，innerHTML 会根据指定的值创建新的 DOM 树，然后用这个 DOM 树完全 替换调用元素原先的所有子节点。但是，不同浏览器返回的文本格式会有所不同。IE 和 Opera 会将所有标签转换为大写形式，而 Safari、 Chrome 和 Firefox 则会原原本本地按照原先文档中(或指定这些标签时)的格式返回 HTML，包括空格 和缩进。不要指望所有浏览器返回的 innerHTML 值完全相同。在写模式下，innerHTML 的值会被解析为 DOM 子树，替换调用元素原来的所有子节点。因为它的 值被认为是 HTML，所以其中的所有标签都会按照浏览器处理 HTML 的标准方式转换为元素(同样， 这里的转换结果也因浏览器而异)。如果设置的值仅是文本而没有 HTML 标签，那么结果就是设置纯文本

!> 为 innerHTML 设置 HTML 字符串后，浏览器会将这个字符串解析为相应的 DOM 树。因此设置了 innerHTML 之后，再从中读取 HTML 字符串，会得到与设置时不一 样的结果。原因在于返回的字符串是根据原始 HTML 字符串创建的 DOM 树经过序列 化之后的结果

使用 innerHTML 属性也有一些限制。比如，在大多数浏览器中，通过 innerHTML 插入`<script>` 元素并不会执行其中的脚本。并不是所有元素都支持 innerHTML 属性。不支持 innerHTML 的元素有:`<col>`、`<colgroup>`、 `<frameset>`、`<head>`、`<html>`、`<style>`、`<table>`、`<tbody>`、`<thead>`、`<tfoot>`和`<tr>`。此 外，在 IE8 及更早版本中，`<title>`元素也没有 innerHTML 属性。

无论什么时候，只要使用 innerHTML 从外部插入 HTML，都应该首先以可靠的方式处理 HTML。

#### outerHTML 属性

在读模式下，outerHTML 返回调用它的元素及所有子节点的 HTML 标签。在写模式下，outerHTML 会根据指定的 HTML 字符串创建新的 DOM 子树，然后用这个 DOM 子树完全替换调用元素。下面是一 个例子。

```html
 <div id="content">
        <p>This is a <strong>paragraph</strong> with a list following it.</p>
        <ul>
            <li>Item 1</li>
        <li>Item 2</li>
        <li>Item 3</li>
    </ul> 
</div>
```

如果在`<div>`元素上调用 outerHTML，会返回与上面相同的代码，包括`<div>`本身。不过，由于浏 览器解析和解释 HTML 标记的不同，结果也可能会有所不同。(这里的不同与使用 innerHTML 属性时 存在的差异性质是一样的。)
使用 outerHTML 属性以下面这种方式设置值:

```js
div.outerHTML = "<p>This is a paragraph.</p>";
```

这行代码完成的操作与下面这些 DOM 脚本代码一样:

```js
var p = document.createElement("p"); 
p.appendChild(document.createTextNode("This is a paragraph.")); 
div.parentNode.replaceChild(p, div);
```

结果，就是新创建的`<p>`元素会取代 DOM 树中的`<div>`元素。
支持 outerHTML 属性的浏览器有 IE4+、Safari 4+、Chrome 和 Opera 8+。Firefox 7 及之前版本都不 支持 outerHTML 属性。

#### insertAdjacentHTML()方法

插入标记的最后一个新增方式是 insertAdjacentHTML()方法。这个方法最早也是在 IE 中出现的， 它接收两个参数:插入位置和要插入的 HTML 文本。第一个参数必须是下列值之一:

* "beforebegin"，在当前元素之前插入一个紧邻的同辈元素; 
* "afterbegin"，在当前元素之下插入一个新的子元素或在第一个子元素之前再插入新的子元素;
* "beforeend"，在当前元素之下插入一个新的子元素或在最后一个子元素之后再插入新的子元素;
* "afterend"，在当前元素之后插入一个紧邻的同辈元素。

注意，这些值都必须是小写形式。第二个参数是一个 HTML 字符串(与 innerHTML 和 outerHTML 的值相同)，如果浏览器无法解析该字符串，就会抛出错误。以下是这个方法的基本用法示例。

```js
//作为前一个同辈元素插入 //作为第一个子元素插入
element.insertAdjacentHTML("afterbegin", "<p>Hello world!</p>");
//作为最后一个子元素插入
element.insertAdjacentHTML("beforeend", "<p>Hello world!</p>");
//作为后一个同辈元素插入
element.insertAdjacentHTML("afterend", "<p>Hello world!</p>");
```

支持 insertAdjacentHTML()方法的浏览器有 IE、Firefox 8+、Safari、Opera 和 Chrome。

#### 内存与性能问题

在使用 innerHTML、 outerHTML 属性和 insertAdjacentHTML()方法时替换子节点可能会导致浏览器的内存占用问题，尤其是在 IE 中，问题更加明显。在删除带有事件处理程序或引用了其他 JavaScript 对象子树时，就有可能导致内存占用问题。假设 某个元素有一个事件处理程序(或者引用了一个 JavaScript 对象作为属性)，在使用前述某个属性将该元 素从文档树中删除后，元素与事件处理程序(或 JavaScript 对象)之间的绑定关系在内存中并没有一并 删除。如果这种情况频繁出现，页面占用的内存数量就会明显增加。因此，最好先手工删除要被替换的元素的所有事件处理 程序和 JavaScript 对象属性。

不过，使用这几个属性——特别是使用 innerHTML，仍然还是可以为我们提供很多便利的。一般 来说，在插入大量新 HTML 标记时，使用 innerHTML 属性与通过多次 DOM 操作先创建节点再指定它 们之间的关系相比，效率要高得多。这是因为在设置 innerHTML 或 outerHTML 时，就会创建一个 HTML 解析器。这个解析器是在浏览器级别的代码(通常是 C++编写的)基础上运行的，因此比执行 JavaScript 快得多。不可避免地，创建和销毁 HTML 解析器也会带来性能损失，所以最好能够将设置 innerHTML 或 outerHTML 的次数控制在合理的范围内。

####children属性

由于 IE9 之前的版本与其他浏览器在处理文本节点中的空白符时有差异，因此就出现了 children 属性。这个属性是 HTMLCollection 的实例，只包含元素中同样还是元素的子节点。除此之外， children 属性与 childNodes 没有什么区别，即在元素只包含元素子节点时，这两个属性的值相同。 下面是访问 children 属性的示例代码:

```js
 var childCount = element.children.length;
 var firstChild = element.children[0];
```

支持 children 属性的浏览器有 IE5、Firefox 3.5、Safari 2(但有 bug)、Safari 3(完全支持)、Opera8 和 Chrome(所有版本)。IE8 及更早版本的 children 属性中也会包含注释节点，但 IE9 之后的版本则 只返回元素节点。

#### scrollIntoView()方法

如何滚动页面也是 DOM 规范没有解决的一个问题。为了解决这个问题，浏览器实现了一些方法， 以方便开发人员更好地控制页面滚动。在各种专有方法中，HTML5 最终选择了 scrollIntoView()作 为标准方法。
scrollIntoView()可以在所有 HTML 元素上调用，通过滚动浏览器窗口或某个容器元素，调用 元素就可以出现在视口中。如果给这个方法传入 true 作为参数，或者不传入任何参数，那么窗口滚动 之后会让调用元素的顶部与视口顶部尽可能平齐。如果传入 false 作为参数，调用元素会尽可能全部 出现在视口中，(可能的话，调用元素的底部会与视口顶部平齐。)不过顶部不一定平齐，例如:

```js
//让元素可见
// document.forms[0].scrollIntoView();
```

当页面发生变化时，一般会用这个方法来吸引用户的注意力。实际上，为某个元素设置焦点也会导 致浏览器滚动并显示出获得焦点的元素。

#### 访问元素的样式

任何支持 style 特性的 HTML 元素在 JavaScript 中都有一个对应的 style 属性。这个 style 对象 是 CSSStyleDeclaration 的实例，包含着通过 HTML 的 style 特性指定的所有样式信息，但不包含 与外部样式表或嵌入样式表经层叠而来的样式。在 style 特性中指定的任何 CSS 属性都将表现为这个 style 对象的相应属性。对于使用短划线(分隔不同的词汇，例如 background-image)的 CSS 属性 名，必须将其转换成驼峰大小写形式，才能通过 JavaScript 来访问。下表列出了几个常见的 CSS 属性及 其在 style 对象中对应的属性名。

多数情况下，都可以通过简单地转换属性名的格式来实现转换。其中一个不能直接转换的 CSS 属性 就是 float。由于 float 是 JavaScript 中的保留字，因此不能用作属性名。“DOM2 级样式”规范规定 样式对象上相应的属性名应该是 cssFloat;Firefox、Safari、Opera 和 Chrome 都支持这个属性，而 IE 支持的则是 styleFloat。

只要取得一个有效的 DOM 元素的引用，就可以随时使用 JavaScript 为其设置样式。以下是几个例子。

```js
var myDiv = document.getElementById("myDiv");
  //设置背景颜色 myDiv.style.backgroundColor = "red";
//改变大小
myDiv.style.width = "100px"; myDiv.style.height = "200px";
//指定边框
myDiv.style.border = "1px solid black";
```

在以这种方式改变样式时，元素的外观会自动被更新。

!> 在标准模式下，所有度量值都必须指定一个度量单位。在混杂模式下，可以将 style.width 设置为"20"，浏览器会假设它是"20px";但在标准模式下，将 style.width 设置为"20"会导致被忽略——因为没有度量单位。在实践中，最好始 终都指定度量单位。

通过 style 对象同样可以取得在 style 特性中指定的样式。以下面的 HTML 代码为例。

```html
<div id="myDiv" style="background-color:blue; width:10px; height:25px"></div>
```

在 style 特性中指定的样式信息可以通过下列代码取得。

```js
alert(myDiv.style.backgroundColor); //"blue"
alert(myDiv.style.width); //"10px"
alert(myDiv.style.height); //"25px"
```

##### DOM 样式属性和方法

  “DOM2 级样式”规范还为 style 对象定义了一些属性和方法。这些属性和方法在提供元素的 style 特性值的同时，也可以修改样式。下面列出了这些属性和方法。

* cssText:读写 style 特性中的 CSS 代码。
* length:应用给元素的 CSS 属性的数量。
* parentRule:表示 CSS 信息的 CSSRule 对象。本节后面将讨论 CSSRule 类型。
* getPropertyCSSValue(propertyName):返回包含给定属性值的 CSSValue 对象。
* getPropertyPriority(propertyName):如果给定的属性使用了!important 设置，则返回"important";否则，返回空字符串。
* getPropertyValue(propertyName):返回给定属性的字符串值。
* item(index):返回给定位置的 CSS 属性的名称。同`[index]`
* removeProperty(propertyName):从样式中删除给定属性。
* setProperty(propertyName,value,priority):将给定属性设置为相应的值，并加上优先权标志("important"或者一个空字符串)。

##### 计算的样式

虽然 style 对象能够提供支持 style 特性的任何元素的样式信息，但它不包含那些从其他样式表 层叠而来并影响到当前元素的样式信息。“DOM2 级样式”增强了 document.defaultView，提供了 getComputedStyle()方法。这个方法接受两个参数:要取得计算样式的元素和一个伪元素字符串(例 如":after")。如果不需要伪元素信息，第二个参数可以是 null。getComputedStyle()方法返回一 9 个 CSSStyleDeclaration 对象(与 style 属性的类型相同)，其中包含当前元素的所有计算的样式。 以下面这个 HTML 页面为例。

```html
<!DOCTYPE html>
<html>
<head>
    <title>Computed Styles Example</title>
    <style type="text/css">
        #myDiv {
            background-color: blue;
            width: 100px;
            height: 200px;
} </style>
</head>
<body>
    <div id="myDiv" style="background-color: red; border: 1px solid black"></div> 
</body>
</html>
```

应用给这个例子中`<div>`元素的样式一方面来自嵌入式样式表(`<style>`元素中的样式)，另一方 面来自其 style 特性。但是，style 特性中设置了 backgroundColor 和 border，没有设置 width 和 height，后者是通过样式表规则应用的。以下代码可以取得这个元素计算后的样式

```js
var myDiv = document.getElementById("myDiv");
var computedStyle = document.defaultView.getComputedStyle(myDiv, null);
 alert(computedStyle.backgroundColor); // "red" ,Firefox 和 Safari 会将所有颜色转换成 RGB 格式(例如红色是 rgb(255,0,0))。
alert(computedStyle.width); // "100px"
alert(computedStyle.height); // "200px"
alert(computedStyle.border); // 在某些浏览器中是"1px solid black", 不会在所有浏览器中都返回值，但 computedStyle.borderLeftWidth 会 返回值。
```
IE 不支持 getComputedStyle()方法，但它有一种类似的概念。在 IE 中，每个具有 style 属性 的元素还有一个 currentStyle 属性。这个属性是 CSSStyleDeclaration 的实例，包含当前元素全 部计算后的样式。取得这些样式的方式也差不多，如下面的例子所示。

```js
var myDiv = document.getElementById("myDiv");
var computedStyle = myDiv.currentStyle; 
alert(computedStyle.backgroundColor); //"red"
alert(computedStyle.width);  //"200px"
alert(computedStyle.height); //"100px"
alert(computedStyle.border); //undefined
```

总结下兼容性的写法：

````js
function getStyle(obj, attr) {
    return obj.currentStyle ? obj.currentStyle[attr] : getComputedStyle(obj, false)[attr];
}
````
