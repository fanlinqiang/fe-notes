## CSS 过渡事件

|事件名称|	何时触发|
|:-|:-|
|transitionstart|CSS过渡已经启动（在延迟之后触发）。|
|transitioncancel|过渡已被取消|
|transitionend|过渡已完成|
|transitionrun|过渡已开始运行（在任何延迟开始之前触发）。|

### transitionend

transitionend 事件会在 CSS transition 结束后触发. 当transition完成前移除transition时，比如移除css的transition-property 属性，事件将不会被触发.如在transition完成前设置  display 为"none"，事件同样不会被触发。

transitionend 事件是双向触发的 - 当完成到转换状态的过渡，以及完全恢复到默认或非转换状态时都会触发。 如果没有过渡延迟或持续时间，即两者的值都为0s或者都未声明， 则不发生过渡，并且任何过渡事件都不会触发。如果触发了 transitioncancel 事件，则transitionend 事件不会触发。

例：

```js
/*
 * 在指定的元素上监听transitionend事件, 例如#slidingMenu
 * 然后指定一个函数, 例如 showMessage()
 */
function showMessage() {
    console.log('Transition 已完成');
}

var element = document.getElementById("slidingMenu");
element.addEventListener("transitionend", showMessage, false);
```
