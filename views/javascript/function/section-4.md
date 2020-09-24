## Function

##### 语法

```js
let func = new Function ([arg1[, arg2[, ...argN]],] functionBody)
```

其中`arg`表示函数的参数（可选），`functionBody`是字符串形式的函数体。如：

```js
let sum = new Function('a', 'b', 'return a + b;');
sum(1, 2); // 3

let hello = new Function(`console.log('hello')`)
hello(); // hello
```
