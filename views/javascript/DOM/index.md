# DOM
DOM(文档对象模型)是针对 HTML 和 XML 文档的一个 API(应用程序编程接口)。DOM 描 绘了一个层次化的节点树，允许开发人员添加、移除和修改页面的某一部分。

## 节点层次

DOM 可以将任何 HTML 或 XML 文档描绘成一个由多层节点构成的结构。节点分为几种不同的类 型，每种类型分别表示文档中不同的信息及(或)标记。每个节点都拥有各自的特点、数据和方法，另 外也与其他节点存在某种关系。节点之间的关系构成了层次，而所有页面标记则表现为一个以特定节点 为根节点的树形结构。以下面的 HTML 为例:

```
    <html>
        <head>
            <title>Sample Page</title>
        </head>
        <body>
            <p>Hello World!</p>
        </body>
    </html>
```

文档节点是每个文档的根节点。在这个例子中，文档节点只有一个子节点，即<html>元素，我们称之为文档元素。文档元素是文档的最外层元素，文档中的其他所有元素都包含在文档元素中。每个文 档只能有一个文档元素。在 HTML 页面中，文档元素始终都是<html>元素。在 XML 中，没有预定义 的元素，因此任何元素都可能成为文档元素。

[Node类型](./Node.md ':include')

[Document类型](./Document.md ':include')

[Element类型](./Element.md ':include')

[Text类型](./Text.md ':include')

[Comment类型](./Comment.md ':include')

[DocumentFragment类型](./DocumentFragment.md ':include')

[Attr类型](./Attr.md ':include')

[动态脚本](./dynamic-script.md ':include')

[动态样式](./dynamic-css.md ':include')

[动态集合](./dynamic-collection.md ':include')

[元素大小](./ElementSize.md ':include')

[遍历](./Iterator.md ':include')

[页面隐藏](./page-visibility.md ':include')



[扩展](./other.md ':include')


