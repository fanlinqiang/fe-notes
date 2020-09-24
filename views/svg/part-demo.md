## 示例

<svg width="100" height="50">
     <path d="M-1,-1H6V2H2V35H-1M0,35L6, 35V32H-2Z" stroke="red"/>
</svg>

### 直线
```html
<svg width="100" height="50">
    <style>
        .line {
            stroke: gray;
            stroke-width:2
        }
    </style>
  <line x1="10" y1="10" x2="90" y2="10" fill="red" stroke="blue" stroke-width="1" height="5"/>
  <line x1="0" y1="20" x2="90" y2="20" style="stroke:rgb(99,99,99);stroke-width:2"/>
  <line x1="0" y1="30" x2="90" y2="30" class="line"/>
</svg>
```

### 等级表盘

```pug
svg(width="100" height="100" viewBox="0 0 100 100")
    defs
        linearGradient(x1="1" y1="0" x2="0" y2="0" id="gradient")
            stop(offset="0%" stop-color="#FCBA67")
            stop(offset="25%" stop-color="#F37D44")
            stop(offset="50%" stop-color="#EB4F2A")
            stop(offset="75%" stop-color="#DF0902")
    g
        circle(cx="50", cy="50", r="47", stroke-width="5", stroke="#f0f1f5",fill="none")
        circle(id="circle", cx="50", cy="50", r="47", stroke-width="5", stroke="url('#gradient')", fill="none")
        circle(id="bottom-mask", cx="50", cy="50", r="47", stroke-width="7", stroke="#fff", fill="none")
        circle#status-circle(ref="status-circle", cx="50", cy="50", r="33", :fill="status.color")
        text#status-text(x="50", y="50", fill="#ff5e5e1a") 低危

```

```sass
svg
	transform: rotate(-0.05deg)
	margin: 20px
	circle
		transition: stroke-dasharray .2s
		transform: rotate(-225deg)
		transform-origin: 50% 50%
	#status-circle
		opacity: .1
	#status-text
		text-anchor: middle
		dominant-baseline: middle
		font-size: 14px
```

```js
let score = 10;
function getStatusByScore (score) {
	switch (score) {
		case 1:
		case 2:
			return {
				text: '低',
				color: '#FCBA67'
			};
		case 3:
		case 4:
			return {
				text: '中',
				color: '#F37D44'
			};
		case 5:
		case 6:
		case 7:
		case 8:
			return {
				text: '高',
				color: '#EB4F2A'
			};
		default:
			return {
				text: '超高',
				color: '#DF0902'
			};
	}
}
let status = Object.assign({score}, getStatusByScore(score));
let eleCircles = document.getElementById('circle');
let bottomMask = document.getElementById('bottom-mask');
let statusCircle = document.getElementById('status-circle')
let statusText = document.getElementById('status-text');
let perimeter = 2 * Math.PI * 47; // 圆周总长，总弧长
// 主体弧度
eleCircles.setAttribute('stroke-dasharray', `${perimeter * 3 / 4 * score / 12} ${perimeter * 2}`);
eleCircles.setAttribute('stroke-dasharray', `${perimeter * 3 / 4 * score / 12} ${perimeter * 2}`);
statusCircle.setAttribute('fill', status.color);
statusText.innerHTML = status.text;
statusText.setAttribute('fill', status.color);
// 底部遮罩
bottomMask.setAttribute('stroke-dasharray', `${perimeter * 90 / 360} ${perimeter * 2}`);
bottomMask.setAttribute("stroke-dashoffset", - perimeter * (275 / 360));
```

<iframe height="246" style="width: 100%;" scrolling="no" title="svg-等级表盘" src="//codepen.io/fanlinqiang/embed/PrOvNW/?height=246&theme-id=0&default-tab=js,result" frameborder="no" allowtransparency="true" allowfullscreen="true">
  See the Pen <a href='https://codepen.io/fanlinqiang/pen/PrOvNW/'>svg-等级表盘</a> by flqbestboy
  (<a href='https://codepen.io/fanlinqiang'>@fanlinqiang</a>) on <a href='https://codepen.io'>CodePen</a>.
</iframe>



### 动画签名
```html
<svg width="300" height="100" xmlns="http://www.w3.org/2000/svg" xmlns:svg="http://www.w3.org/2000/svg">
 <!-- Created with SVG-edit - http://svg-edit.googlecode.com/ -->
     <style>
        path {
          stroke-dasharray: 1000;
          stroke-dashoffset: 1000;
          animation: dash 3s linear infinite;
        }
        @keyframes dash {
          to {
            stroke-dashoffset: 0;
          }
        }
     </style>
     <g>
      <path d="m63,18.265625c-0.709835,-0.352667 -1.492264,-0.832726 -2.458332,-0.979166c-0.889034,-0.134764 -1.623737,-0.479773 -2.375,-0.854168c-0.71154,-0.354599 -1.666668,-0.166666 -2.556,-0.166666c-0.967834,0 -1.823254,-0.149794 -2.710503,0.000166c-0.852028,0.144007 -1.290005,0.907688 -1.879333,1.499834c-0.478355,0.480644 -0.858479,1.091953 -1.031498,1.936001c-0.187775,0.916021 -0.837631,1.421047 -1.284836,2.216665c-0.470245,0.836611 -0.565327,1.72154 -0.709,2.647333c-0.12711,0.819061 -0.847095,1.468651 -0.990997,2.400002c-0.12534,0.81122 -0.002342,1.784 -0.004501,2.647333c-0.002251,0.900007 -0.168613,1.818583 -0.425335,2.488665c-0.292889,0.764488 -0.415398,1.781803 -0.658665,2.678669c-0.239624,0.883434 -0.855114,1.579212 -0.916,2.485332c-0.053635,0.798199 0,1.757168 0,2.657166c0,0.747334 0.078526,1.749325 -0.035999,2.506836c-0.147064,0.972717 -0.778801,1.699379 -0.928001,2.661331c-0.105991,0.683365 0.00185,1.692245 -0.32,2.66c-0.246593,0.741478 -0.636356,1.710506 -0.695168,2.514668c-0.072952,0.997555 -0.019032,1.800003 -0.020832,2.599998c-0.002251,1.000008 -0.010445,1.811028 -0.221333,2.600334c-0.228771,0.856251 -0.54258,1.563313 -0.694668,2.767666c-0.085846,0.679783 -0.044518,1.389912 -0.250668,2.698669c-0.089432,0.567768 -0.492661,1.490543 -0.711834,2.533333c-0.165844,0.789066 -0.095901,1.800747 -0.132164,2.600002c-0.027275,0.601181 -0.294769,1.592529 -0.563999,2.399994c-0.330551,0.991379 -0.275398,1.824661 -0.646667,2.778503c-0.255962,0.657608 -0.729958,1.557426 -1,2.342834c-0.300297,0.873405 -0.545948,1.693413 -0.862667,2.477333c-0.312199,0.772736 -0.829773,1.68409 -0.911499,2.491501c-0.088863,0.87793 -0.525848,1.536232 -0.837833,2.543167c-0.228455,0.737343 -0.120274,1.700005 -0.592003,2.566666c-0.398659,0.732414 -0.537468,1.600861 -0.574665,2.400002c-0.042713,0.917641 -0.939091,1.414749 -1,2.257164c-0.065395,0.904472 -0.101006,1.557678 -0.647335,1.942833c-0.56702,0.399742 -1.087784,0.819809 -1.927332,1c-0.843204,0.180977 -1.603413,0.785072 -2.404499,1c-0.866953,0.232597 -1.376696,0.971405 -2.316334,1c-0.870764,0.026497 -1.761667,0 -2.668501,0c-0.837332,0 -1.701672,0.179207 -2.556833,-0.020836c-0.93289,-0.218231 -1.531832,-0.974663 -2.443167,-0.979164l-0.035999,-0.833336l0,-0.882668" id="svg_1" stroke-linecap="null" stroke-linejoin="null" stroke-dasharray="null" stroke-width="5" stroke="#000000" fill="none"/>
    </g>
</svg>
```
<iframe height="221" style="width: 100%;" scrolling="no" title="GbERYZ" src="//codepen.io/fanlinqiang/embed/GbERYZ/?height=221&theme-id=0&default-tab=html,result" frameborder="no" allowtransparency="true" allowfullscreen="true">
  See the Pen <a href='https://codepen.io/fanlinqiang/pen/GbERYZ/'>GbERYZ</a> by flqbestboy
  (<a href='https://codepen.io/fanlinqiang'>@fanlinqiang</a>) on <a href='https://codepen.io'>CodePen</a>.
</iframe>
