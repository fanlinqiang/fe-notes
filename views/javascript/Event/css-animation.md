## CSS 动画事件

|事件名称|何时触发|
|:-|:-|
|animationstart|某个 CSS 动画开始时触发。|
|animationend|某个 CSS 动画完成时触发。|
|animationiteration|某个 CSS 动画完成后重新开始时触发。|


### animationend 

animationend 事件会在一个 CSS 动画完成时触发（不包括完成前就已终止的情况，例如元素变得不可见或者动画从元素中移除）。

例：在dom动画完成后移除`class`,以便下次添加时触发

```js
let content = document.querySelector('content');
content.addEventListener('animationend', function () {
    content.classList.remove('info__bounce');
});
```