## Node类型

DOM1 级定义了一个 Node 接口，该接口将由 DOM 中的所有节点类型实现。这个 Node 接口在 JavaScript 中是作为 Node 类型实现的;除了 IE 之外，在其他所有浏览器中都可以访问到这个类型。 JavaScript 中的所有节点类型都继承自 Node 类型，因此所有节点类型都共享着相同的基本属性和方法。
每个节点都有一个 nodeType 属性，用于表明节点的类型。节点类型由在 Node 类型中定义的下列 12 个数值常量来表示，任何节点类型必居其一:

|节点类型|描述|
|:-|:-|
|Node.ELEMENT_NODE(1)|元素节点 |
|Node.ATTRIBUTE_NODE(2)|属性节点 |
|Node.TEXT_NODE(3)|文本节点|
|Node.CDATA_SECTION_NODE(4)|CDATA节点|
|Node.ENTRY_REFERENCE_NODE(5)|实体引用名|
|Node.ENTITY_NODE(6)|实体名称节点|
|Node.PROCESSING_INSTRUCTION_NODE(7)|处理指令节点|
|Node.COMMENT_NODE(8)|注释节点|
|Node.DOCUMENT_NODE(9)|文档节点|
|Node.DOCUMENT_TYPE_NODE(10)|文档类型节点|
|Node.DOCUMENT_FRAGMENT_NODE(11)|文档片段节点|
|Node.NOTATION_NODE(12)|DTD声明节点|

通过节点的`nodeType`属性可以很容易判定一个节点的类型：

```
document.body.nodeType // 1
// 或
document.body.nodeType === Node.ELEMENT_NODE // true, 由于 IE 没有公开 Node 类型的构造函数，这段代码在 IE 中 会导致错误。为了确保跨浏览器兼容，最好还是将 nodeType 属性与数字值进行比较
document.body.nodeType === 1
```

!> 并不是所有节点类型都受到 Web 浏览器的支持。

基本属性：

|属性|描述|
|:-|:-|
|nodeName|节点名称，返回均为大写字母，如：`BODY`|
|nodeValue|节点值，如果你想返回元素的文本，记住文本通常是插入到文本节点中，所以返回的是文本节点的节点值(`element.childNodes[0].nodeValue`)|
|childNodes|子节点列表，返回一个`NodeList` 对象|
|firstChild|属性分别指向其 childNodes 列表中的第一个|
|lastChild|属性分别指向其 childNodes 列表中的最后一个节点|
|previousSibling|上一个相邻元素，包含在 childNodes 列表中的每个节点相互之间都是同胞节点。列表中第一个节点的 previousSibling 属性 值为 null|
|nextSibling|`childNodes`列表中最后一个节点的 `nextSibling` 属性的值同样也为`null`|
|parentNode|该属性指向文档树中的父节点，包含在 `childNodes` 列表中 的所有节点都具有相同的父节点，因此它们的 parentNode 属性都指向同一个节点。|
|ownerDocument|该属性指向表示整个文档的文档节点。这种关 系表示的是任何节点都属于它所在的文档，任何节点都不能同时存在于两个或更多个文档中。通过这个属性，我们可以不必在节点层次中通过层层回溯到达顶端，而是可以直接访问文档节点。|
|normalize|处理文档树中的文本节点。由于解析器的实现或 DOM 操作等原因，可能会出现文本节点不包含文本，或者接连出现两个文本节点 的情况。当在某个节点上调用这个方法时，就会在该节点的后代节点中查找上述两种情况。如果找到了 空文本节点，则删除它;如果找到相邻的文本节点，则将它们合并为一个文本节点。|
|childElementCount|返回子元素(不包括文本节点和注释)的个数|
|firstElementChild|指向第一个子元素;firstChild 的元素版。|
|lastElementChild|指向最后一个子元素;lastChild 的元素版。|
|previousElementSibling|指向前一个同辈元素;previousSibling 的元素版|
|nextElementSibling|指向后一个同辈元素;nextSibling 的元素版|

基本方法：

|方法|描述|
|:-|:-|
|hasChildNodes|这个方法在节点包含一或多个子节点的情况下返回 true;应该说，这是比查询 childNodes 列表的 length 属性更简单的方法。|
|appendChild|用于向 childNodes 列表的末尾添加一个节点,并返回新增的节点|
|insertBefore|接受两个参数:要插入的节点和作为参照的节点。插入节点后，被插入的节点会变成参照节点的前一个同胞节点(previousSibling)，同时被方法返回,如果参照节点是 null，则 insertBefore()与 appendChild()执行相同的操作|
|replaceChild|方法接受的两个参数是:要插入的节点和要替换的节点。要替换的节点将由这个方法返回并从文档树中被移除，同时由要插入的节点占据其位置；如果只传入一个参数则会移除传入的节点。|
|removeChild|参数为希望删除的节点对象。以 Node 对象返回被删除的节点，如果节点不存在则返回 null。|
|cloneNode|用于创建调用这个方法的节点 的一个完全相同的副本。cloneNode()方法接受一个布尔值参数，表示是否执行深复制。在参数为 true 的情况下，执行深复制，也就是复制节点及其整个子节点树;在参数为 false 的情况下，执行浅复制， 即只复制节点本身。返回的副本没有指定挂载的父节点|

1. nodeName 和 nodeValue 属性
要了解节点的具体信息，可以使用 nodeName 和 nodeValue 这两个属性。这两个属性的值完全取 决于节点的类型。在使用这两个值以前，最好是像下面这样先检测一下节点的类型。

```
if (someNode.nodeType == 1){
    value = someNode.nodeName; //nodeName 的值是元素的标签名
}
```
在这个例子中，首先检查节点类型，看它是不是一个元素。如果是，则取得并保存 nodeName 的值。 8 对于元素节点，nodeName 中保存的始终都是元素的标签名，而 nodeValue 的值则始终为 null。

2. 节点关系

每个节点都有一个 `childNodes` 属性，其中保存着一个 `NodeList` 对象。NodeList 是一种类数组 对象，用于保存一组有序的节点，可以通过位置来访问这些节点。请注意，虽然可以通过方括号语法来 访问 NodeList 的值，而且这个对象也有 length 属性，但它并不是 Array 的实例。`NodeList` 对象的 独特之处在于，它实际上是基于 `DOM` 结构动态执行查询的结果，因此 DOM 结构的变化能够自动反映 在 `NodeList` 对象中。我们常说，NodeList 是有生命、有呼吸的对象，而不是在我们第一次访问它们 的某个瞬间拍摄下来的一张快照。
下面的例子展示了如何访问保存在 `NodeList` 中的节点——可以通过方括号，也可以使用 `item()`` 方法。
```
var firstChild = someNode.childNodes[0];
var secondChild = someNode.childNodes.item(1);
var count = someNode.childNodes.length;
```

将伪数组`NodeList`对象转换为数组:
```
function convertToArray(nodes){
    var array = null;
    try {
        array = Array.prototype.slice.call(nodes, 0); //针对非 IE 浏览器,除 IE8 及更早版本之外，这行代码能在任何浏览器中运行。由于 IE8 及更早版本将 NodeList 实现为一个 COM 对象，而我们不能像使用 JScript 对象那样使用这种对象，因此上面的代码会导致 错误。
    } catch (ex) {
        array = new Array();
        for (var i=0, len=nodes.length; i < len; i++){
            array.push(nodes[i]);
        }
    }
        return array;
    }
```

3. 操作节点

因为关系指针都是只读的，所以 DOM 提供了一些操作节点的方法。其中，最常用的方法是 appendChild()，用于向 childNodes 列表的末尾添加一个节点。添加节点后，childNodes 的新增 节点、父节点及以前的最后一个子节点的关系指针都会相应地得到更新。更新完成后，appendChild() 返回新增的节点。来看下面的例子:

```
var returnedNode = someNode.appendChild(newNode);
alert(returnedNode == newNode); //true
alert(someNode.lastChild == newNode); //true
```

如果传入到 appendChild()中的节点已经是文档的一部分了，那结果就是将该节点从原来的位置 转移到新位置。即使可以将 DOM 树看成是由一系列指针连接起来的，但任何 DOM 节点也不能同时出 现在文档中的多个位置上。因此，如果在调用 appendChild()时传入了父节点的第一个子节点，那么 该节点就会成为父节点的最后一个子节点，如下面的例子所示。

```
//someNode 有多个子节点
var returnedNode = someNode.appendChild(someNode.firstChild);
alert(returnedNode == someNode.firstChild); //false
alert(returnedNode == someNode.lastChild); //true
```

!> IE9 之前的版本不会为空白符创建节点。

