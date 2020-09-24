# 其他

## 过滤输入

有时候，我们需要用户输入的文本中包含或不包含某些字符。例如，电话号码中不能包含非数值字 符。如前所述，响应向文本框中插入字符操作的是 keypress 事件。因此，可以通过阻止这个事件的默 认行为来屏蔽此类字符。

```js
textbox.addEventListener("keypress", function(event) {
    let {target, charCode} = event;

    if (!/\d/.test(String.fromCharCode(charCode)) && charCode > 9 && !event.ctrlKey){
        event.preventDefault();
    }    
}
```
