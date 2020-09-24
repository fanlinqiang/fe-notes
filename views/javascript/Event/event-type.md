## 事件类型

Web 浏览器中可能发生的事件有很多类型。如前所述，不同的事件类型具有不同的信息，而“DOM3 级事件”规定了以下几类事件。
* UI(User Interface，用户界面)事件，当用户与页面上的元素交互时触发;
* 焦点事件，当元素获得或失去焦点时触发;
* 鼠标事件，当用户通过鼠标在页面上执行操作时触发;
* 滚轮事件，当使用鼠标滚轮(或类似设备)时触发;
* 文本事件，当在文档中输入文本时触发;
* 键盘事件，当用户通过键盘在页面上执行操作时触发;
* 合成事件，当为 IME(Input Method Editor，输入法编辑器)输入字符时触发;
* 变动(mutation)事件，当底层 DOM 结构发生变化时触发。
* 变动名称事件，当元素或属性名变动时触发。此类事件已经被废弃，没有任何浏览器实现它们，

除了这几类事件之外，HTML5 也定义了一组事件，而有些浏览器还会在 DOM 和 BOM 中实现其他专有事件。这些专有的事件一般都是根据开发人员需求定制的，没有什么规范，因此不同浏览器的实现 有可能不一致。
DOM3 级事件模块在 DOM2 级事件模块基础上重新定义了这些事件，也添加了一些新事件。包括 IE9 在内的所有主流浏览器都支持 DOM2 级事件。IE9 也支持 DOM3 级事件。

### UI事件

UI 事件指的是那些不一定与用户操作有关的事件。这些事件在 DOM 规范出现之前，都是以这种或 那种形式存在的，而在 DOM 规范中保留是为了向后兼容。现有的 UI 事件。如下。

* DOMActivate:表示元素已经被用户操作(通过鼠标或键盘)激活。这个事件在 DOM3 级事 件中被废弃，但 Firefox 2+和 Chrome 支持它。考虑到不同浏览器实现的差异，不建议使用这个 事件。
* load:当页面完全加载后在 window 上面触发，当所有框架都加载完毕时在框架集上面触发， 当图像加载完毕时在`<img>`元素上面触发，或者当嵌入的内容加载完毕时在`<object>`元素上面 触发。
* unload:当页面完全卸载后在 window 上面触发，当所有框架都卸载后在框架集上面触发，或 者当嵌入的内容卸载完毕后在`<object>`元素上面触发。
* abort:在用户停止下载过程时，如果嵌入的内容没有加载完，则在`<object>`元素上面触发。
* error:当发生 JavaScript 错误时在 window 上面触发，当无法加载图像时在`<img>`元素上面触 发，当无法加载嵌入内容时在`<object>`元素上面触发，或者当有一或多个框架无法加载时在框
架集上面触发。第 17 章将继续讨论这个事件。
* select:当用户选择文本框(`<input>`或`<texterea>`)中的一或多个字符时触发。
* resize:当窗口或框架的大小变化时在 window 或框架上面触发。
* scroll:当用户滚动带滚动条的元素中的内容时，在该元素上面触发。`<body>`元素中包含所加载页面的滚动条。
* pageshow: 当一条会话历史记录被执行的时候将会触发页面显示(pageshow)事件。(这包括了后退/前进按钮操作，同时也会在onload 事件触发后初始化页面时触发)
* pagehide: 事件在用户离开网页时触发。离开网页有多种方式。如点击一个链接，刷新页面，提交表单，关闭浏览器等。


多数这些事件都与 window 对象或表单控件相关.除了 DOMActivate 之外，其他事件在 DOM2 级事件中都归为 HTML 事件(DOMActivate 在 DOM2级中仍然属于 UI 事件)。
```
// 确定浏览器是否支持 DOM2 级事件规定的 HTML 事件,只有根据“DOM2 级事件”实现这些事件的浏览器才会返回 true。而以非标准方式支持这
些事件的浏览器则会返回 false。
var isSupported = document.implementation.hasFeature("HTMLEvents", "2.0");
// 确定浏览器是否支持“DOM3 级事件”定义的事件
var isSupported = document.implementation.hasFeature("UIEvent", "3.0");
```

#### load事件

##### window 对象上

当页面完全加载后(包括所有图像、JavaScript 文件、 CSS 文件等外部资源)，就会触发 window 上面的 load 事件。有两种定义 onload 事件处理程序的方式。

第一种方式：
```js
window.addEventListener('load', function(event) {
    // 与添加其他事件一样，这里也给事件处理程序传入了一个 event 对象。这个 event 对象中不包 含有关这个事件的任何附加信息，但在兼容 DOM 的浏览器中，event.target 属性的值会被设置为 document，而 IE 并不会为这个事件设置 srcElement 属性。
});
```

第二种方式：
```html
<!DOCTYPE html>
<html>
    <body onload="alert('Loaded!')">

    </body>
</html>

```
一般来说，在 window 上面发生的任何事件都可以在`<body>`元素中通过相应的特性来指定，因为 在 HTML 中无法访问 window 元素。实际上，这只是为了保证向后兼容的一种权宜之计，但所有浏览器 都能很好地支持这种方式。

!> 根据“DOM2 级事件”规范，应该在 document 而非 window 上面触发 load 事 件。但是，所有浏览器都在 window 上面实现了该事件，以确保向后兼容。

##### 图像上

图像上面也可以触发 load 事件，无论是在 DOM 中的图像元素还是 HTML 中的图像元素。因此， 可以在 HTML 中为任何图像指定 onload 事件处理程序，

```js
window.addEventListener("load", function(){
    var image = document.createElement("img");
    image.addEventListener("load", function(event){
        event = EventUtil.getEvent(event);
        alert(EventUtil.getTarget(event).src);
    });
    document.body.appendChild(image);
    image.src = "smile.gif"; // 新图像元素不一定要从添加到文档后才开始 下载，只要设置了 src 属性就会开始下载。
});
```

同样的功能也可以通过使用 DOM0 级的 Image 对象实现。在 DOM 出现之前，开发人员经常使用 Image 对象在客户端预先加载图像。可以像使用<img>元素一样使用 Image 对象，只不过无法将其添 加到 DOM 树中。

```js
window.addEventListener("load", function(){
    var image = new Image(); // 有的浏览器将 Image 对象实现为<img>元素，但并非所有浏览器都如此，所以最好将它们区别对待。
    image.addEventListener("load", function(event){
        alert("Image loaded!");
    });
    image.src = "smile.gif";
});
```

##### `<script>`标签上

`<script>`标签上非标准的方式支持 load 事件。在 IE9+、Firefox、Opera、Chrome 和 Safari 3+及 更高版本中，`<script>`元素也会触发 load 事件，以便开发人员确定动态加载的 JavaScript 文件是否加 载完毕。与图像不同，只有在设置了`<script>`元素的 src 属性并将该元素添加到文档后，才会开始下 载 JavaScript 文件。换句话说，对于`<script>`元素而言，指定 src 属性和指定事件处理程序的先后顺 序就不重要了。

```js
window.addEventListener("load", function(){
    var script = document.createElement("script");
    script.addEventListener("load", function(event){
        // 此时，大多数浏览器中 event 对象的 target 属性引用的都是<script>节点，而在 Firefox 3 之前 的版本中，引用的则是 document。IE8 及更早版本不支持<script>元素上的 load 事件。
        alert("Loaded");
    });
    script.src = "example.js";
    document.body.appendChild(script);
});
```

##### `<link>`标签上

IE 和 Opera 还支持`<link>`元素上的 load 事件，以便开发人员确定样式表是否加载完毕。

```js
window.addEventListener("load", function(){
    var link = document.createElement("link");
    link.type = "text/css";
    link.rel= "stylesheet";
    link.addEventListener("load", function(event){
        alert("css loaded");
    });
    link.href = "example.css";
    document.getElementsByTagName("head")[0].appendChild(link);
});
```

与`<script>`节点类似，在未指定 href 属性并将<link>元素添加到文档之前也不会开始下载样式表。

####  unload 事件

与 load 事件对应的是 unload 事件，这个事件在文档被完全卸载后触发。只要用户从一个页面切换到另一个页面，就会发生 unload 事件。而利用这个事件最多的情况是清除引用，以避免内存泄漏。 与 load 事件类似，也有两种指定 onunload 事件处理程序的方式。

第一种方式是使用 JavaScript，如下所示:
```js
window.addEventListener("unload", function(event){
    alert("Unloaded");
});
```

此时生成的 event 对象在兼容 DOM 的浏览器中只包含 target 属性(值为 document)。IE8 及之 前版本则为这个事件对象提供了 srcElement 属性。
指定事件处理程序的第二种方式，也是为`<body>`元素添加一个特性(与 load 事件相似)，如下面 的例子所示:
```html
<!DOCTYPE html>
<html>
    <head>
        <title>Unload Event Example</title>
    </head>
    <body onunload="alert('Unloaded!')">
    </body>
</html>
```

 无论使用哪种方式，都要小心编写onunload事件处理程序中的代码。既然unload事件是在一切 都被卸载之后才触发，那么在页面加载后存在的那些对象，此时就不一定存在了。此时，操作 DOM 节 点或者元素的样式就会导致错误。

!> 根据“DOM2 级事件”，应该在`<body>`元素而非 window 对象上面触发 unload 事件。不过，所有浏览器都在 window 上实现了 unload 事件，以确保向后兼容

#### resize 事件

当浏览器窗口被调整到一个新的高度或宽度时，就会触发 resize 事件。这个事件在 window(窗 口)上面触发，因此可以通过 JavaScript 或者`<body>`元素中的 onresize 特性来指定事件处理程序。如前所述，我们还是推荐使用如下所示的 JavaScript 方式:
```js
window.addEventListener("resize", function(event){
       alert("Resized");
});
```

与其他发生在 window 上的事件类似，在兼容 DOM 的浏览器中，传入事件处理程序中的 event 对 象有一个 target 属性，值为 document;而 IE8 及之前版本则未提供任何属性。
关于何时会触发 resize 事件，不同浏览器有不同的机制。IE、Safari、Chrome 和 Opera 会在浏览 器窗口变化了 1 像素时就触发 resize 事件，然后随着变化不断重复触发。Firefox 则只会在用户停止调 整窗口大小时才会触发 resize 事件。由于存在这个差别，应该注意不要在这个事件的处理程序中加入 大计算量的代码，因为这些代码有可能被频繁执行，从而导致浏览器反应明显变慢。

!> 浏览器窗口最小化或最大化时也会触发 resize 事件;

#### scroll 事件

虽然 scroll 事件是在 window 对象上发生的，但它实际表示的则是页面中相应元素的变化。在混 杂模式下，可以通过`<body>`元素的 scrollLeft 和 scrollTop 来监控到这一变化;而在标准模式下， 除 Safari 之外的所有浏览器都会通过`<html>`元素来反映这一变化(Safari 仍然基于`<body>`跟踪滚动位 置)，如下面的例子所示:

```js
window.addEventListener("scroll", function(event){
    if (document.compatMode == "CSS1Compat"){
        alert(document.documentElement.scrollTop);
    } else {
        alert(document.body.scrollTop);
    }
});
```
以上代码指定的事件处理程序会输出页面的垂直滚动位置——根据呈现模式不同使用了不同的元素。由于 Safari 3.1 之前的版本不支持 document.compatMode，因此旧版本的浏览器就会满足第二个条件。与 resize 事件类似，scroll 事件也会在文档被滚动期间重复被触发，所以有必要尽量保持事件处理程序的代码简单。


#### pageshow

在控制台打印由前进/后退按钮以及load事件触发后引起的pageshow事件：
```js
window.addEventListener('pageshow', function(event) {
    // event.persisted, 只读，表示网页是否来自缓存
    console.log('after , pageshow :',event);
});

window.addEventListener('load', function() {     
    console.log('before');
});
```
不规范的写法，你同样可以将这个事件当做一个属性添加到body标签，类似于onload
```
<body onload="myonload()" onpageshow="mypageshowcode()">
```

#### pagehide

onpagehide 事件有时可以替代 onunload 事件，但 onunload 事件触发后无法缓存页面。
为了查看页面是直接从服务器上载入还是从缓存中读取，你可以使用 PageTransitionEvent 对象的 persisted 属性来判断。 如果页面从浏览器的缓存中读取该属性返回 ture，否则返回 false 。

### 焦点事件

焦点事件会在页面元素获得或失去焦点时触发。利用这些事件并与 document.hasFocus()方法及 document.activeElement 属性配合，可以知晓用户在页面上的行踪。

* blur:在元素失去焦点时触发。这个事件不会冒泡;所有浏览器都支持它。
* DOMFocusIn:在元素获得焦点时触发。这个事件与 HTML 事件 focus 等价，但它冒泡。只有
Opera 支持这个事件。DOM3 级事件废弃了 DOMFocusIn，选择了 focusin。
* DOMFocusOut:在元素失去焦点时触发。这个事件是 HTML 事件 blur 的通用版本。只有 Opera支持这个事件。DOM3 级事件废弃了 DOMFocusOut，选择了 focusout。
* focus:在元素获得焦点时触发。这个事件不会冒泡;所有浏览器都支持它。
* focusin:在元素获得焦点时触发。这个事件与 HTML 事件 focus 等价，但它冒泡。支持这个
事件的浏览器有 IE5.5+、Safari 5.1+、Opera 11.5+和 Chrome。
* focusout:在元素失去焦点时触发。这个事件是 HTML 事件 blur 的通用版本。支持这个事件
的浏览器有 IE5.5+、Safari 5.1+、Opera 11.5+和 Chrome。

这一类事件中最主要的两个是 focus 和 blur，它们都是 JavaScript 早期就得到所有浏览器支持的
事件。这些事件的最大问题是它们不冒泡。因此，IE 的 focusin 和 focusout 与 Opera 的 DOMFocusIn 和 DOMFocusOut 才会发生重叠。IE 的方式最后被 DOM3 级事件采纳为标准方式。
当焦点从页面中的一个元素移动到另一个元素，会依次触发下列事件:

1. focusout 在失去焦点的元素上触发;
2. focusin 在获得焦点的元素上触发;
3. blur 在失去焦点的元素上触发;
4. DOMFocusOut 在失去焦点的元素上触发;
5. focus 在获得焦点的元素上触发;
6. DOMFocusIn 在获得焦点的元素上触发。 其中，blur、DOMFocusOut和focusout的事件目标是失去焦点的元素;而focus、DOMFocusIn

和 focusin 的事件目标是获得焦点的元素。 要确定浏览器是否支持这些事件，可以使用如下代码:
```js
var isSupported = document.implementation.hasFeature("FocusEvent", "3.0");
```

### 鼠标与滚轮事件

DOM3 级事件中定义了：
* click:在用户单击主鼠标按钮(一般是左边的按钮)或者按下回车键时触发。这一点对确保 易访问性很重要，意味着 onclick 事件处理程序既可以通过键盘也可以通过鼠标执行。
* dblclick:在用户双击主鼠标按钮(一般是左边的按钮)时触发。从技术上说，这个事件并不 是 DOM2 级事件规范中规定的，但鉴于它得到了广泛支持，所以 DOM3 级事件将其纳入了标准。
* mousedown:在用户按下了任意鼠标按钮时触发。不能通过键盘触发这个事件。
* mouseenter:在鼠标光标从元素外部首次移动到元素范围之内时触发。这个事件不冒泡，而且 在光标移动到后代元素上不会触发。DOM2 级事件并没有定义这个事件，但 DOM3 级事件将它
纳入了规范。IE、Firefox 9+和 Opera 支持这个事件。
* mouseleave:在位于元素上方的鼠标光标移动到元素范围之外时触发。这个事件不冒泡，而且
在光标移动到后代元素上不会触发。DOM2 级事件并没有定义这个事件，但 DOM3 级事件将它
纳入了规范。IE、Firefox 9+和 Opera 支持这个事件。
* mousemove:当鼠标指针在元素内部移动时重复地触发。不能通过键盘触发这个事件。
* mouseout:在鼠标指针位于一个元素上方，然后用户将其移入另一个元素时触发。又移入的另 14 一个元素可能位于前一个元素的外部，也可能是这个元素的子元素。不能通过键盘触发这个事件。
* mouseover:在鼠标指针位于一个元素外部，然后用户将其首次移入另一个元素边界之内时触 发。不能通过键盘触发这个事件。
* mouseup:在用户释放鼠标按钮时触发。不能通过键盘触发这个事件。
页面上的所有元素都支持鼠标事件。除了 mouseenter 和 mouseleave，所有鼠标事件都会冒泡，
也可以被取消，而取消鼠标事件将会影响浏览器的默认行为。取消鼠标事件的默认行为还会影响其他事 件，因为鼠标事件与其他事件是密不可分的关系。
只有在同一个元素上相继触发 mousedown 和 mouseup 事件，才会触发 click 事件;如果 mousedown 或 mouseup 中的一个被取消，就不会触发 click 事件。类似地，只有触发两次 click 事 件，才会触发一次 dblclick 事件。如果有代码阻止了连续两次触发 click 事件(可能是直接取消 click 事件，也可能通过取消 mousedown 或 mouseup 间接实现)，那么就不会触发 dblclick 事件了。这 4 个事件触发的顺序始终如下:

* mousedown
* mouseup
* click
* mousedown
* mouseup
* click
* dblclick

显然，click 和 dblclick 事件都会依赖于其他先行事件的触发;而 mousedown 和 mouseup 则不受其他事件的影响。

使用以下代码可以检测浏览器是否支持以上 DOM2 级事件(除 dbclick、mouseenter 和mouseleave 之外):
```js
var isSupported = document.implementation.hasFeature("MouseEvents", "2.0");
```
要检测浏览器是否支持上面的所有事件，可以使用以下代码:
```js
var isSupported = document.implementation.hasFeature("MouseEvent", "3.0");
```
注意，DOM3 级事件的 feature 名是"MouseEvent"，而非"MouseEvents"。鼠标事件中还有一类滚轮事件。而说是一类事件，其实就是一个 mousewheel 事件。这个事件跟踪 鼠标滚轮，类似于 Mac 的触控板。

#### clientX 和 clientY 属性

表示事件发生时鼠标指针在`视口`中的水平 和垂直坐标。注意，这些值中不包括页面滚动的距离，因此这个位置并不表示鼠标在页面上的位置。
```js
var div = document.getElementById("myDiv");
div.addEventListener("click", function(event){
    event = event || window.event;
    alert("Client coordinates: " + event.clientX + "," + event.clientY);
});
```
#### pageX 和 pageY 属性

表示鼠标光标在页面中的位置，因此坐标是从页面本身计算的。在页面没有滚动的情况下，pageX 和 pageY 的值与 clientX 和 clientY 的值相等。

IE8 及更早版本不支持事件对象上的页面坐标，不过使用客户区坐标和滚动信息可以计算出来。这 时候需要用到 document.body(混杂模式)或 document.documentElement(标准模式)中的 scrollLeft 和 scrollTop 属性。计算过程如下所示:

```js
var div = document.getElementById("myDiv");
div.addEventListener("click", function(event){
    event = event || window.event;
    var pageX = event.pageX,
        pageY = event.pageY;
    if (pageX === undefined){
        pageX = event.clientX + (document.body.scrollLeft || document.documentElement.scrollLeft);
    }
    if (pageY === undefined){
        pageY = event.clientY + (document.body.scrollTop || document.documentElement.scrollTop);
    }
    alert("Page coordinates: " + pageX + "," + pageY)
});
```

#### screenX 和 screenY 属性

表示相对于整个电脑屏幕的位置。
```js
var div = document.getElementById("myDiv");
div.addEventListener("click", function(event){
    event = event || window.event
    alert("Screen coordinates: " + event.screenX + "," + event.screenY);
});
```

#### 修改键

虽然鼠标事件主要是使用鼠标来触发的，但在按下鼠标时键盘上的某些键的状态也可以影响到所要 采取的操作。这些修改键就是 Shift、Ctrl、Alt 和 Meta(在 Windows 键盘中是 Windows 键，在苹果机中 是 Cmd 键)，它们经常被用来修改鼠标事件的行为。DOM 为此规定了 4 个属性，表示这些修改键的状 态:shiftKey、ctrlKey、altKey 和 metaKey。这些属性中包含的都是布尔值，如果相应的键被按 下了，则值为 true，否则值为 false。当某个鼠标事件发生时，通过检测这几个属性就可以确定用户 是否同时按下了其中的键。

```js
var div = document.getElementById("myDiv");
div.addEventListener("click", function(event){
    event = EventUtil.getEvent(event);
    var keys = new Array();
    if (event.shiftKey){
        keys.push("shift");
}
    if (event.ctrlKey){
        keys.push("ctrl");
}
    if (event.altKey){
        keys.push("alt");
}
    if (event.metaKey){
        keys.push("meta");
}
    alert("Keys: " + keys.join(","));
});
```

#### 相关元素

在发生 mouseover 和 mouserout 事件时，还会涉及更多的元素。这两个事件都会涉及把鼠标指 针从一个元素的边界之内移动到另一个元素的边界之内。对 mouseover 事件而言，事件的主目标是获 得光标的元素，而相关元素就是那个失去光标的元素。类似地，对 mouseout 事件而言，事件的主目标 是失去光标的元素，而相关元素则是获得光标的元素。

DOM 通过 event 对象的 relatedTarget 属性提供了相关元素的信息。这个属性只对于 mouseover 和 mouseout 事件才包含值;对于其他事件，这个属性的值是 null。IE8 及之前版本不支持 relatedTarget 属性，但提供了保存着同样信息的不同属性。在 mouseover 事件触发时，IE 的 fromElement 属性中保 存了相关元素;在 mouseout 事件触发时，IE 的 toElement 属性中保存着相关元素。(IE9 支持所有这些 属性。)可以把下面这个跨浏览器取得相关元素的方法添加到 EventUtil 对象中。

```js
function getRelatedTarget (event){
    if (event.relatedTarget){
         return event.relatedTarget;
    } else if (event.toElement){
        return event.toElement;
    } else if (event.fromElement){
        return event.fromElement;
    } else {
        return null;
    }
}
```

#### 鼠标按钮

只有在主鼠标按钮被单击(或键盘回车键被按下)时才会触发 click 事件，因此检测按钮的信息 并不是必要的。但对于 mousedown 和 mouseup 事件来说，则在其 event 对象存在一个 button 属性， 表示按下或释放的按钮。DOM 的 button 属性可能有如下 3 个值:0 表示主鼠标按钮，1 表示中间的鼠 标按钮(鼠标滚轮按钮)，2 表示次鼠标按钮。在常规的设置中，主鼠标按钮就是鼠标左键，而次鼠标 按钮就是鼠标右键。

#### 更多的事件信息

“DOM2 级事件”规范在 event 对象中还提供了 detail 属性，用于给出有关事件的更多信息。对于鼠标事件来说，detail 中包含了一个数值，表示在给定位置上发生了多少次单击。在同一个元素上 相继地发生一次 mousedown 和一次 mouseup 事件算作一次单击。detail 属性从 1 开始计数，每次单 击发生后都会递增。如果鼠标在 mousedown 和 mouseup 之间移动了位置，则 detail 会被重置为 0。

### 键盘与文本事件

有 3 个键盘事件，简述如下

* keydown:当用户按下键盘上的任意键时触发，而且如果按住不放的话，会重复触发此事件。
* keypress:当用户按下键盘上的字符键时触发，而且如果按住不放的话，会重复触发此事件。按下 Esc 键也会触发这个事件。
* keyup:当用户释放键盘上的键时触发。

虽然所有元素都支持以上 3 个事件，但只有在用户通过文本框输入文本时才最常用到。
 只有一个文本事件:textInput。这个事件是对 keypress 的补充，用意是在将文本显示给用户之前更容易拦截文本。在文本插入文本框之前会触发 textInput 事件。
在用户按了一下键盘上的字符键时，首先会触发 keydown 事件，然后紧跟着是 keypress 事件， 最后会触发 keyup 事件。其中，keydown 和 keypress 都是在文本框发生变化之前被触发的;而 keyup 事件则是在文本框已经发生变化之后被触发的。如果用户按下了一个字符键不放，就会重复触发 keydown 和 keypress 事件，直到用户松开该键为止。
如果用户按下的是一个非字符键，那么首先会触发 keydown 事件，然后就是 keyup 事件。如果按 住这个非字符键不放，那么就会一直重复触发 keydown 事件，直到用户松开这个键，此时会触发 keyup 事件。

!> 键盘事件与鼠标事件一样，都支持相同的修改键。而且，键盘事件的事件对象中 也有 shiftKey、ctrlKey、altKey 和 metaKey 属性。IE 不支持 metaKey。

### contextmenu 事件

contextmenu 事件是冒泡的，因此可以为 document 指定一个事件处理程序，用以处理页面 中发生的所有此类事件。这个事件的目标是发生用户操作的元素。在所有浏览器中都可以取消这个事件: 在兼容 DOM 的浏览器中，使用 event.preventDefalut();在 IE 中，将 event.returnValue 的值 设置为 false。因为 contextmenu 事件属于鼠标事件，所以其事件对象中包含与光标位置有关的所有 属性。通常使用 contextmenu 事件来显示自定义的上下文菜单，而使用 onclick 事件处理程序来隐藏该菜单。

### beforeunload 事件

之所以有发生在 window 对象上的 beforeunload 事件，是为了让开发人员有可能在页面卸载前阻止这一操作。这个事件会在浏览器卸载页面之前触发，可以通过它来取消卸载并继续使用原有页面。 但是，不能彻底取消这个事件，因为那就相当于让用户无法离开当前页面了。为此，这个事件的意图是 将控制权交给用户。显示的消息会告知用户页面行将被卸载(正因为如此才会显示这个消息)，询问用 户是否真的要关闭页面，还是希望继续留下来

```js
window.addEventListener('beforeunload', function (event) {
    event = event || window.event
    let message = "I'm really going to miss you if you go.";
    // 必须将 event.returnValue 的值设置为要显示给用户的字符串(对IE 及 Fiefox 而言)
    event.returnValue = message;
    // 作为函数的值返回(对 Safari 和 Chrome 而言)
    return message;
});
```

###  DOMContentLoaded 事件

window 的 load 事件会在页面中的一切都加载完毕时触发，但这个过程可能会因为要 加载的外部资源过多而颇费周折。而 DOMContentLoaded 事件则在形成完整的 DOM 树之后就会触发， 不理会图像、JavaScript 文件、CSS 文件或其他资源是否已经下载完毕。与 load 事件不同， DOMContentLoaded 支持在页面下载的早期添加事件处理程序，这也就意味着用户能够尽早地与页面 进行交互。
要处理 DOMContentLoaded 事件，可以为 document 或 window 添加相应的事件处理程序(尽管 这个事件会冒泡到 window，但它的目标实际上是 document)。DOMContentLoaded 事件对象不会提供任何额外的信息(其 target 属性是 document)。

通常这个事件既可以添加事件处理程序，也可以执行其他 DOM 操作。这个事件始终都会在 load 事件之前触发。 对于不支持 DOMContentLoaded 的浏览器，我们建议在页面加载期间设置一个时间为 0 毫秒的超
时调用，如下面的例子所示。

```js
setTimeout(function(){
    //在此添加事件处理程序
}, 0);
```

这段代码的实际意思就是:“在当前 JavaScript 处理完成后立即运行这个函数。”在页面下载和构建 期间，只有一个 JavaScript 处理过程，因此超时调用会在该过程结束时立即触发。至于这个时间与 DOMContentLoaded 被触发的时间能否同步，主要还是取决于用户使用的浏览器和页面中的其他代码。 为了确保这个方法有效，必须将其作为页面中的第一个超时调用;即便如此，也还是无法保证在所有环 境中该超时调用一定会早于 load 事件被触发。


### hashchange 事件

HTML5 新增了 hashchange 事件，以便在 URL 的参数列表(及 URL 中“#”号后面的所有字符串) 发生变化时通知开发人员。之所以新增这个事件，是因为在 Ajax 应用中，开发人员经常要利用 URL 参 数列表来保存状态或导航信息。
必须要把 hashchange 事件处理程序添加给 window 对象，然后 URL 参数列表只要变化就会调用 它。此时的 event 对象应该额外包含两个属性:oldURL 和 newURL。这两个属性分别保存着参数列表 变化前后的完整 URL。

检测方式:
```js
var isSupported = ("onhashchange" in window) && (document.documentMode === undefined || document.documentMode > 7);
```
