参考：
[网页媒体 | Paged Media](https://cloud.tencent.com/developer/chapter/11195)

|选择器|描述|
|:-|:-|
|:first|伪类描述打印文档时，第一页的样式。仅支持更改文档的边距，orphans, widows 和分页符。所有其他的CSS属性将被忽略|
|:left|打印文档时，:leftCSS 页 伪类与任何左页相匹配。它允许您描述左侧页面的样式。只能更改margin，padding，border，和background页框的属性。所有其他CSS属性将被忽略，只有页面框，而不是页面上的文档内容，将受到影响。|
|:right|:rightCSS 页 伪类匹配任何右页。它允许您描述右侧页面的样式。|
|@page|@规则CSS用于打印document. 您不能改变所有的CSS属性时，修改一些CSS属性@page。您只能更改文档的margins, orphans, widows 和分页符。试图改变任何其他的CSS属性将被忽略。|
|page-break-after|调整分页符后的当前元素。此属性适用于生成框的块元素。它不会适用于<div>不会生成框的空白。|
|page-break-before|调整分页符之前的当前元素。此属性适用于生成框的块元素。它不会适用于<div>不会生成框的空白。|
|page-break-inside|调整分页符内当前元素。|


```css
@page :first {
  margin-left: 50%;
  margin-top: 50%;
}

@page :left {
  margin: 2in 3in;
}


```
