## 将用上传的图片转成base64并显示

```pug
input(type="file" id="chooseImage" accept=".jpg,.jpeg,.png")
img(id="showImg" src="")
```

```js
let chooseImage = document.getElementById('chooseImage');
let img = document.getElementById('showImg');
chooseImage.onchange = function (e) {
	let file = e.target.files[0];
	console.log(file);
	if (!/\.jpeg|jpg|gif|png|svg/.test(file.name)) {
		return;
	} else {
		let reader = new FileReader();
		reader.readAsDataURL(file);
		reader.onloadend = function () { 
			// 图片的 base64 格式, 可以直接当成 img 的 src 属性值
			let dataURL = reader.result;//base64
			img.src = dataURL;
		};
	}
}
```

<iframe height="151" style="width: 100%;" scrolling="no" title="file2dataUrl" src="//codepen.io/fanlinqiang/embed/KOWarw/?height=151&theme-id=0&default-tab=js,result" frameborder="no" allowtransparency="true" allowfullscreen="true">
  See the Pen <a href='https://codepen.io/fanlinqiang/pen/KOWarw/'>file2dataUrl</a> by flqbestboy
  (<a href='https://codepen.io/fanlinqiang'>@fanlinqiang</a>) on <a href='https://codepen.io'>CodePen</a>.
</iframe>


