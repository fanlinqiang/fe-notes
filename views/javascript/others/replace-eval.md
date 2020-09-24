## 替换eval

### 方法1：
```js
(new Function("return 5+4-2+7*3/2"))();

//计算表达式的值
function evil(fn) {
    var Fn = Function;  //一个变量指向Function，防止有些前端编译工具报错
    return new Fn('return ' + fn)();
}
```

### 方法2
```js
function eval1 (str) {
    var script = document.createElement('script');
    script.type="text/javascript";
    script.text=str;
    document.getElementsByTagName('head')[0].appendChild(script);
    document.head.removeChild(document.head.lastChild);
}
```


