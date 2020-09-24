## Text类型

文本节点由 Text 类型表示，包含的是可以照字面解释的纯文本内容。纯文本中可以包含转义后的 HTML 字符，但不能包含 HTML 代码。Text 节点具有以下特征:

* `nodeType` 的值为 3;
* `nodeName` 的值为"#text";
* `nodeValue` 的值为节点所包含的文本; 
* `parentNode` 是一个 `Element`;
* 不支持(没有)子节点。可以通过 `nodeValue` 属性或 `data` 属性访问 `Text` 节点中包含的文本，这两个属性中包含的值相同。对 `nodeValue` 的修改也会通过 `data` 反映出来，反之亦然。使用下列方法可以操作节点中的文本。
* `appendData(text)`:将 text 添加到节点的末尾。
* `deleteData(offset, count)`:从 `offset` 指定的位置开始删除 `count` 个字符。
* `insertData(offset, text)`:在 `offset` 指定的位置插入 `text`。
* `replaceData(offset, count, text)`:用 `text` 替换从 `offset` 指定的位置开始到 `offset+count` 为止处的文本。
* `splitText(offset)`:从 `offset` 指定的位置将当前文本节点分成两个文本节点。
* `substringData(offset, count)`:提取从 `offset` 指定的位置开始到 `offset+count` 为止处的字符串。
*  `length` 属性，保存着节点中字符的数目。而且，`nodeValue.length` 和 `data.length` 中也保存着同样的值


```html
<!-- 没有内容，也就没有文本节点 --> 
<div></div>
<!-- 有空格，因而有一个文本节点 --> 
<div> </div>
<!-- 有内容，因而有一个文本节点 -->
 <div>Hello World!</div>
 <!-- 可以这样修改文本节点 -->
 <!--
 var textNode = div.firstChild; //或者div.childNodes[0]
 div.firstChild.nodeValue = "Some other message";
 -->
```

在修改文本节点时还要注意，此时的字符串会经过 HTML(或 XML，取决于文档类型)编码。换句话说， 小于号、大于号或引号都会像下面的例子一样被转义。
```js
//输出结果是"Some &lt;strong&gt;other&lt;/strong&gt; message" 
div.firstChild.nodeValue = "Some <strong>other</strong> message";
```

#### 创建文本节点

可以使用 document.createTextNode()创建新文本节点，这个方法接受一个参数——要插入节点 中的文本。与设置已有文本节点的值一样，作为参数的文本也将按照 HTML 或 XML 的格式进行编码

```
var textNode = document.createTextNode("<strong>Hello</strong> world!");
```

一般情况下，每个元素只有一个文本子节点。不过，在某些情况下也可能包含多个文本子节点，如下面的例子所示。

```js
var element = document.createElement("div");
element.className = "message";
var textNode = document.createTextNode("Hello world!");
element.appendChild(textNode);
var anotherTextNode = document.createTextNode("Yippee!");
element.appendChild(anotherTextNode);
document.body.appendChild(element);
```

如果两个文本节点是相邻的同胞节点，那么这两个节点中的文本就会连起来显示，中间不会有空格。DOM 文档中存在相邻的同胞文本节点很容易导致混乱，可以使用`normalize()`方法将所有文本节点合并成一个节点，结果节点的 nodeValue 等于将合并前每个文本节点的 nodeValue 值拼接起来的值。与normalize()相反的方法:splitText()。这个方法会将一个文本节点分成两个文本节点，即按照指定的位置分割 nodeValue 值。原来的文本节点将包含从开始到指定位 置之前的内容，新文本节点将包含剩下的文本。这个方法会返回一个新文本节点，该节点与原节点的 parentNode 相同。

!> 浏览器在解析文档时永远不会创建相邻的文本节点。这种情况只会作为执行 DOM 操作的结果出现
