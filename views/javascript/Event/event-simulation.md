## 事件模拟

可以使用 JavaScript 在任意时刻来触发特定的事件，而此时的事件就如同浏览器创 建的事件一样。也就是说，这些事件该冒泡还会冒泡，而且照样能够导致浏览器执行已经指定的处理它 们的事件处理程序。

### DOM中的事件模拟

可以在 document 对象上使用 `createEvent()`方法创建 event 对象。这个方法接收一个参数，即表示要创建的事件类型的字符串。在 DOM2 级中，所有这些字符串都使用英文复数形式，而在 DOM3级中都变成了单数。这个参数可以是：

|值|描述|
|:-|:-|
|UIEvents|一般化的 UI 事件。鼠标事件和键盘事件都继承自 UI 事件。DOM3 级中是 UIEvent。|
|MouseEvents|一般化的鼠标事件。DOM3 级中是 MouseEvent。|
|MutationEvents|一般化的 DOM 变动事件。DOM3 级中是 MutationEvent。|
|HTMLEvents|一般化的 HTML 事件。没有对应的 DOM3 级事件(HTML 事件被分散到其他类别中)。|

在创建了 event 对象之后，还需要使用与事件有关的信息对其进行初始化。每种类型的 event 对 象都有一个特殊的方法，为它传入适当的数据就可以初始化该 event 对象。不同类型的这个方法的名 字也不相同，具体要取决于 createEvent()中使用的参数。
模拟事件的最后一步就是触发事件。这一步需要使用 dispatchEvent()方法，所有支持事件的 DOM 节点都支持这个方法。调用 dispatchEvent()方法时，需要传入一个参数，即表示要触发事件 的 event 对象。触发事件之后，该事件就跻身“官方事件”之列了，因而能够照样冒泡并引发相应事 件处理程序的执行。

#### 模拟鼠标事件

创建新的鼠标事件对象并为其指定必要的信息，就可以模拟鼠标事件。创建鼠标事件对象的方法是 为 createEvent()传入字符串"MouseEvents"。返回的对象有一个名为 initMouseEvent()方法， 用于指定与该鼠标事件有关的信息。这个方法接收 15 个参数，分别与鼠标事件中每个典型的属性一一 对应;这些参数的含义如下。

|参数|描述|
|:-|:-|
|type(字符串)|表示要触发的事件类型，例如"click"。|
|bubbles(布尔值)|表示事件是否应该冒泡。为精确地模拟鼠标事件，应该把这个参数设置为true。|
|cancelable(布尔值)|表示事件是否可以取消。为精确地模拟鼠标事件，应该把这个参数设置为 true。|
|view(AbstractView)|与事件关联的视图。这个参数几乎总是要设置为 document.defaultView。|
|detail(整数)|与事件有关的详细信息。这个值一般只有事件处理程序使用，但通常都设置为 0。|
|screenX(整数)|事件相对于屏幕的 X 坐标。|
|screenY(整数)|事件相对于屏幕的 Y 坐标。|
|clientX(整数)|事件相对于视口的 X 坐标。|
|clientY(整数)|事件想对于视口的 Y 坐标。|
|ctrlKey(布尔值)|表示是否按下了 Ctrl 键。默认值为 false。|
|altKey(布尔值)|表示是否按下了 Alt 键。默认值为 false。|
|shiftKey(布尔值)|表示是否按下了 Shift 键。默认值为 false。|
|metaKey(布尔值)|表示是否按下了 Meta 键。默认值为 false。|
|button(整数)|表示按下了哪一个鼠标键。默认值为 0。|
|relatedTarget(对象)|表示与事件相关的对象。这个参数只在模拟 mouseover 或 mouseout时使用。|

显而易见，initMouseEvent()方法的这些参数是与鼠标事件的 event 对象所包含的属性一一对 应的。其中，前 4 个参数对正确地激发事件至关重要，因为浏览器要用到这些参数;而剩下的所有参数 只有在事件处理程序中才会用到。当把 event 对象传给 dispatchEvent()方法时，这个对象的 target 属性会自动设置。

```js
let btn = document.getElementById("myBtn");
//创建事件对象
var event = document.createEvent("MouseEvents");
//初始化事件对象
event.initMouseEvent("click", true, true, document.defaultView, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
//触发事件
btn.dispatchEvent(event);
```

#### 模拟键盘事件

DOM3 级规定，调用 createEvent()并传入"KeyboardEvent"就可以创建一个键盘事件。返回的 7 事件对象会包含一个 initKeyEvent()方法，这个方法接收下列参数。

|参数|描述|
|:-|:-|
| type(字符串)|表示要触发的事件类型，如"keydown"。|
| bubbles(布尔值)|表示事件是否应该冒泡。为精确模拟鼠标事件，应该设置为 true。|
| cancelable(布尔值)|表示事件是否可以取消。为精确模拟鼠标事件，应该设置为 true。 |
|view(AbstractView)|与事件关联的视图。这个参数几乎总是要设置为 document.defaultView。|
| key(布尔值)|表示按下的键的键码。|
| location(整数)|表示按下了哪里的键。0 表示默认的主键盘，1 表示左，2 表示右，3 表示数字键盘，4 表示移动设备(即虚拟键盘)，5 表示手柄。|
| modifiers(字符串)|空格分隔的修改键列表，如"Shift"|
| repeat（整数）|在一行中按了这键几次|

由于 DOM3 级不提倡使用 keypress 事件，因此只能利用这种技术来模拟 keydown 和 keyup 事件。

```js
var textbox = document.getElementById("myTextbox"),
    event;
//以 DOM3 级方式创建事件对象
if (document.implementation.hasFeature("KeyboardEvents", "3.0")){
    event = document.createEvent("KeyboardEvent");
    //初始化事件对象
    event.initKeyboardEvent("keydown", true, true, document.defaultView, "a",0, "Shift", 0);
}
 //触发事件
textbox.dispatchEvent(event);
```

这个例子模拟的是按住 Shift 的同时又按下 A 键。在使用 document.createEvent ("KeyboardEvent")之前，应该先检测浏览器是否支持 DOM3 级事件;其他浏览器返回一个非标准的 KeyboardEvent 对象。
在 Firefox 中，调用 createEvent()并传入"KeyEvents"就可以创建一个键盘事件。返回的事件 对象会包含一个 initKeyEvent()方法，这个方法接受下列 10 个参数。

|参数|描述|
|:-|:-|
| type(字符串)|表示要触发的事件类型，如"keydown"。|
| bubbles(布尔值)|表示事件是否应该冒泡。为精确模拟鼠标事件，应该设置为 true。|
| cancelable(布尔值)|表示事件是否可以取消。为精确模拟鼠标事件，应该设置为 true。|
| view(AbstractView)|与事件关联的视图。这个参数几乎总是要设置为 document.default-View。|
| ctrlKey(布尔值)|表示是否按下了 Ctrl 键。默认值为 false。|
| altKey(布尔值)|表示是否按下了 Alt 键。默认值为 false。|
| shiftKey(布尔值)|表示是否按下了 Shift 键。默认值为 false。|
| metaKey(布尔值)|表示是否按下了 Meta 键。默认值为 false。|
| keyCode(整数)|被按下或释放的键的键码。这个参数对 keydown 和 keyup 事件有用，默认值为 0。|
| charCode(整数)|通过按键生成的字符的 ASCII 编码。这个参数对 keypress 事件有用，默认值为 0。|

将创建的 event 对象传入到 dispatchEvent()方法就可以触发键盘事件，如下面的例子所示。

```js
//只适用于 Firefox
var textbox = document.getElementById("myTextbox")
//创建事件对象
var event = document.createEvent("KeyEvents");
//初始化事件对象
event.initKeyEvent("keypress", true, true, document.defaultView, false, false,
                    false, false, 65, 65);
//触发事件
textbox.dispatchEvent(event)
```

在其他浏览器中，则需要创建一个通用的事件，然后再向事件对象中添加键盘事件特有的信息。 例如:

```js
var textbox = document.getElementById("myTextbox");
//创建事件对象
var event = document.createEvent("Events");
//初始化事件对象
event.initEvent(type, bubbles, cancelable); event.view = document.defaultView; event.altKey = false;
event.ctrlKey = false;
event.shiftKey = false;
event.metaKey = false;
event.keyCode = 65;
event.charCode = 65;
//触发事件
textbox.dispatchEvent(event);
```

以上代码首先创建了一个通用事件，然后调用 initEvent()对其进行初始化，最后又为其添加了 键盘事件的具体信息。在此必须要使用通用事件，而不能使用 UI 事件，因为 UI 事件不允许向 event 对象中再添加新属性(Safari 除外)。像这样模拟事件虽然会触发键盘事件，但却不会向文本框中写入文 本，这是由于无法精确模拟键盘事件所造成的。

#### 模拟变动事件

可以使用 createEvent("MutationEvents")创建一个包含 initMutationEvent()方法的变动事件对象。这个方法接受的参数包括:type、bubbles、 cancelable、relatedNode、preValue、newValue、attrName 和 attrChange。下面来看一个模 拟变动事件的例子。

```js
var event = document.createEvent("MutationEvents");
event.initMutationEvent("DOMNodeInserted", true, false, someNode, "","","",0);
target.dispatchEvent(event);
```

#### 模拟 HTML 事件

```js
var event = document.createEvent("HTMLEvents");
event.initEvent("focus", true, false);
target.dispatchEvent(event);
```

#### 自定义 DOM 事件

DOM3 级还定义了“自定义事件”。自定义事件不是由 DOM 原生触发的，它的目的是让开发人员 创建自己的事件。要创建新的自定义事件，可以调用 createEvent("CustomEvent")。返回的对象有 一个名为 initCustomEvent()的方法，接收如下 4 个参数。

|参数|描述|
|:-|:-|
| type(字符串)|触发的事件类型，例如"keydown"。|
| bubbles(布尔值)|表示事件是否应该冒泡。|
| cancelable(布尔值)|表示事件是否可以取消。|
| detail(对象)|任意值，保存在 event 对象的 detail 属性中。|

```js
var div = document.getElementById("myDiv"),
event;
    div.addEventListener("myevent", function(event){
        alert("DIV: " + event.detail);
    });
    document.addEventListener("myevent", function(event){
        alert("DOCUMENT: " + event.detail);
    });
if (document.implementation.hasFeature("CustomEvents", "3.0")){
    event = document.createEvent("CustomEvent");
    event.initCustomEvent("myevent", true, false, "Hello world!");
    div.dispatchEvent(event);
}
```
