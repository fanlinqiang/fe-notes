
## 事件对象

在触发 DOM 上的某个事件时，会产生一个事件对象 event，这个对象中包含着所有与事件有关的信息。包括导致事件的元素、事件的类型以及其他与特定事件相关的信息。例如，鼠标操作导致的事件 对象中，会包含鼠标位置的信息，而键盘操作导致的事件对象中，会包含与按下的键有关的信息。所有 浏览器都支持 event 对象，但支持方式不同。

### DOM中的事件对象

DOM0级、DOM2指定事件处理程序时都会传入event对象。

```js
var btn = document.getElementById("myBtn");
btn.onclick = function(event){
    alert(event.type); //"click"
};
btn.addEventListener("click", function(event){
alert(event.type); //"click" }, false);
```

在通过 HTML 特性指定事件处理程序时，变量 event 中保存着 event 对象。请看下面的例子。

```html
<input type="button" value="Click Me" onclick="alert(event.type)"/>
```

以这种方式提供 event 对象，可以让 HTML 特性事件处理程序与 JavaScript 函数执行相同的操作。 event 对象包含与创建它的特定事件有关的属性和方法。触发的事件类型不一样，可用的属性和方法也不一样。所有的事件都会包含如下表的属性：

|属性/方法 |类 型 |读/写 |说明|
|:-|:-|:-|:-|
|bubbles|Boolean|只读|事件是否冒泡|
|cancelable |Boolean|只读|收否可以取消事件的默认行为|
|currentTarget |Boolean|只读|其事件处理程序当前正在处理事件的元素|
|defaultPrevented|Boolean|只读|是否已经调用了preventDefault()(DOM3级事件中新增)|
|detail |Integer|只读|与事件相关的细节信息|
|eventPhase|Integer|只读|调用事件处理程序的阶段：1.捕获阶段，2.表示“处于目标”，3.表示冒泡阶段|
|preventDefault() |Function|只读|如果cancelable为true，则可以使用这个方法取消事件的默认行为|
|stopImmediatePropagation() |Function|只读|取消事件的进一步捕获或冒泡，同时阻止任何事件处理程序被调用(DOM3级事件中新增)|
|stopPropagation()|Function|只读|如果bubbles为true，则可以使用这个方法取消事件的进一步捕获或冒泡|
|target|Element|只读|事件的目标|
|trusted|Boolean|只读|true表示事件是浏览器生成的，false表示事件是开发人员通过js创建的(DOM3级事件中新增)|
|type |String|只读|被触发的事件类型|
|view|AbstractView|只读|与事件关联的抽象视图。等同于发生事件的window对象|

在事件处理程序内部，对象 this 始终等于 currentTarget 的值，而 target 则只包含事件的实 际目标。如果直接将事件处理程序指定给了目标元素，则 this、currentTarget 和 target 包含相同 的值。

### IE中的事件对象

与访问 DOM 中的 event 对象不同，要访问 IE 中的 event 对象有几种不同的方式，取决于指定事 件处理程序的方法。在使用 DOM0 级方法添加事件处理程序时，event 对象作为 window 对象的一个 属性存在。来看下面的例子。

```js
var btn = document.getElementById("myBtn");
btn.onclick = function(){
    var event = window.event;
    alert(event.type);     //"click"
};
```

在此，我们通过 window.event 取得了 event 对象，并检测了被触发事件的类型(IE 中的 type 属性与 DOM 中的 type 属性是相同的)。可是，如果事件处理程序是使用 attachEvent()添加的，那 么就会有一个 event 对象作为参数被传入事件处理程序函数中，如下所示。
```js
var btn = document.getElementById("myBtn");
btn.attachEvent("onclick", function(event){ alert(event.type); //"click"
});
```
在像这样使用 attachEvent()的情况下，也可以通过 window 对象来访问 event 对象，就像使用 DOM0 级方法时一样。不过为方便起见，同一个对象也会作为参数传递。
如果是通过 HTML 特性指定的事件处理程序，那么还可以通过一个名叫 event 的变量来访问 event 对象(与 DOM 中的事件模型相同)。再看一个例子。

```html
<input type="button" value="Click Me" onclick="alert(event.type)">
```

IE 的 event 对象同样也包含与创建它的事件相关的属性和方法。其中很多属性和方法都有对应的 或者相关的 DOM 属性和方法。与 DOM 的 event 对象一样，这些属性和方法也会因为事件类型的不同 而不同，但所有事件对象都会包含下表所列的属性和方法。

|属性/方法 |类 型 |读/写 |说 明|
|:-|:-|:-|:-|
|cancelBubble|Boolean|读写|默认值为false，但将其设置为true就可以取消事件冒泡(与DOM中 的stopPropagation()方法的作用相同)|
|returnValue|Boolean|读写|默认值为true，但将其设置为false就可以取消事件的默认行为(与 DOM中的preventDefault()方法的作用相同)|
|srcElement |Element|只读|事件的目标(与DOM中的target属性相同)|
|type|String|只读|被触发的事件的类型|


因为事件处理程序的作用域是根据指定它的方式来确定的，所以不能认为 this 会始终等于事件目 标。故而，最好还是使用 event.srcElement 比较保险。例如:

```js
var btn = document.getElementById("myBtn");
btn.onclick = function(){
    alert(window.event.srcElement === this); //true
};
btn.attachEvent("onclick", function(event){
    alert(event.srcElement === this); //false
});
```

如前所述，returnValue 属性相当于 DOM 中的 preventDefault()方法，它们的作用都是取消 给定事件的默认行为。只要将 returnValue 设置为 false，就可以阻止默认行为。来看下面的例子。

```js
var link = document.getElementById("myLink");
link.onclick = function(){
    window.event.returnValue = false;
};
```

相应地，cancelBubble 属性与 DOM 中的 stopPropagation()方法作用相同，都是用来停止事 件冒泡的。由于 IE 不支持事件捕获，因而只能取消事件冒泡;但 stopPropagatioin()可以同时取消 事件捕获和冒泡。例如:

```js
var btn = document.getElementById("myBtn");
btn.onclick = function(){
    alert("Clicked");
    window.event.cancelBubble = true;
};
document.body.onclick = function(){
    alert("Body clicked");
};
```

### 跨浏览器的事件对象

```js
var EventUtil = {
    addHandler (ele, type, handler, isCapture) {
        if(ele.attachEvent){
            ele.attachEvent('on' + type, handler)
            this.addHandler = function(ele, eventName, func) {
                ele.attachEvent('on' + type, handler)
            }
        } else {
            ele.addEventListener(type, handler, !!isCapture)
            this.addHandler = function(ele, func, !!isCapture){
                ele.addEventListener(type, handler, !!isCapture)
            }
        }
    },
    removeHandler: (() => {
        if(window.attachEvent){
        return function(ele, type, handler, isCapture){
            ele.attachEvent('on' + type, handler)
        }
        } else {
            return function(ele, type, handler, isCapture){
                ele.addEventListener(ele, handler, isCapture || false)
            }
        }
    })(),
    getEvent (event) {
        return event ? event : window.event;
    },
    getTarget (event) {
        return event.target || event.srcElement;
    },
    preventDefault (event) {
        if (event.preventDefault){
            event.preventDefault();
        } else {
            event.returnValue = false;
        }
    },
    stopPropagation (event) {
        if (event.stopPropagation){
            event.stopPropagation();
        } else {
            event.cancelBubble = true;
        }
    },
    // 只对于 mouseover 和 mouseout 事件
    getRelatedTarget (event) {
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
};
```
