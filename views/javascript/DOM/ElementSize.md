## 元素大小

### 偏移量

偏移量(offset dimension)，包括元素在屏幕上占用的所有可见的空间。元素的可见大小由其高度、宽度决定，包括所有内边距、滚动条和边框大小(注意，不包括外边距)。通过 下列 4 个属性可以取得元素的偏移量。

|属性|描述|
|:-|:-|
|offsetHeight|元素在垂直方向上占用的空间大小，以像素计。包括元素的高度、(可见的) 水平滚动条的高度、上边框高度和下边框高度。|
|offsetWidth|元素在水平方向上占用的空间大小，以像素计。包括元素的宽度、(可见的)垂 直滚动条的宽度、左边框宽度和右边框宽度。|
|offsetLeft|元素的左外边框至包含元素的左内边框之间的像素距离|
|offsetTop|元素的上外边框至包含元素的上内边框之间的像素距离|

!> 其中，offsetLeft 和 offsetTop 属性与包含元素有关，包含元素的引用保存在 offsetParent 属性中。offsetParent 属性不一定与 parentNode 的值相等。例如，`<td>`元素的 offsetParent 是作为其祖先元素的`<table>`元素，因为`<table>`是在 DOM 层次中距`<td>`最近的一个具有大小的元素

![偏移量](/images/offset-dimension.png "偏移量")

要想知道某个元素在页面上的偏移量，将这个元素的 offsetLeft 和 offsetTop 与其 offsetParent 的相同属性相加，如此循环直至根元素，就可以得到一个基本准确的值。

```js
function getElementLeft(element){
    var actualLeft = element.offsetLeft;
    var current = element.offsetParent;
    while (current !== null){
        actualLeft += current.offsetLeft;
        current = current.offsetParent;
    }
    return actualLeft;
}

function getElementTop(element){
    var actualTop = element.offsetTop;
    var current = element.offsetParent;
    while (current !== null){
        actualTop += current. offsetTop;
        current = current.offsetParent;
    }
    return actualTop;
}
```

!> 所有这些偏移量属性都是只读的，而且每次访问它们都需要重新计算。因此，应 该尽量避免重复访问这些属性;如果需要重复使用其中某些属性的值，可以将它们保 存在局部变量中，以提高性能。


### 客户区大小

元素的客户区大小(client dimension)，指的是元素内容及其内边距所占据的空间大小。有关客户区 大小的属性有两个:clientWidth 和 clientHeight。其中，clientWidth 属性是元素内容区宽度加 上左右内边距宽度;clientHeight 属性是元素内容区高度加上上下内边距高度。

![客户区大小](/images/client-dimension.png "客户区大小")

从字面上看，客户区大小就是元素内部的空间大小，因此滚动条占用的空间不计算在内。

要确定浏览器视口大小，可以使用 document.documentElement 或 document.body(在 IE7 之前的版本中)的 clientWidth 和 clientHeight。

```js
// 这个函数首先检查 document.compatMode 属性，以确定浏览器是否运行在混杂模式。Safari 3.1 之前的版本不支持这个属性，因此就会自动执行 else 语句。Chrome、Opera 和 Firefox 大多数情况下都 运行在标准模式下，因此它们也会前进到 else 语句。这个函数会返回一个对象，包含两个属性:width 和 height;表示浏览器视口(<html>或<body>元素)的大小。
function getViewport(){
    if (document.compatMode == "BackCompat"){
        return {
            width: document.body.clientWidth,
            height: document.body.clientHeight
    };
    } else {
        return {
            width: document.documentElement.clientWidth,
            height: document.documentElement.clientHeight
        }; 
    }
}
```

!> 与偏移量相似，客户区大小也是只读的，也是每次访问都要重新计算的.

### 滚动大小

滚动大小(scroll dimension)，指的是包含滚动内容的元素的大小。有些元素(例如 `<html>`元素)，即使没有执行任何代码也能自动地添加滚动条;但另外一些元素，则需要通过 CSS 的 8 overflow 属性进行设置才能滚动。相关属性如下：

|属性|描述|
|:-|:-|
|scrollHeight|在没有滚动条的情况下，元素内容的总高度。|
|scrollWidth|在没有滚动条的情况下，元素内容的总宽度。|
|scrollLeft|被隐藏在内容区域左侧的像素数。通过设置这个属性可以改变元素的滚动位置。| 
|scrollTop|被隐藏在内容区域上方的像素数。通过设置这个属性可以改变元素的滚动位置。|

scrollWidth 和 scrollHeight 主要用于确定元素内容的实际大小。例如，通常认为`<html>`元素。是在 Web 浏览器的视口中滚动的元素(IE6 之前版本运行在混杂模式下时是`<body>`元素)。因此，带有 垂直滚动条的页面总高度就是 document.documentElement.scrollHeight。对于不包含滚动条的页面而言，scrollWidth 和 scrollHeight 与 clientWidth 和 clientHeight 之间的关系并不十分清晰。在这种情况下，基于 document.documentElement 查看 这些属性会在不同浏览器间发现一些不一致性问题，如下所述。

* Firefox 中这两组属性始终都是相等的，但大小代表的是文档内容区域的实际尺寸，而非视口的 尺寸。
* Opera、Safari 3.1 及更高版本、Chrome 中的这两组属性是有差别的，其中 scrollWidth 和 scrollHeight 等于视口大小，而 clientWidth 和 clientHeight 等于文档内容区域的大小
* IE(在标准模式)中的这两组属性不相等，其中 scrollWidth 和 scrollHeight 等于文档内容区域的大小，而 clientWidth 和 clientHeight 等于视口大小。

![滚动大小](/images/scroll-dimension.png "滚动大小")

在确定文档的总高度时(包括基于视口的最小高度时)，必须取得 scrollWidth/clientWidth 和 scrollHeight/clientHeight 中的最大值，才能保证在跨浏览器的环境下得到精确的结果。下面就 是这样一个例子。

```js
var docHeight = Math.max(document.documentElement.scrollHeight, document.documentElement.clientHeight);
var docWidth = Math.max(document.documentElement.scrollWidth, document.documentElement.clientWidth);
```
注意，对于运行在混杂模式下的 IE，则需要用 document.body 代替 document.document- Element。

通过 scrollLeft 和 scrollTop 属性既可以确定元素当前滚动的状态，也可以设置元素的滚动位 置。在元素尚未被滚动时，这两个属性的值都等于 0。如果元素被垂直滚动了，那么 scrollTop 的值 会大于 0，且表示元素上方不可见内容的像素高度。如果元素被水平滚动了，那么 scrollLeft 的值会 大于 0，且表示元素左侧不可见内容的像素宽度。这两个属性都是可以设置的，因此将元素的 scrollLeft 和 scrollTop 设置为 0，就可以重置元素的滚动位置。下面这个函数会检测元素是否位 于顶部，如果不是就将其回滚到顶部。

#### 滚动到最底部

```js
ele.scrollTop = ele.scrollHeight; // 此处也可以给一个足够大的值
```

配合css属性,效果更佳

```css
scroll-behavior: smooth
```

### getBoundingClientRect

这个方法返回会一个矩形对象，包含 4 个属性:left、top、right 和 bottom。这些属性给出了元素在页面中相对于视口的位置。但是，浏览器的实现稍有不同。IE8 及更早版本认为文档的左上角坐 标是(2, 2)，而其他浏览器包括 IE9 则将传统的(0,0)作为起点坐标。因此，就需要在一开始检查一下位于 (0,0)处的元素的位置，在 IE8 及更早版本中，会返回(2,2)，而在其他浏览器中会返回(0,0)。

```js
 function getBoundingClientRect(element){
    var scrollTop = document.documentElement.scrollTop;
    var scrollLeft = document.documentElement.scrollLeft;
    
    if (element.getBoundingClientRect){
        if (typeof arguments.callee.offset != "number"){
            var temp = document.createElement("div");
            temp.style.cssText = "position:absolute;left:0;top:0;"; document.body.appendChild(temp);
            arguments.callee.offset = -temp.getBoundingClientRect().top - scrollTop; 
            document.body.removeChild(temp);
            temp = null;
        }
        var rect = element.getBoundingClientRect();
        var offset = arguments.callee.offset;
        return {
            left: rect.left + offset,
            right: rect.right + offset,
            top: rect.top + offset,
            bottom: rect.bottom + offset
        };
    } else {
        var actualLeft = getElementLeft(element);
        var actualTop = getElementTop(element);
        return {
            left: actualLeft - scrollLeft,
            right: actualLeft + element.offsetWidth - scrollLeft,
            top: actualTop - scrollTop,
            bottom: actualTop + element.offsetHeight - scrollTop
        }
    }
}
```

这个函数在 getBoundingClientRect()有效时，就使用这个原生方法，而在这个方法无效时则 使用默认的计算公式。在某些情况下，这个函数返回的值可能会有所不同，例如使用表格布局或使用滚 动元素的情况下。

!> 由于这里使用了 arguments.callee，所以这个方法不能在严格模式下使用。
