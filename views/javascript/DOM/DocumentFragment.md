## DocumentFragment类型

在所有节点类型中，只有 DocumentFragment 在文档中没有对应的标记。DOM 规定文档片段 (document fragment)是一种“轻量级”的文档，可以包含和控制节点，但不会像完整的文档那样占用额外的资源。DocumentFragment 节点具有下列特征:

* nodeType 的值为 11;
* nodeName 的值为"#document-fragment";
* nodeValue 的值为 null;
* parentNode 的值为 null;
* 子节点可以是 Element、ProcessingInstruction、Comment、Text、CDATASection 或 EntityReference。

虽然不能把文档片段直接添加到文档中，但可以将它作为一个“仓库”来使用，即可以在里面保存将来可能会添加到文档中的节点。要创建文档片段，可以使用 document.createDocumentFragment()方 法，如下所示:

```js
var fragment = document.createDocumentFragment();
```

文档片段继承了 Node 的所有方法，通常用于执行那些针对文档的 DOM 操作。如果将文档中的节 点添加到文档片段中，就会从文档树中移除该节点，也不会从浏览器中再看到该节点。添加到文档片段 中的新节点同样也不属于文档树。可以通过 appendChild()或 insertBefore()将文档片段中内容添 加到文档中。在将文档片段作为参数传递给这两个方法时，实际上只会将文档片段的所有子节点添加到 相应位置上;文档片段本身永远不会成为文档树的一部分,假设我们想为这个`<ul>`元素添加 3 个列表项。如果逐个地添加列表项，将会导致浏览器反复渲染(呈现)新信息。为避免这个问题，可以像下面这样使用一个文档片段来保存创建的列表项，然后再一次性 将它们添加到文档中。

```html
<ul id="myList"></ul>
```

```js
var fragment = document.createDocumentFragment();
var ul = document.getElementById("myList");
var li = null;
for (var i=0; i < 3; i++){
    li = document.createElement("li");
    li.appendChild(document.createTextNode("Item " + (i+1)));
    fragment.appendChild(li);
}
ul.appendChild(fragment);
```

