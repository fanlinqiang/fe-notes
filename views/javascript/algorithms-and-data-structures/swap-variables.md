## 交换两个变量 

### 交换两个数字
```js
let a = 1;
let b = 2;
// 1. 使用中间变量
let t = a;
a = b;
b = t;
// 2. 加减运算
a = a + b;
b = a - b;
a = a - b;
// 3. 异或运算
a = a ^ b;
b = a ^ b;
a = a ^ b;
// 4. 使用数组
a = [a, b];
b = a[0];
a = a[1];
// 5. 使用对象
a = {a, b};
b = a.a;
a = a.b;
// 6. 运算优先级
a = [b, b = a][0];
// 7. ES6的解构赋值
[a, b] = [b, a]
// 8. 利用try catch交换
a=(function () {
    try {
        return b
    }
    finally {
        b = a
    }
})();
```

### 交换两个数组索引值
```js
let arr = [1, 3, 2];
// 1. 中间变量

// 2. splice
function swap(a, b) {
    arr[a] = arr(b, 1, arr[a])[0];
}
```
