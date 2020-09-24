## Document类型

JavaScript 通过 Document 类型表示文档。在浏览器中，document 对象是 HTMLDocument(继承 10 自 Document 类型)的一个实例，表示整个 HTML 页面。而且，document 对象是 window 对象的一个 属性，因此可以将其作为全局对象来访问。Document 节点具有下列特征:

* nodeType 的值为 9;
* nodeName 的值为"#document";
* nodeValue 的值为 null;
* parentNode 的值为 null;
* ownerDocument 的值为 null;
* 其子节点可能是一个 DocumentType(最多一个)、Element(最多一个)、ProcessingInstruction 或 Comment。

Document 类型可以表示 HTML 页面或者其他基于 XML 的文档。不过，最常见的应用还是作为 HTMLDocument实例的document对象。通过这个文档对象，不仅可以取得与页面有关的信息，而且还 能操作页面的外观及其底层结构。

|属性|描述|
|:-|:-|
|documentElement|该属性始终指向 HTML 页面中的`<html>`元素|
|body|直接指向`<body>`元素|
|DocumentType|取得对`<!DOCTYPE>`的引用|
|title|包含着 `<title>`元素中的文本——显示在浏览器窗口的标题栏或标签页上。通过这个属性可以取得当前页面的 标题，也可以修改当前页面的标题并反映在浏览器的标题栏中。修改 title 属性的值不会改变`<title>`元素。|
|URL|包含页面完整的 URL(即地址栏中显示的 URL)|
|domain|只包含页面的域名|
|referrer|保存着链接到当前页面的那个页面的 URL。在没有来源页面的情况下，referrer 属性中可能 会包含空字符串。|
|readyState|属性有两个可能的值:loading，正在加载文档;complete，已经加载完文档|
|compatMode|检测页面的兼容模式,在标准模式下，document.compatMode 的 值等于"CSS1Compat"，而在混杂模式下，document.compatMode 的值等于"BackCompat"|
|head|HTML5 新增,比较稳妥的用法：`var head = document.head || document.getElementsByTagName("head")[0]`|

|方法|描述|
|:-|:-|
|getElementById|接收一个参数:要取得的元素的 ID,返回文档中第一次出现的元素|
|getElementsByTagName|接受一个参数，即要 取得元素的标签名，而返回的是包含零或多个元素的 NodeList,在 HTML 文档中，这个方法会返回一 个 HTMLCollection 对象|
|getElementsByName|返回带有指定名称的对象的集合|
|getElementsByClassName|方法接收一个参数，即一个包含一或多个类名的字符串，返回带有 指定类的所有元素的 NodeList。传入多个类名时，类名的先后顺序不重要。|
|querySelector|返回文档中匹配指定 CSS 选择器的一个元素|
|querySelectorAll|指定一个或多个匹配 CSS 选择器的元素。可以通过 id, class, 类型, 属性, 属性值等作为选择器来获取元素。多个选择器使用逗号(,)分隔。|
|write|向文档写 HTML 表达式 或 JavaScript 代码|
|writeln|等同于 write() 方法，不同的是在每个表达式之后写一个换行符。|
|open|打开一个流，以收集来自任何 document.write() 或 document.writeln() 方法的输出。|
|close|关闭用 document.open() 方法打开的输出流，并显示选定的数据。|




- 文档的子节点

虽然 DOM 标准规定 Document 节点的子节点可以是 DocumentType、Element、ProcessingIn- struction 或 Comment，但还有两个内置的访问其子节点的快捷方式。第一个就是 documentElement 属性，该属性始终指向 HTML 页面中的`<html>`元素。另一个就是通过 childNodes 列表访问文档元素， 但通过 documentElement 属性则能更快捷、更直接地访问该元素。以下面这个简单的页面为例。

```
    <html>
        <body>
        </body>
    </html>
```

这个页面在经过浏览器解析后，其文档中只包含一个子节点，即<html>元素。可以通过 documentElement 或 childNodes 列表来访问这个元素，如下所示。

```js
var html = document.documentElement; //取得对<html>的引用
alert(html === document.childNodes[0]); //true
alert(html === document.firstChild); //true
```
 
这个例子说明，documentElement、firstChild 和 childNodes[0]的值相同，都指向`<html>` 元素。

浏览器对 document.doctype 的支持差别很大，可以给出如下总结。
* IE8 及之前版本:如果存在文档类型声明，会将其错误地解释为一个注释并把它当作 Comment 节点;而 document.doctype 的值始终为 null。
* IE9+及 Firefox:如果存在文档类型声明，则将其作为文档的第一个子节点;document.doctype 是一个 DocumentType 节点，也可以通过 document.firstChild 或 document.childNodes[0] 访问同一个节点。
* Safari、Chrome 和 Opera:如果存在文档类型声明，则将其解析，但不作为文档的子节点。docu-ment.doctype 是一个 DocumentType 节点，但该节点不会出现在 document.childNodes 中。

```html
<!-- 第一条注释 -->
<html>
    <body>
    
    </body>
</html>
<!-- 第二条注释 -->
```

看起来这个页面应该有 3 个子节点:注释、`<html>`元素、注释。从逻辑上讲，我们会认为 document.childNodes 中应该包含与这 3 个节点对应的 3 项。但是，现实中的浏览器在处理位于 `<html>`外部的注释方面存在如下差异。
* IE8 及之前版本、Safari 3.1 及更高版本、Opera 和 Chrome 只为第一条注释创建节点，不为第二 条注释创建节点。结果，第一条注释就会成为 document.childNodes 中的第一个子节点。 
* IE9 及更高版本会将第一条注释创建为 document.childNodes 中的一个注释节点，也会将第二条注释创建为 document.childNodes 中的注释子节点。 
* Firefox 以及 Safari 3.1 之前的版本会完全忽略这两条注释。
同样，浏览器间的这种不一致性也导致了位于`<html>`元素外部的注释没有什么用处。

- 文档信息

作为 HTMLDocument 的一个实例，document 对象还有一些标准的 Document 对象所没有的属性。 这些属性提供了 document 对象所表现的网页的一些信息。其中第一个属性就是 title，包含着 `<title>`元素中的文本——显示在浏览器窗口的标题栏或标签页上。通过这个属性可以取得当前页面的 标题，也可以修改当前页面的标题并反映在浏览器的标题栏中。修改 title 属性的值不会改变`<title>`元素。来看下面的例子。 
  多数情况下，我们都用不着在 document 对象上调用 appendChild()、removeChild()和 replaceChild()方法，因为文档类型(如果存在的话)是只读的，而且它只能有一个元素子节点(该 节点通常早就已经存在了)。
  URL 与 domain 属性是相互关联的。例如，如果 document.URL 等于 http://www.wrox.com/WileyCDA/， 那么 document.domain 就等于 www.wrox.com。
在这 3 个属性中，只有 domain 是可以设置的。但由于安全方面的限制，也并非可以给 domain 设 置任何值。如果 URL 中包含一个子域名，例如 p2p.wrox.com，那么就只能将 domain 设置为"wrox.com" (URL 中包含"www"，如 www.wrox.com 时，也是如此)。不能将这个属性设置为 URL 中不包含的域，
  如下面的例子所示。
  
```html
//假设页面来自 p2p.wrox.com 域
document.domain = "wrox.com"; // 成功
document.domain = "nczonline.net"; // 出错!
```
  
当页面中包含来自其他子域的框架或内嵌框架时，能够设置document.domain就非常方便了。由 于跨域安全限制，来自不同子域的页面无法通过 JavaScript 通信。而通过将每个页面的 document.domain 设置为相同的值，这些页面就可以互相访问对方包含的 JavaScript 对象了。例如， 假设有一个页面加载自 www.wrox.com，其中包含一个内嵌框架，框架内的页面加载自 p2p.wrox.com。 由于 document.domain 字符串不一样，内外两个页面之间无法相互访问对方的 JavaScript 对象。但如 果将这两个页面的 document.domain 值都设置为"wrox.com"，它们之间就可以通信了。
浏览器对 domain 属性还有一个限制，即如果域名一开始是“松散的”(loose)，那么不能将它再设 置为“紧绷的”(tight)。换句话说，在将 document.domain 设置为"wrox.com"之后，就不能再将其 设置回"p2p.wrox.com"，否则将会导致错误，如下面的例子所示。

```
//假设页面来自于 p2p.wrox.com 域
document.domain = "wrox.com"; //松散的(成功)
document.domain = "p2p.wrox.com"; //紧绷的(出错!)
```

所有浏览器中都存在这个限制，但 IE8 是实现这一限制的最早的 IE 版本。

3. 查找元素

在 HTML 文档中，这个方法会返回一 个 HTMLCollection 对象，作为一个“动态”集合，该对象与 NodeList 非常类似。例如，下列代码 会取得页面中所有的<img>元素，并返回一个 HTMLCollection。
```
 var images = document.getElementsByTagName("img");
```
   
这行代码会将一个 HTMLCollection 对象保存在 images 变量中。与 NodeList 对象类似，可以 使用方括号语法或 item()方法来访问 HTMLCollection 对象中的项。而这个对象中元素的数量则可以 通过其 length 属性取得，如下面的例子所示。
```
alert(images.length); //输出图像的数量
alert(images[0].src); //输出第一个图像元素的 src 特性
alert(images.item(0).src);  //输出第一个图像元素的 src 特性
```

HTMLCollection 对象还有一个方法，叫做 namedItem()，使用这个方法可以通过元素的 name 特性取得集合中的项。例如，假设上面提到的页面中包含如下`<img>`元素:

```
<img src="myimage.gif" name="myImage">
```
    
那么就可以通过如下方式从 images 变量中取得这个`<img>`元素:
```
var myImage = images.namedItem("myImage");
```
在提供按索引访问项的基础上，HTMLCollection 还支持按名称访问项，这就为我们取得实际想要 的元素提供了便利。而且，对命名的项也可以使用方括号语法来访问，如下所示:
```
var myImage = images["myImage"]
```
 对 HTMLCollection 而言，我们可以向方括号中传入数值或字符串形式的索引值。在后台，对数 值索引就会调用 item()，而对字符串索引就会调用 namedItem()。
 要想取得文档中的所有元素，可以向 getElementsByTagName()中传入"*"。在 JavaScript 及 CSS 中，星号(*)通常表示“全部”。


4. 特殊集合

除了属性和方法，document 对象还有一些特殊的集合。这些集合都是 HTMLCollection 对象， 为访问文档常用的部分提供了快捷方式，包括:

|属性|描述|
|:-:|:-:|
|anchors|包含文档中所有带 name 特性的`<a>`元素|
|applets|包含文档中所有的`<applet>`元素，因为不再推荐使用`<applet`>元素， 所以这个集合已经不建议使用了|
|forms|包含文档中所有的`<form>`元素，与 `document.getElementsByTagName("form")`得到的结果相同|
|images|包含文档中所有的`<img>`元素，与 `document.getElementsByTagName("img")`得到的结果相同|
|links|包含文档中所有带 href 特性的`<a>`元素|

这个特殊集合始终都可以通过 HTMLDocument 对象访问到，而且，与 HTMLCollection 对象类似， 集合中的项也会随着当前文档内容的更新而更新。
