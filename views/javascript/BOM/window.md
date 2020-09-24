## window对象

BOM 的核心对象是 window，它表示浏览器的一个实例。在浏览器中，window 对象有双重角色， 它既是通过 JavaScript 访问浏览器窗口的一个接口，又是 ECMAScript 规定的 Global 对象。这意味着 在网页中定义的任何一个对象、变量和函数，都以 window 作为其 Global 对象，因此有权访问 parseInt()等方法。

### 全局作用域

由于 window 对象同时扮演着 ECMAScript 中 Global 对象的角色，因此所有在全局作用域中声明的变量、函数都会变成 window 对象的属性和方法。
```js
var a = '1';
function b () {}

console.log(window.a, window.b);

// let, const 声明的变量，并不会挂载在window上
let c = '3';
const d = '3';
console.log(window.c, window.d); // undefined undefined
```

抛开全局变量会成为window对象的属性不谈，定义全局变量与在window对象上直接定义属性还 是有一点差别:全局变量不能通过 delete 操作符删除，而直接在 window 对象上的定义的属性可以。
```js
var age = 29;
// 通过Object.getOwnPropertyDescriptor查看当前的属性定义，可知此时的属性configurable为false，则此属性不可delete
Object.getOwnPropertyDescriptor(window, 'age') // {value: 29, writable: true, enumerable: true, configurable: false}
//在IE < 9 时抛出错误，在其他所有浏览器中都返回false
delete window.age;

window.color = "red";
Object.getOwnPropertyDescriptor(window, 'color'); // {value: "red", writable: true, enumerable: true, configurable: true}
//在IE < 9 时抛出错误，在其他所有浏览器中都返回true
delete window.color; //returns true

// 当定义的变量同window已有的属性名相同时,相当于赋值操作，例：window.name
window.name // Chrome
var name = 'test'
window.name // test
```

尝试访问未声明的变量会抛出错误，但是通过查询 window 对象，可以知 道某个可能未声明的变量是否存在。例如:

```js
//这里会抛出错误，因为 oldValue 未定义
var newValue = oldValue;
//这里不会抛出错误，因为这是一次属性查询 //newValue 的值是 undefined
var newValue = window.oldValue;
```

### 窗口位置

跨浏览器取得窗口左边和上边的位置

```js
var leftPos = (typeof window.screenLeft == "number") ? window.screenLeft : window.screenX;
var topPos = (typeof window.screenTop == "number") ? window.screenTop : window.screenY;
```

由于各浏览器厂商对此的不同计算规则，无法在跨浏览器的条件下取得窗口左边和上边的精确坐标值。

### 窗口大小

跨浏览器确定一个窗口的大小不是一件简单的事。IE9+、Firefox、Safari、Opera 和 Chrome 均为此提 供了 4 个属性:innerWidth、innerHeight、outerWidth 和 outerHeight。在 IE9+、Safari 和 Firefox 中，outerWidth 和 outerHeight 返回浏览器窗口本身的尺寸(无论是从最外层的 window 对象还是从 某个框架访问)。在 Opera 中，这两个属性的值表示页面视图容器1的大小。而 innerWidth 和 innerHeight 则表示该容器中页面视图区的大小(减去边框宽度)。在 Chrome 中，outerWidth、outerHeight 与 innerWidth、innerHeight 返回相同的值，即视口(viewport)大小而非浏览器窗口大小。
IE8 及更早版本没有提供取得当前浏览器窗口尺寸的属性;不过，它通过 DOM 提供了页面可见区域 的相关信息。
在 IE、Firefox、Safari、Opera 和 Chrome 中，document.documentElement.clientWidth 和 document.documentElement.clientHeight 中保存了页面视口的信息。在 IE6 中，这些属性必须在 标准模式下才有效;如果是混杂模式，就必须通过 document.body.clientWidth 和 document.body. clientHeight 取得相同信息。而对于混杂模式下的 Chrome，则无论通过 document.documentEle- ment 还是 document.body 中的 clientWidth 和 clientHeight 属性，都可以取得视口的大小。
  虽然最终无法确定浏览器窗口本身的大小，但却可以取得页面视口的大小，如下所示。
```js
var pageWidth = window.innerWidth,
    pageHeight = window.innerHeight;
if (typeof pageWidth != "number"){
    if (document.compatMode == "CSS1Compat"){
        pageWidth = document.documentElement.clientWidth;
        pageHeight = document.documentElement.clientHeight;
    } else {
        pageWidth = document.body.clientWidth;
        pageHeight = document.body.clientHeight;
    }
}
```

### 导航和打开窗口

Window 接口的 open() 方法，是用指定的名称将指定的资源加载到浏览器上下文（窗口 window ，内嵌框架 iframe 或者标签 tab ）。如果没有指定名称，则一个新的窗口会被打开并且指定的资源会被加载进这个窗口的浏览器上下文中。四个参数：要加载的 URL、窗口目标、一个特性字符串以及一个表示新页面是否取代浏览 器历史记录中当前加载页面的布尔值。通常只须传递第一个参数，最后一个参数只在不打开新窗口的情 况下使用。

语法：
> window.open(URL,name,specs,replace);

参数：
|参数|说明|
|:-|:-|
|URL|可选。打开指定的页面的URL。如果没有指定URL，打开一个新的空白窗口|
|name|可选。指定target属性或窗口的名称。|
|specs|可选。一个逗号分隔的项目列表。|

其中name支持以下值：

|值|描述|
|:-|:-|
|_blank| URL加载到一个新的窗口。这是默认|
|_parent| URL加载到父框架|
|_self| URL替换当前页面|
|_top| URL替换任何可加载的框架集|
|name| 窗口名称|

specs支持以下值：

* channelmode=yes|no|1|0	是否要在影院模式显示 window。默认是没有的。仅限IE浏览器
* directories=yes|no|1|0	是否添加目录按钮。默认是肯定的。仅限IE浏览器
* fullscreen=yes|no|1|0	浏览器是否显示全屏模式。默认是没有的。在全屏模式下的 window，还必须在影院模式。仅限IE浏览器
* height=pixels	窗口的高度。最小.值为100
* left=pixels	该窗口的左侧位置
* location=yes|no|1|0	是否显示地址字段.默认值是yes
* menubar=yes|no|1|0	是否显示菜单栏.默认值是yes
* resizable=yes|no|1|0	是否可调整窗口大小.默认值是yes
* scrollbars=yes|no|1|0	是否显示滚动条.默认值是yes
* status=yes|no|1|0	是否要添加一个状态栏.默认值是yes
* titlebar=yes|no|1|0	是否显示标题栏.被忽略，除非调用HTML应用程序或一个值得信赖的对话框.默认值是yes
* toolbar=yes|no|1|0	是否显示浏览器工具栏.默认值是yes
* top=pixels	窗口顶部的位置.仅限IE浏览器
* width=pixels	窗口的宽度.最小.值为100
* replace	Optional.Specifies规定了装载到窗口的 URL 是在窗口的浏览历史中创建一个新条目，还是替换浏览历史中的当前条目。支持：true - URL 替换浏览历史中的当前条目。false - URL 在浏览历史中创建新的条目。

```js
window.open("http://www.wrox.com/", "topFrame");
// 等同于
// < a href="http://www.wrox.com" target="topFrame"></a>
```

第二个参数可以是一个窗口或框架的名字，也可以是下列任何一个特殊的窗口名称: ‘_self、_parent、_top 或_blank’。如果制定的窗口或者框架已经存在，就会在该窗口或框架加载这个 URL否则，就 会创建一个新窗口并将其命名为"topFrame"。

### 间歇调用与超时调用

JavaScript 是单线程语言，但它允许通过设置超时值和间歇时间值来调度代码在特定的时刻执行。 前者是在指定的时间过后执行代码，而后者则是每隔指定的时间就执行一次代码

超时调用需要使用 window 对象的 setTimeout()方法，它接受两个参数:要执行的代码和以毫秒 表示的时间(即在执行代码前需要等待多少毫秒)。其中，第一个参数可以是一个包含 JavaScript 代码的 字符串(就和在 eval()函数中使用的字符串一样)，也可以是一个函数。
第二个参数是一个表示等待多长时间的毫秒数，但经过该时间后指定的代码不一定会执行。 JavaScript 是一个单线程序的解释器，因此一定时间内只能执行一段代码。为了控制要执行的代码，就 有一个 JavaScript 任务队列。这些任务会按照将它们添加到队列的顺序执行。setTimeout()的第二个 参数告诉 JavaScript 再过多长时间把当前任务添加到队列中。如果队列是空的，那么添加的代码会立即 执行;如果队列不是空的，那么它就要等前面的代码执行完了以后再执行。

```js
//不建议传递字符串!,传递字符串可能导致性能损失
setTimeout("alert('Hello world!') ", 1000);
//推荐的调用方式
let id = setTimeout(function() {
    alert("Hello world!");
}, 1000);

// 用于清除定时器
clearTimeout(id);
id = null;
```

设置间歇调用的方法是 setInterval()，它接受的参数与 setTimeout()相同:要执行的代码(字符串或函数)和每次执行之前需要等待的毫秒数。下面来看一个例子。

```js
//不建议传递字符串!
setInterval ("alert('Hello world!') ", 10000);
//推荐的调用方式
let id = setInterval (function() {
    alert("Hello world!");
}, 10000);

// 清除
clearInterval(id);
```

在JavaScript代码执行期间，遇到setTimeout 和 setInterval 会将其依次放置到执行栈中，当其他代码执行完后才开始执行执行栈中的“任务”，因此当碰到

```js
... ...
setTimeout(function(){}, 0);
setTimeout(function(){}, 0);
... ...
```

相当于将其中的任务放置到JavaScript代码最后执行，(1)如果回调的执行时间大于间隔间隔，那么浏览器会继续执行它们，导致真正的间隔时间 比原来的大一点；(2)它们存在一个最小的时钟间隔，在 IE6~IE8 中为 15.6ms6，后来精准到 10ms，IE10 为 4ms，其他浏览器相仿。但这些太容易受外部因素影响，比如电池快没电 了，同时打开的应用程序太多了，导致 CPU 忙碌，这些都会让它的数值偏高。

此外还有使用setInterval时其中的“任务”也是一个费时的过程则表现出的现象并不是我们想要的，如：假设我们想要一个任务每隔10s运行一次，而这个任务每次运行可能需要9秒，这样表现出来的可能就是每一秒就运行了这个任务；更有甚者，假设我们想要一个任务每隔10s运行一次，而这个任务每次运行的过程可能要11秒或者20s...,，这时候setInterval就会在执行栈进行累积，随后连续触发，为此我们可以使用setTimeout来实现我们想要的结果：

#### 使用setTimeout代替setInterval？？

```js
!function(){
    console.log("这是一个需要9秒的任务")
    setTimeout(arguments.callee,10000)
}()
```

 面试题：
 ```js
for(var i=0;i<3;i++){
    setTimeout(function(){
        console.log(i--) // 3 2 1
    },0);
}
```

旧版本 IE 的最短时钟间隔太长，可利用 image 死链时立即执行 onerror 回调的情况来实现setTimeout
```js
var orig_setTimeout = window.setTimeout;
window.setTimeout = function(fun, wait) {
    if (wait < 15) {
        orig_setTimeout(fun, wait);
    } else {
        var img = new Image();
        img.onload = img.onerror = function() {
            fun();
        };
        img.src = "data:,foo";
    }
};
```

### 跨文档消息传递

> [postMessage](https://developer.mozilla.org/zh-CN/docs/Web/API/Window/postMessage)

跨文档消息传送(cross-document messaging)，有时候简称为 XDM，指的是在来自不同域的页面间 传递消息。例如，www.wrox.com 域中的页面与位于一个内嵌框架中的 p2p.wrox.com 域中的页面通信。

XDM 的核心是 postMessage()方法。在 HTML5 规范中，除了 XDM 部分之外的其他部分也会提 到这个方法名，但都是为了同一个目的:向另一个地方传递数据。对于 XDM 而言，“另一个地方”指的 是包含在当前页面中的<iframe>元素，或者由当前页面弹出的窗口。
postMessage()方法接收两个参数:一条消息和一个表示消息接收方来自哪个域的字符串。第二 个参数对保障安全通信非常重要，可以防止浏览器把消息发送到不安全的地方。

语法：
```
otherWindow.postMessage(message, targetOrigin, [transfer]);
```

* otherWindow

其他窗口的一个引用，比如iframe的contentWindow属性、执行window.open返回的窗口对象、或者是命名过或数值索引的window.frames。

* message
将要发送到其他 window的数据。它将会被结构化克隆算法序列化。这意味着你可以不受什么限制的将数据对象安全的传送给目标窗口而无需自己序列化。

* targetOrigin
通过窗口的origin属性来指定哪些窗口能接收到消息事件，其值可以是字符串"*"（表示无限制）或者一个URI。在发送消息的时候，如果目标窗口的协议、主机地址或端口这三者的任意一项不匹配targetOrigin提供的值，那么消息就不会被发送；只有三者完全匹配，消息才会被发送。这个机制用来控制消息可以发送到哪些窗口；例如，当用postMessage传送密码时，这个参数就显得尤为重要，必须保证它的值与这条包含密码的信息的预期接受者的origin属性完全一致，来防止密码被恶意的第三方截获。如果你明确的知道消息应该发送到哪个窗口，那么请始终提供一个有确切值的targetOrigin，而不是*。不提供确切的目标将导致数据泄露到任何对数据感兴趣的恶意站点。

* transfer 可选
是一串和message 同时传递的 Transferable 对象. 这些对象的所有权将被转移给消息的接收方，而发送一方将不再保有所有权。

```js
//注意:所有支持 XDM 的浏览器也支持 iframe 的 contentWindow 属性
var iframeWindow = document.getElementById("myframe").contentWindow;
iframeWindow.postMessage("A secret", "http://www.wrox.com");
```

目标窗口需要监听分发的message
```js
window.addEventListener("message", function (e) {
    console.log(e);
});
```

实例：

```
window.parent.postMessage({name: 'test'}, 'http://192.168.60.104:3010/');
window.addEventListener('message', e => {
  console.log(e)
   var d = e.data;  //e.data  里面有自己所传的所有参数  可以根据参数做自己的判断
});

```

message 的属性有:

* data
从其他 window 中传递过来的对象。

* origin
调用 postMessage  时消息发送方窗口的 origin . 这个字符串由 协议、“://“、域名、“ : 端口号”拼接而成。例如 “https://example.org (隐含端口 443)”、“http://example.net (隐含端口 80)”、“http://example.com:8080”。请注意，这个origin不能保证是该窗口的当前或未来origin，因为postMessage被调用后可能被导航到不同的位置。

* source
对发送消息的窗口对象的引用; 您可以使用此来在具有不同origin的两个窗口之间建立双向通信。

#### 安全问题

如果您不希望从其他网站接收message，请不要为message事件添加任何事件侦听器。 这是一个完全万无一失的方式来避免安全问题。

如果您确实希望从其他网站接收message，请始终使用origin和source属性验证发件人的身份。 任何窗口（包括例如http://evil.example.com）都可以向任何其他窗口发送消息，并且您不能保证未知发件人不会发送恶意消息。 但是，验证身份后，您仍然应该始终验证接收到的消息的语法。 否则，您信任只发送受信任邮件的网站中的安全漏洞可能会在您的网站中打开跨网站脚本漏洞。

当您使用postMessage将数据发送到其他窗口时，始终指定精确的目标origin，而不是*。 恶意网站可以在您不知情的情况下更改窗口的位置，因此它可以拦截使用postMessage发送的数据


### JS是单线程还是多线程？

浏览器都是单线程的, 所有的代码执行都是同步当有多个定时器出现时，会交叉生成任务，存入浏览器的任务执行队列当中
```js
setInterval(function(){console.log(1111);},0);
console.log(2222);

// 输出顺序：2222 1111
```

JavaScript引擎的主线程负责执行代码，由于只有一个线程，执行当然是同步的，即按顺序来。JavaScript中的异步通常都是通过回调函数来实现的，回调函数就是将函数的执行权转让给别人。另外，还有一个叫任务队列的东西，所有的异步代码都是从队列当中来。
所以在实际上我们会发现，JavaScript根本不能同时执行两个任务，本质上还是单线程。在JavaScript中所谓的异步有三种：
1. 鼠标键盘事件触发，例如：onclick，onkeydown等等
2. 网络事件触发，例如：onload，onerror
3. 定时器，例如：setTimeout，setInterval

![js执行线程](./images/789123-20171214215200263-1214789358.png 'js执行线程')

### 系统对话框

浏览器通过 alert()、confirm()和 prompt()方法可以调用系统对话框向用户显示消息。系统对 话框与在浏览器中显示的网页没有关系，也不包含 HTML。它们的外观由操作系统及(或)浏览器设置 决定，而不是由 CSS 决定。此外，通过这几个方法打开的对话框都是同步和模态的。也就是说，显示这 些对话框的时候代码会停止执行，而关掉这些对话框后代码又会恢复执行。

```js
alert('error') // '警告'框，参数为一个可以转为字符串的值,弹出的内容为传入的值，和一个确定按钮
alert(Symbol()) // Cannot convert a Symbol value to a string

if (confirm("Are you sure?")) { // 参数同alert，此外弹出的内容会多一个取消按钮，其返回一个boolean值表示用户的选择
        alert("I'm so glad you're sure! ");
} else {
        alert("I'm sorry to hear you're not sure. ");
}

// 这是一个“提示”框，用于提示用户输入一些 文本。提示框中除了显示 OK 和 Cancel 按钮之外，还会显示一个文本输入域，以供用户在其中输入内容。 prompt()方法接受两个参数:要显示给用户的文本提示和文本输入域的默认值(可以是一个空字符串)
 prompt("What's your name?","Michael") // 如果用户单击了 OK 按钮，则 prompt()返回文本输入域的值;如果用户单击了 Cancel 或没有单击OK 而是通过其他方式关闭了对话框，则该方法返回 null。
```

还有两个可以通过 JavaScript 打开的对话框，即“查找”和“打印”。这两个对话框都是异步显示 的，能够将控制权立即交还给脚本。这两个对话框与用户通过浏览器菜单的“查找”和“打印”命令 打开的对话框相同。而在 JavaScript 中则可以像下面这样通过 window 对象的 find()和 print()方法 打开它们。
```js
//显示“打印”对话框
window.print();
//显示“查找”对话框
window.find();
```

这两个方法同样不会就用户在对话框中的操作给出任何信息，因此它们的用处有限。另外，既然这 两个对话框是异步显示的，那么 Chrome 的对话框计数器就不会将它们计算在内，所以它们也不会受用 户禁用后续对话框显示的影响。
