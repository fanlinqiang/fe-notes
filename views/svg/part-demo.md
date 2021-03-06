## 示例

<svg width="100" height="50">
     <path d="M-1,-1H6V2H2V35H-1M0,35L6, 35V32H-2Z" stroke="red"/>
</svg>
### 滚动边
```html
<!--
svg
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
-->
<svg style="background: rgb(51, 51, 51);">
   <defs>
      <path id="flash-path" d="M5 5 L1093 5  L1093 165 L5 165 Z"></path>
      <radialGradient id="radial-gradient" cx="50%" cy="50%" fx="100%" fy="50%" r="50%">
         <stop offset="0%" stop-color="white" stop-opacity="1"></stop>
         <stop offset="100%" stop-color="white" stop-opacity="0"></stop>
      </radialGradient>
      <mask id="flash-mask">
         <circle r="80" cx="0" cy="0" fill="url(#radial-gradient)">
            <animateMotion path="M5 5 L1093 5  L1093 165 L5 165 Z" dur="3s" repeatCount="indefinite"></animateMotion>
         </circle>
      </mask>
   </defs>
   <use href="#flash-path" stroke-width="1" stroke="#84A748" fill="none"></use>
   <use href="#flash-path" stroke-width="3" stroke="#B2D17E" fill="none" mask="url(#flash-mask)"></use>
</svg>
```

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

### loading

```html
<p>效果1</p>
<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 40 40" enable-background="new 0 0 40 40" xml:space="preserve">
  <path opacity="0.2" fill="#FF6700" d="M20.201,5.169c-8.254,0-14.946,6.692-14.946,14.946c0,8.255,6.692,14.946,14.946,14.946
      s14.946-6.691,14.946-14.946C35.146,11.861,28.455,5.169,20.201,5.169z M20.201,31.749c-6.425,0-11.634-5.208-11.634-11.634
      c0-6.425,5.209-11.634,11.634-11.634c6.425,0,11.633,5.209,11.633,11.634C31.834,26.541,26.626,31.749,20.201,31.749z"></path>
  <path fill="#FF6700" d="M26.013,10.047l1.654-2.866c-2.198-1.272-4.743-2.012-7.466-2.012h0v3.312h0
      C22.32,8.481,24.301,9.057,26.013,10.047z" transform="rotate(42.1171 20 20)">
      <animateTransform attributeType="xml" attributeName="transform" type="rotate" from="0 20 20" to="360 20 20" dur="0.5s" repeatCount="indefinite"></animateTransform>
  </path>
</svg>

    <p>效果2</p>
<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 50 50" style="enable-background:new 0 0 50 50" xml:space="preserve">
    <path fill="#FF6700" d="M25.251,6.461c-10.318,0-18.683,8.365-18.683,18.683h4.068c0-8.071,6.543-14.615,14.615-14.615V6.461z" transform="rotate(275.098 25 25)">
        <animateTransform attributeType="xml" attributeName="transform" type="rotate" from="0 25 25" to="360 25 25" dur="0.6s" repeatCount="indefinite"></animateTransform>
    </path>
</svg>
    <p>效果3</p>
<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 50 50" style="enable-background:new 0 0 50 50" xml:space="preserve">
    <path fill="#FF6700" d="M43.935,25.145c0-10.318-8.364-18.683-18.683-18.683c-10.318,0-18.683,8.365-18.683,18.683h4.068c0-8.071,6.543-14.615,14.615-14.615c8.072,0,14.615,6.543,14.615,14.615H43.935z" transform="rotate(275.098 25 25)">
        <animateTransform attributeType="xml" attributeName="transform" type="rotate" from="0 25 25" to="360 25 25" dur="0.6s" repeatCount="indefinite"></animateTransform>
    </path>
</svg>

    <p>效果4</p>
<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 24 24" style="enable-background:new 0 0 50 50" xml:space="preserve">
   <rect x="0" y="0" width="4" height="7" fill="#FF6700" transform="scale(1 1.94336)">
       <animateTransform attributeType="xml" attributeName="transform" type="scale" values="1,1; 1,3; 1,1" begin="0s" dur="0.6s" repeatCount="indefinite"></animateTransform>       
   </rect>
   <rect x="10" y="0" width="4" height="7" fill="#FF6700" transform="scale(1 2.72331)">
       <animateTransform attributeType="xml" attributeName="transform" type="scale" values="1,1; 1,3; 1,1" begin="0.2s" dur="0.6s" repeatCount="indefinite"></animateTransform>       
   </rect>
   <rect x="20" y="0" width="4" height="7" fill="#FF6700" transform="scale(1 1.38997)">
       <animateTransform attributeType="xml" attributeName="transform" type="scale" values="1,1; 1,3; 1,1" begin="0.4s" dur="0.6s" repeatCount="indefinite"></animateTransform>       
   </rect>
</svg>

    <p>效果5</p>
<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="24px" height="30px" viewBox="0 0 24 30" style="enable-background:new 0 0 50 50" xml:space="preserve">
    <rect x="0" y="0" width="4" height="10" fill="#FF6700" transform="translate(0 9.4336)">
        <animateTransform attributeType="xml" attributeName="transform" type="translate" values="0 0; 0 20; 0 0" begin="0" dur="0.6s" repeatCount="indefinite"></animateTransform>
    </rect>
    <rect x="10" y="0" width="4" height="10" fill="#FF6700" transform="translate(0 17.2331)">
        <animateTransform attributeType="xml" attributeName="transform" type="translate" values="0 0; 0 20; 0 0" begin="0.2s" dur="0.6s" repeatCount="indefinite"></animateTransform>
    </rect>
    <rect x="20" y="0" width="4" height="10" fill="#FF6700" transform="translate(0 3.89973)">
        <animateTransform attributeType="xml" attributeName="transform" type="translate" values="0 0; 0 20; 0 0" begin="0.4s" dur="0.6s" repeatCount="indefinite"></animateTransform>
    </rect>
</svg>



    <p>效果6</p>
<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="24px" height="30px" viewBox="0 0 24 30" style="enable-background:new 0 0 50 50" xml:space="preserve">
    <rect x="0" y="9.22656" width="4" height="12.5469" fill="#FF6700">
        <animate attributeName="height" attributeType="XML" values="5;21;5" begin="0s" dur="0.6s" repeatCount="indefinite"></animate>
        <animate attributeName="y" attributeType="XML" values="13; 5; 13" begin="0s" dur="0.6s" repeatCount="indefinite"></animate>
    </rect>
    <rect x="10" y="5.22656" width="4" height="20.5469" fill="#FF6700">
        <animate attributeName="height" attributeType="XML" values="5;21;5" begin="0.15s" dur="0.6s" repeatCount="indefinite"></animate>
        <animate attributeName="y" attributeType="XML" values="13; 5; 13" begin="0.15s" dur="0.6s" repeatCount="indefinite"></animate>
    </rect>
    <rect x="20" y="8.77344" width="4" height="13.4531" fill="#FF6700">
        <animate attributeName="height" attributeType="XML" values="5;21;5" begin="0.3s" dur="0.6s" repeatCount="indefinite"></animate>
        <animate attributeName="y" attributeType="XML" values="13; 5; 13" begin="0.3s" dur="0.6s" repeatCount="indefinite"></animate>
    </rect>
</svg>

    <p>效果7</p>
<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="48px" height="60px" viewBox="0 0 24 30" style="enable-background:new 0 0 50 50" xml:space="preserve">
    <rect x="0" y="0" width="4" height="20" fill="#FF6700">
        <animate attributeName="opacity" attributeType="XML" values="1; .2; 1" begin="0s" dur="0.6s" repeatCount="indefinite"></animate>
    </rect>
    <rect x="7" y="0" width="4" height="20" fill="#FF6700">
        <animate attributeName="opacity" attributeType="XML" values="1; .2; 1" begin="0.2s" dur="0.6s" repeatCount="indefinite"></animate>
    </rect>
    <rect x="14" y="0" width="4" height="20" fill="#FF6700">
        <animate attributeName="opacity" attributeType="XML" values="1; .2; 1" begin="0.4s" dur="0.6s" repeatCount="indefinite"></animate>
    </rect>
</svg>
<p>效果8<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="48px" height="60px" viewBox="0 0 24 30" style="enable-background:new 0 0 50 50" xml:space="preserve">
    <rect x="0" y="7.6416" width="4" height="14.7168" fill="#FF6700" opacity="0.2">
        <animate attributeName="opacity" attributeType="XML" values="0.2; 1; .2" begin="0s" dur="0.6s" repeatCount="indefinite"></animate>
        <animate attributeName="height" attributeType="XML" values="10; 20; 10" begin="0s" dur="0.6s" repeatCount="indefinite"></animate>
        <animate attributeName="y" attributeType="XML" values="10; 5; 10" begin="0s" dur="0.6s" repeatCount="indefinite"></animate>
    </rect>
    <rect x="8" y="5.1416" width="4" height="19.7168" fill="#FF6700" opacity="0.2">
        <animate attributeName="opacity" attributeType="XML" values="0.2; 1; .2" begin="0.15s" dur="0.6s" repeatCount="indefinite"></animate>
        <animate attributeName="height" attributeType="XML" values="10; 20; 10" begin="0.15s" dur="0.6s" repeatCount="indefinite"></animate>
        <animate attributeName="y" attributeType="XML" values="10; 5; 10" begin="0.15s" dur="0.6s" repeatCount="indefinite"></animate>
    </rect>
    <rect x="16" y="7.3584" width="4" height="15.2832" fill="#FF6700" opacity="0.2">
        <animate attributeName="opacity" attributeType="XML" values="0.2; 1; .2" begin="0.3s" dur="0.6s" repeatCount="indefinite"></animate>
        <animate attributeName="height" attributeType="XML" values="10; 20; 10" begin="0.3s" dur="0.6s" repeatCount="indefinite"></animate>
        <animate attributeName="y" attributeType="XML" values="10; 5; 10" begin="0.3s" dur="0.6s" repeatCount="indefinite"></animate>
    </rect>
</svg>
</p>
<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="24px" height="30px" viewBox="0 0 24 30" style="enable-background:new 0 0 50 50" xml:space="preserve">
    <rect x="0" y="0" width="4" height="10" fill="#FF6700" transform="translate(0 9.4336)">
        <animateTransform attributeType="xml" attributeName="transform" type="translate" values="0 0; 0 20; 0 0" begin="0" dur="0.6s" repeatCount="indefinite"></animateTransform>
    </rect>
    <rect x="10" y="0" width="4" height="10" fill="#FF6700" transform="translate(0 17.2331)">
        <animateTransform attributeType="xml" attributeName="transform" type="translate" values="0 0; 0 20; 0 0" begin="0.2s" dur="0.6s" repeatCount="indefinite"></animateTransform>
    </rect>
    <rect x="20" y="0" width="4" height="10" fill="#FF6700" transform="translate(0 3.89973)">
        <animateTransform attributeType="xml" attributeName="transform" type="translate" values="0 0; 0 20; 0 0" begin="0.4s" dur="0.6s" repeatCount="indefinite"></animateTransform>
    </rect>
</svg>
```

<iframe height="265" style="width: 100%;" scrolling="no" title="svg-loading" src="https://codepen.io/fanlinqiang/embed/eYdoGwg?height=265&theme-id=light&default-tab=html,result" frameborder="no" loading="lazy" allowtransparency="true" allowfullscreen="true">
  See the Pen <a href='https://codepen.io/fanlinqiang/pen/eYdoGwg'>svg-loading</a> by flqbestboy
  (<a href='https://codepen.io/fanlinqiang'>@fanlinqiang</a>) on <a href='https://codepen.io'>CodePen</a>.
</iframe>
