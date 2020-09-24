## 文字波浪下划线
```pug
a.wave 文字hover，波浪下划线
```
```sass
.wave
	color: blue
	&:hover
		color: #f30
		text-decoration: none
		background: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 20 4'%3E%3Cpath fill='none' stroke='%23ff3300' d='M0 3.5c5 0 5-3 10-3s5 3 10 3 5-3 10-3 5 3 10 3'/%3E%3C/svg%3E") repeat-x 0 100%
		background-size: 20px auto
		animation: waveMove 1s infinite linear
	
@keyframes waveMove
	from
		background-position: 0 100%
	to
		background-position: -20px 100%
```

<iframe height="173" style="width: 100%;" scrolling="no" title="文字波浪下划线" src="//codepen.io/fanlinqiang/embed/vYBxGja/?height=173&theme-id=0&default-tab=css,result" frameborder="no" allowtransparency="true" allowfullscreen="true">
  See the Pen <a href='https://codepen.io/fanlinqiang/pen/vYBxGja/'>文字波浪下划线</a> by flqbestboy
  (<a href='https://codepen.io/fanlinqiang'>@fanlinqiang</a>) on <a href='https://codepen.io'>CodePen</a>.
</iframe>
