### 自定义RippleMarker及弹层

```pug
.map-container
  .map(id="map")
  .popup(id="popup")
script(src="https://maps.googleapis.com/maps/api/js?v=3.exp&sensor=false")
```

```sass
    body, html, .map-container
      position: absolute
      top: 0
      bottom: 0
      left: 0
      right: 0
    .map
      width: 100%
      height: 100%
    .marker-wrapper
      .icon
        position: absolute
        transform: translate(-50%, -100%)
        background-color: #000
        background-repeat: no-repeat
        background-image: url(data:image/png;base64,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)
        background-position: center
        background-size: contain
        width: 21px
        height: 27px
        z-index: 1
      .ripple
          $rippleColor: rgba(244, 69, 66, 1)
          $rippleSize: 40px
          position: absolute
          width: $rippleSize
          height: $rippleSize
          transform: translate(-50%, -50%)
          &::before, &:after
            position: absolute
            top: 0
            left: 0
            background: #FF6D69
            display: block
            width: $rippleSize
            height: $rippleSize
            content: ''
            border-radius: 50%
            box-shadow: 0 0 6px 3px $rippleColor
            animation: rippleAnimation 2s ease-out infinite
          &:after
            animation-delay: .5s
          @keyframes rippleAnimation
            0%
              transform: scale(.1)
              opacity: 0.3
            100%
              transform: scale(2.5)
              opacity: 0.15
    .popup-container
      position: absolute
      transform: translateY(-40px)
    .popup
      position: absolute
      left: 0
      top: 0
      background: #FFFFFF
      border-radius: 8px
      padding: 12px 20px 20px
      width: 260px
      transform: translate(-130px, -100%)
      display: none
      .header
        display: flex
        align-items: flex-start
        justify-content: space-between
        padding-bottom: 10px
        .header-left
          .title
            font-family: Rubik-Medium
            font-size: 16px
            color: #313A46
            line-height: 19px
          .range
            font-family: Rubik-Regular
            font-size: 14px
            color: #949AA8
            line-height: 17px    
```

```js
class RippleMarker extends google.maps.OverlayView {
  constructor (opts) {
    super(opts)
    this.setValues(opts)
  }

  onRemove () {
    this.div.parentNode.removeChild(this.div);
    this.div = null;
  }

  remove () {
    this.setMap(null)
  }

  draw () {
    let _this = this;
    if (!this.div) {
      const panes = this.getPanes()
      this.div = document.createElement('div')
      // this.div.innerHTML = '<div class="ripple"></div>'
      this.div.innerHTML = `
        <div class="marker-wrapper">
        <div class="icon"></div>
        <div class="ripple"></div>
        </div>
      `;
      google.maps.event.addDomListener(this.div.querySelector('.icon'), 'click', function () {
        let {map, popup, position} = _this;
        map.panTo(position); // 有过渡效果
        popup.updateInfo(_this);
      });
      this.div.style.position = 'absolute'
      panes.overlayImage.appendChild(this.div)
    }
    const point = this.getProjection().fromLatLngToDivPixel(this.position)
    if (point) {
      this.div.style.left = point.x + 'px'
      this.div.style.top = point.y + 'px'
    }
  }
}
class Popup extends google.maps.OverlayView {
  constructor (position, content) {
    super();
    this.position = position;

    content.classList.add('popup-bubble');

    // This zero-height div is positioned at the bottom of the bubble.
    let bubbleAnchor = document.createElement('div');
    bubbleAnchor.classList.add('popup-bubble-anchor');
    bubbleAnchor.appendChild(content);

    // This zero-height div is positioned at the bottom of the tip.
    this.containerDiv = document.createElement('div');
    this.containerDiv.classList.add('popup-container');
    this.containerDiv.appendChild(bubbleAnchor);

    this.content = content;

    // Optionally stop clicks, etc., from bubbling up to the map.
    google.maps.OverlayView.preventMapHitsAndGesturesFrom(this.containerDiv);
  }
  onAdd () {
    this.getPanes().floatPane.appendChild(this.containerDiv);
  }
  onRemove () {
    if (this.containerDiv.parentElement) {
      this.containerDiv.parentElement.removeChild(this.containerDiv);
    }
  }
  draw () {
    let divPosition = this.getProjection().fromLatLngToDivPixel(this.position);

    // Hide the popup when it is far out of view.
    let display =
        Math.abs(divPosition.x) < 4000 && Math.abs(divPosition.y) < 4000
    ? 'block'
    : 'none';

    if (display === 'block') {
      this.containerDiv.style.left = divPosition.x + 'px';
      this.containerDiv.style.top = divPosition.y + 'px';
    }
    if (this.containerDiv.style.display !== display) {
      this.containerDiv.style.display = display;
    }
  }
  updateInfo ({ position }) {
    let { content } = this;
    content.style.display = 'block';
    content.innerHTML = `
        <div class="header">
          <div class="header-left">
            <div class="title">Ukong</div>
            <div class="range">1KM Range</div>
          </div>
        </div>
        </div>
        `;
    if (position) {
      this.position = position;
    }
    this.draw();
    return this;
  }
}

function init () {
  const CENTER = [51.508742,-0.120850];
  let map = new google.maps.Map(document.querySelector('.map'), {
    center: new google.maps.LatLng(...CENTER),
    zoom: 8
  });

  let popup = new Popup(new google.maps.LatLng(...CENTER), document.querySelector('.popup'));
  popup.setMap(map);

  let rippleMarker = new RippleMarker({
    position: new google.maps.LatLng(...CENTER),
    map,
    popup
  });

}

init();
```

<iframe height="236" style="width: 100%;" scrolling="no" title="google map ripple maker" src="https://codepen.io/fanlinqiang/embed/gOPZPNQ?height=236&theme-id=light&default-tab=css,result" frameborder="no" allowtransparency="true" allowfullscreen="true">
  See the Pen <a href='https://codepen.io/fanlinqiang/pen/gOPZPNQ'>google map ripple maker</a> by flqbestboy
  (<a href='https://codepen.io/fanlinqiang'>@fanlinqiang</a>) on <a href='https://codepen.io'>CodePen</a>.
</iframe>
