## css技巧

### 输入框校验有值时才显示搜索按钮

```html
.test-1
  input(placeholder="请输入")
  button 搜索
.test-2
  input(placeholder="请输入")
  .tip Writing
```

```sass
button, .tip
  display: none
input:not(:placeholder-shown) + button
  display: block
input:focus:not(:placeholder-shown) + .tip
  display: block
```

<iframe height="200" style="width: 100%;" scrolling="no" title="输入框校验有值时才显示搜索按钮" src="https://codepen.io/fanlinqiang/embed/ZEYqrrX?height=200&theme-id=default&default-tab=css,result" frameborder="no" allowtransparency="true" allowfullscreen="true">
  See the Pen <a href='https://codepen.io/fanlinqiang/pen/ZEYqrrX'>输入框校验有值时才显示搜索按钮</a> by flqbestboy
  (<a href='https://codepen.io/fanlinqiang'>@fanlinqiang</a>) on <a href='https://codepen.io'>CodePen</a>.
</iframe>
