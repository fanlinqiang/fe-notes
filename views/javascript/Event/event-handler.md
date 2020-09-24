## 事件处理程序

事件就是用户或浏览器自身执行的某种动作。诸如 click、load 和 mouseover，都是事件的名字。 而响应某个事件的函数就叫做事件处理程序(或事件侦听器)。事件处理程序的名字以"on"开头，因此 click 事件的事件处理程序就是 onclick，load 事件的事件处理程序就是 onload。为事件指定处理 程序的方式有好几种。

### HTML事件处理程序

某个元素支持的每种事件，都可以使用一个与相应事件处理程序同名的 HTML 特性来指定。这个 特性的值应该是能够执行的 JavaScript 代码。

```html
<input type="button" value="Click Me" onclick="alert('Clicked')" />

// 事件处理程序中的代码在执行时，有权访问全局作用 域中的任何代码。
<script type="text/javascript">
    function showMessage(event){ //
        alert("Hello world!");
    }
</script>
<input type="button" value="Click Me" onclick="showMessage()" />

// 这样指定事件处理程序具有一些独到之处。首先，这样会创建一个封装着元素属性值的函数。这个 函数中有一个局部变量 event，也就是事件对象
<input type="button" value="click me" onclick="alert(event.value)">

// 在这个函数内部，this 值等于事件的目标元素
<input type="button" value="click me" onclick="alert(this.value)">

```

，在 HTML 中指定事件处理程序有两个缺点。首先，存在一个时差问题。因为用户可能会在 HTML 元素一出现在页面上就触发相应的事件，但当时的事件处理程序有可能尚不具备执行条件。以前面的例子来说明，假设 showMessage()函数是在按钮下方、页面的最底部定义的。如果用户在页面解 析 showMessage()函数之前就单击了按钮，就会引发错误。为此，很多 HTML 事件处理程序都会被封 装在一个 try-catch 块中，以便错误不会浮出水面，如下面的例子所示:

```html
<input type="button" value="Click Me" onclick="try{showMessage();}catch(ex){}">
```

这样，如果在 showMessage()函数有定义之前单击了按钮，用户将不会看到 JavaScript 错误，因为 在浏览器有机会处理错误之前，错误就被捕获了。
另一个缺点是，这样扩展事件处理程序的作用域链在不同浏览器中会导致不同结果。不同 JavaScript 引擎遵循的标识符解析规则略有差异，很可能会在访问非限定对象成员时出错。
通过 HTML 指定事件处理程序的最后一个缺点是 HTML 与 JavaScript 代码紧密耦合。如果要更换事 件处理程序，就要改动两个地方:HTML 代码和 JavaScript 代码。而这正是许多开发人员摒弃 HTML 事 件处理程序，转而使用 JavaScript 指定事件处理程序的原因所在。


### DOM0 级事件处理程序

```js
// 使用 DOM0 级方法指定的事件处理程序被认为是元素的方法。因此，这时候的事件处理程序是在 元素的作用域中运行;换句话说，程序中的 this 引用当前元素。以这种方式添加的事件处理程序会在事件流的冒泡阶段被处理。
var btn = document.getElementById("myBtn");
btn.onclick = function(){
    alert(this.id);    //"myBtn"
};

btn.onclick = null; //删除事件处理程序
```

### DOM2 级事件处理程序

“DOM2 级事件”定义了两个方法，用于处理指定和删除事件处理程序的操作:addEventListener() 和 removeEventListener()。所有 DOM 节点中都包含这两个方法

#### addEventListener

> 详见：[addEventListener](https://developer.mozilla.org/zh-CN/docs/Web/API/EventTarget/addEventListener)

> 语法：

```
target.addEventListener(type, listener, options);
target.addEventListener(type, listener, useCapture);
```

> 参数：

`type`表示监听事件类型的字符串。

`listener`当所监听的事件类型触发时，会接收到一个事件通知（实现了 Event 接口的对象）对象。listener 必须是一个实现了 EventListener 接口的对象，或者是一个函数。

`options` 可选,一个指定有关 listener 属性的可选参数对象。可用的选项如下：

>> * capture:  Boolean，表示 listener 会在该类型的事件捕获阶段传播到该 EventTarget 时触发。
>> * once:  Boolean，表示 listener 在添加之后最多只调用一次。如果是 true， listener 会在其被调用之后自动移除。
>> * passive: Boolean，设置为true时，表示 listener 永远不会调用 preventDefault()。如果 listener 仍然调用了这个函数，客户端将会忽略它并抛出一个控制台警告。

并不是所有浏览器都支持option参数，可以使用以下方法来检测：

```js
var passiveIfSupported = false;

try {
  window.addEventListener("test", null, Object.defineProperty({}, "passive", { get: function() { passiveIfSupported = { passive: true }; } }));
} catch(err) {

}

window.addEventListener('scroll', function(event) {
  // can't use event.preventDefault();
}, passiveIfSupported );
```

`useCapture` 可选，Boolean，在DOM树中，注册了listener的元素， 是否要先于它下面的EventTarget，调用该listener。 当useCapture(设为true) 时，沿着DOM树向上冒泡的事件，不会触发listener。当一个元素嵌套了另一个元素，并且两个元素都对同一事件注册了一个处理函数时，所发生的事件冒泡和事件捕获是两种不同的事件传播方式。事件传播模式决定了元素以哪个顺序接收事件。

#### removeEventListener

> 详见：[removeEventListener](https://developer.mozilla.org/zh-CN/docs/Web/API/EventTarget/removeEventListener)

> 语法：

```
target.removeEventListener(type, listener[, options]);
target.removeEventListener(type, listener[, useCapture]);
```

通过 addEventListener()添加的事件处理程序只能使用 removeEventListener()来移除;移除时传入的参数与添加处理程序时使用的参数相同。这也意味着通过 addEventListener()添加的匿名函数将无法移除。

```js
var btn = document.getElementById("myBtn");
var handler = function(){
    alert(this.id);
};
btn.addEventListener("click", handler, false);

btn.removeEventListener("click", handler, false); //有效!
```

### IE事件处理程序

IE 实现了与 DOM 中类似的两个方法:attachEvent()和 detachEvent()。这两个方法接受相同 的两个参数:事件处理程序名称与事件处理程序函数。由于 IE8 及更早版本只支持事件冒泡，所以通过 attachEvent()添加的事件处理程序都会被添加到冒泡阶段。

```js
var btn = document.getElementById("myBtn");
// 注意，attachEvent()的第一个参数是"onclick"，而非 DOM 的 addEventListener()方法中 的"click"。
btn.attachEvent("onclick", function(){
    alert("Clicked");
});
```

在 IE 中使用 attachEvent()与使用 DOM0 级方法的主要区别在于事件处理程序的作用域。在使 用 DOM0 级方法的情况下，事件处理程序会在其所属元素的作用域内运行;在使用 attachEvent()方 法的情况下，事件处理程序会在全局作用域中运行，因此 this 等于 window。

```js
var btn = document.getElementById("myBtn");
btn.attachEvent("onclick", function(){
    alert(this === window); //true
});
```

与 addEventListener()类似，attachEvent()方法也可以用来为一个元素添加多个事件处理程序。与 DOM 方法不同的是，这些事件处理程序不是以添加它们的顺序执行，而是以相反的顺序被触发。使用 attachEvent()添加的事件可以通过 detachEvent()来移除，条件是必须提供相同的参数。与 DOM 方法一样，这也意味着添加的匿名函数将不能被移除。不过，只要能够将对相同函数的引用传
给 detachEvent()，就可以移除相应的事件处理程序。


### 兼容性方案

> [removeEventListener](https://developer.mozilla.org/zh-CN/docs/Web/API/EventTarget/removeEventListener)
> [addEventListener](https://developer.mozilla.org/zh-CN/docs/Web/API/EventTarget/addEventListener)
