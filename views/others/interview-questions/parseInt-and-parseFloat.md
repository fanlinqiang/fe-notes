## parseInt-and-parseFloat

```js
['1', '2', '3'].map(parseInt)
// [ 1, NaN, NaN ]
['1', '2', '3'].map(parseFloat)
// [ 1, 2, 3 ]
```

> parseFloat(string) 只有一个参数，用作将给定值解析成浮点数（如果给定值不能被转换成数值，则会返回 NaN）。

> parseInt() 函数可解析一个字符串，并返回一个整数。
> 语法：parseInt(string, radix)

|参数|描述|
|:-|:-|
|string|必需。要被解析的字符串。|
|radix|	可选。表示要解析的数字的基数。该值介于 2 ~ 36 之间。如果省略该参数或其值为 0，则数字将以 10 为基础来解析。如果它以 “0x” 或 “0X” 开头，将以 16 为基数。如果该参数小于 2 或者大于 36，则 parseInt() 将返回 NaN。|

```js
['1', '2', '3'].map(parseInt)
/*
    相当于:
    parseInt('1', 0) => 1
    parseInt('2', 1) => NaN
    parseInt('3', 2) => NaN
*/
```

```js
['1', '2', '3'].filter(parseInt)
// [ '1']
['1', '2', '3'].reduce(parseInt)
// 1
```


