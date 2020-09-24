## Number

### 千分位分割
```js
function splitBit (num) {
    var c = (num.toString().indexOf ('.') !== -1) ? num.toLocaleString() : num.toString().replace(/(\d)(?=(?:\d{3})+$)/g, '$1,');
    return c;
}
```

### 判断小数是否相等

```js
function epsEqu(x,y) {  
  return Math.abs(x - y) < Math.pow(2, -53);
}
// 举例
0.1 + 0.2 === 0.3 // false
epsEuq(0.1 + 0.2, 0.3) // true
//用户输入的是十进制数字，计算机保存的是二进制数。所以计算结果会有偏差，所以我们不应该直接比较非整数，而是取其上限，把误差计算进去。这样一个上限称为 machine epsilon，双精度的标准 epsilon 值是 2^-53 （Math.pow(2, -53)
```

### 取整
```js
const num1 = ~~ 1.69;
const num2 = 1.69 | 0;
const num3 = 1.69 >> 0;
```

###  幂
```js
2 ** 3 // 8, => Math.pow(2, 3)
```

### 补零
```js
function padStartZero (num, len) {
    return num.toString().padStart(len, '0');
}
```
