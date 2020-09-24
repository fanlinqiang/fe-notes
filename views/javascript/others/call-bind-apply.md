## 手写bind,call,apply

### call

```js
Function.prototype.myCall = function(context) {
  context = context || window;
  let func = Symbol();
  context[func] = this;
  context[func](...Array.prototype.slice.call(arguments, 1));
  delete context[func];
}
```


### apply

```js
Function.prototype.myApply = function(context) {
  context = context || window;
  let func = Symbol();
  context[func] = this;
  let args = Array.prototype.slice.call(arguments, 1);
  args = args ? args[0] : [];
  context[func](...args);
  delete context[func];
}
```

### bind

```js
Function.prototype.myBind = function(context) {
    let that = this;
    let thatArgs = Array.prototype.slice.call(arguments, 1);
    return function(...args) {
        that.apply(context, thatArgs.concat(args));
    }
}
```
