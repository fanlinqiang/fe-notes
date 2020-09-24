## 节流与防抖
节流和防抖，都是优化高频率执行操作的有效手段。

### 防抖函数 debounce
功能：连续的事件，只在最后一次触发时执行操作
应用场景：最常见的就是输入框验证，如：用户注册时候的手机号码验证或邮箱验证。只有等用户输入完毕后，才检查格式是否正确；搜索框sug请求
#### 防抖函数的实现
```js
function debounce (fn, wait) {
    let timer = null;
    return function() {
        let args = arguments;
        let context = this;
        timer && clearTimeout(timer);
        timer = setTimeout(function() {
            fn.apply(context, args);
            clearTimeout(timer);
            timer = null;
        }, wait);
    }
}
// 较为全面的debounce
function debounce (func, wait, immediate) {
  let timeout = void 0;
  return function () {
    let context = this,
        args = arguments;
    let later = function later() {
      timeout = null;
      if (!immediate) {
        func.apply(context, args);
      }
    };
    let callNow = immediate && !timeout;
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
    if (callNow) {
      func.apply(context, args);
    }
  };
}
```

### 节流函数 throttle
功能：限制一个行为在一定时间内只能执行一次。
应用场景：多数在监听页面元素滚动事件的时候会用到。因为滚动事件，是一个高频触发的事件。

#### 节流函数的实现

```js
// 时间戳版
function throttle (fn, wait) {
    let previous = 0; // 上一次时间戳
    return function () {
        let context = this;
        let now = +new Date();
        if (now - previous > wait) { // 第一次会触发，最后一次如果间隔时间小于wait时则会被忽略
            fn.apply(context, arguments);
            previous = now
        }
    }
}
// setTimeout 版
function throttle (fn, wait) {
    let timer = null;
    return function() {
        if (timer) { // 最后一次如果间隔时间小于wait时则会被忽略
            return;
        }
        let context = this;
        let args = arguments;
        timer = setTimeout(function () {
            fn.apply(context, args);
            clearTimeout(timer);
            timer = null;
        }, wait);
    }
}
// 较为完整版
function throttle (func, wait, options) {
  let timeout = void 0,
      context = void 0,
      args = void 0,
      result = void 0;
  let previous = 0;
  if (!options) options = {};

  let later = function later() {
    previous = options.leading === false ? 0 : Date.now();
    timeout = null;
    result = func.apply(context, args);
    if (!timeout) context = args = null;
  };

  let throttled = function throttled() {
    let now = Date.now();
    if (!previous && options.leading === false) previous = now;
    let remaining = wait - (now - previous);
    context = this;
    args = arguments;
    if (remaining <= 0 || remaining > wait) {
      if (timeout) {
        clearTimeout(timeout);
        timeout = null;
      }
      previous = now;
      result = func.apply(context, args);
      if (!timeout) context = args = null;
    } else if (!timeout && options.trailing !== false) {
      timeout = setTimeout(later, remaining);
    }
    return result;
  };

  throttled.cancel = function () {
    clearTimeout(timeout);
    previous = 0;
    timeout = context = args = null;
  };

  return throttled;
}
```



