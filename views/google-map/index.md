* [中文api教程](https://www.runoob.com/googleapi/googleapi-tutorial.html)
* [官方文档](https://developers.google.cn/maps/documentation/javascript/examples/control-replacement)
* [坐标转换](https://mapshaper.org/)
* [http://geojson.io/](http://geojson.io/)
* [https://mapstyle.withgoogle.com/](https://mapstyle.withgoogle.com/)

# 获取地图

获取地址 `http://maps.googleapis.com/maps/api/js` 或 `https://maps.googleapis.com/maps/api/js`

|参数|描述|
|:-|:-|
|key|在Google申请的API key|
|sensor|用于指明应用程序是否使用一个传感器 (类似 GPS 导航) 来定位用户的位置。参数值可以设置为 true 或者 false。|
|callback|加载后的回调方法|

例：

```
<!DOCTYPE html>
<html>
<head>
    <script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyDJW4jsPlNKgv6jFm3B5Edp5ywgdqLWdmc&callback=initMap" async defer></script>
    <script>
        function initMap() {
            let map = new google.maps.Map(document.getElementById("googleMap"), {
                center: new google.maps.LatLng(51.508742, -0.120850),
                zoom: 5,
                mapTypeId: google.maps.MapTypeId.ROADMAP
            });
        }
        // 窗口载入后通过执行 initialize() 函数来初始化 Map 对象，这样可以确保在页面完全载入后再加载 Google 地图：
        google.maps.event.addDomListener(window, 'load', initMap);
    </script>
</head>
<body>
    <!-- 地图容器 -->
    <div id="googleMap" style="width:500px;height:380px;"></div>
</body>
</html>
```

同样我们也可以在页面完全载入后再加载 Google 地图 API。
以下实例使用了 window.onload 来实现页面完全载入后加载 Google 地图 。 loadScript() 函数创建了加载 Google 地图 API `<script>` 标签。此外在标签的末尾添加了 callback=initialize 参数， initialize()作为回调函数会在API完全载入后执行：

```
function loadScript() {
  var script = document.createElement("script");
  script.type = "text/javascript";
  script.src = "https://maps.googleapis.com/maps/api/js?key=AIzaSyBzE9xAESye6Kde-3hT-6B90nfwUkcS8Yw&sensor=false&callback=initialize";
  document.body.appendChild(script);
}

window.onload = loadScript;
```

# 地图 API Map() 构造器

Map() 构造器创建了一个新的地图并插入到指定的HTML元素中（<div> 元素)。

语法：
```
// HTMLElement 规定要把地图放置在那个 HTML 元素中。
// MapOptions 带有地图初始化变量/选项的 MapOptions 对象。
new google.maps.Map(HTMLElement, MapOptions)
```

## MapOptions

|属性|类型|描述|
|:-|:-|:-|
|backgroundColor|string|规定 Map <div> 的背景颜色。|
|center|LatLng|中心点,指定了地图的中心，该中心通过坐标（纬度，经度）在地图上创建一个中心点。如：`new google.maps.LatLng(51.508742,-0.120850)`|
|disableDefaultUI|boolean|是否关闭默认控件集, `true`、`false`|
|disableDoubleClickZoom|boolean|双击时启用/禁用缩放并居中。|
|draggable|boolean|当设置为 False 时，阻止地图被拖拽。默认是 True。|
|draggableCursor|string|规定要显示在可拖拽对象上的光标的名称/URL。|
|draggingCursor|string|规定当对象被拖拽时要显示的光标的名称/URL。|
|keyboardShortcuts|boolean|当设置为 False 时，阻止地图被键盘控制。默认是 True。|
|mapMaker|boolean|如果要使用 Map Maker 图块代替常规图块，则设置为 True。|
|mapTypeControl|boolean|规定 Map 类型控件的默认启用/禁用状态。|
|mapTypeControlOptions|MapTypeControlOptions|Map 类型控件的默认显示选项。|
|mapTypeId|MapTypeId|指定了地图的初始类型：卫星图像的主要街道透明层`HYBRID`、普通的街道地图`ROADMAP`、卫星图像`SATELLITE`、带有自然特征（如地形和植被）的地图`TERRAIN`|
|noClear|boolean|如果设置为 True，则不清空 Map `<div>` 的内容。|
|overviewMapControl|boolean|Overview Map 控件的启用/禁用状态。|
|overviewMapControlOptions|OverviewMapControlOptions|Overview Map 控件的显示选项。|
|panControl|boolean|Pan 控件的启用/禁用状态。|
|panControlOptions|PanControlOptions|Pan 控件的显示选项。|
|rotateControl|boolean|Rotate 控件的启用/禁用状态。|
|rotateControlOptions|RotateControlOptions|Rotate 控件的显示选项。|
|scaleControl|boolean|Scale 控件的默认启用/禁用状态。|
|scaleControlOptions|ScaleControlOptions|Scale 控件的默认显示选项。|
|scrollwheel|boolean|当设置为 False 时，禁用地图上的滚轮缩放。默认是 True。|
|streetView|StreetViewPanorama|当地图上的 Street View pegman 街景人形图标被投下时，要显示的 StreetViewPanorama。|
|streetViewControl|boolean|Street View Pegman 控件的默认启用/禁用状态。|
|streetViewControlOptions|StreetViewControlOptions|Street View Pegman 控件的默认显示选项|
|styles|Array.<MapStyleType>|要应用到每个默认地图类型的样式。在线配置地址：https://mapstyle.withgoogle.com/|
|heading|number|规定航拍图像的航向度数。|
|zoom|number|缩放等级，zoom: 0 显示了整个地球地图的完全缩放。|
|maxZoom|number|地图的最大缩放级别。|
|minZoom|number|地图的最小缩放级别。|
|tilt|number|从视口平面到地图平面的地图的入射角，以度为单位进行测量（0 和 45）。|

## Map() 的方法

|方法|返回值|描述|
|:-|:-|:-|
|fitBounds(LatLngBounds[, padding])|None|设置要包含给定边界的视口。padding值越小放大的比例越大，可以为负值|
|getBounds()|LatLng,LatLng|返回当前视口的西南纬度/经度和东北纬度/经度。|
|getCenter()|LatLng|返回地图的中心的纬度/经度。|
|getDiv()|Node|返回包含地图的 DOM 对象。|
|getHeading()|number|返回航拍图像的罗盘航向（支持 SATELLITE 和 HYBRID 地图类型）。|
|getMapTypeId()|HYBRID ROADMAP SATELLITE TERRAIN|返回当前地图类型。|
|getProjection()|Projection|返回当前 Projection（投影）。|
|getStreetView()|StreetViewPanorama|返回绑定到地图的默认的 StreetViewPanorama。|
|getTilt()|number|返回航拍图像的入射角度数（支持 SATELLITE 和 HYBRID 地图类型）。|
|getZoom()|number|返回地图的当前缩放级别。|
|panBy(xnumber,ynumber|	None|通过以像素计的给定距离改变地图的中心。|
|panTo(LatLng)|None|改变地图的中心为给定的 LatLng。自带过渡效果|
|panToBounds(LatLngBounds)|None	将地图平移所需的最小距离以包含给定的 LatLngBounds。|
|setCenter(LatLng)|None|直接定位到地图中心，无过渡效果|
|setHeading(number)|None|设置航拍图像的罗盘方向（以度为单位进行测量），基本方向为北方。|
|setMapTypeId(MapTypeId)|None|改变要显示的地图类型。|
|setOptions(MapOptions)	|None||
|setStreetView(StreetViewPanorama)|None	绑定一个 StreetViewPanorama 到地图上。|
|setTilt(number)|None|设置航拍图像的入射角度数（支持 SATELLITE 和 HYBRID 地图类型）。|
|setZoom(number)|None||

## LatLngBounds

api详见：https://developers.google.com/maps/documentation/javascript/reference/coordinates#LatLng

实例代码片段：根据当前所有所要标记的点计算出中心点及最适合的zoom

```
... ...
let latlngbounds = new google.maps.LatLngBounds();

markers.forEach((item) => {
    let LatLng = new google.maps.LatLng(...item.LatLng);
    latlngbounds.extend(LatLng);
});

map.setCenter(latlngbounds.getCenter());
map.fitBounds(latlngbounds, -2);
```

## Map() 的属性

|属性|类型|描述|
|:-|:-|:-|
|controls|Array.<MVCArray.<Node>>|要附加到地图上的额外控件。|
|mapTypes|MapTypeRegistry|按字符串 ID 划分的 MapType 实例的注册表。|
|overlayMapTypes|MVCArray.<MapType>|要叠加的额外地图类型。|

## Map() 的事件

|事件|参数|描述|
|:-|:-|:-|
|bounds_changed|None|当可视区域范围更改时会触发此事件。|
|center_changed|None|当地图 center（中心）属性更改时会触发此事件。|
|click|MouseEvent|当用户点击地图（但不是点击标记或信息窗口）时会触发此事件。|
|dblclick|MouseEvent|当用户双击地图时会触发此事件。请注意，触发此事件前还会触发点击事件。|
|drag|None|当用户拖动地图时会反复触发此事件。|
|dragend|None|当用户停止拖动地图时会触发此事件。|
|dragstart|None|当用户开始拖动地图时会触发此事件。|
|heading_changed|None|当地图 heading（方向）属性更改时会触发此事件。|
|idle|None|当地图在平移或缩放之后变为闲置状态时会触发此事件。|
|maptypeid_changed|None|当 mapTypeId 属性更改时会触发此事件。|
|mousemove|MouseEvent|只要用户的鼠标在地图容器上移动，就会触发此事件。|
|mouseout|MouseEvent|当用户的鼠标从地图容器上退出时会触发此事件。|
|mouseover|MouseEvent|当用户的鼠标进入地图容器时会触发此事件。|
|projection_changed|None|当投影更改时会触发此事件。|
|resize|None|当地图（div）更改尺寸时会触发此事件。|
|rightclick|MouseEvent|当用户右击地图时会触发此事件。|
|tilesloaded|None|当可见图块载入完成后会触发此事件。|
|tilt_changed|None|当地图 tilt（倾斜）属性更改时会触发此事件。|
|zoom_changed|None|当地图 zoom（缩放）属性更改时会触发此事件。|

# 叠加层

叠加层是地图上绑定到经度/纬度坐标的对象，会随您拖动或缩放地图而移动。
Google 地图 API 有如下几种叠加层：

* 地图上的点使用标记来显示，通常显示自定义图标。标记是 GMarker 类型的对象，并且可以利用 GIcon 类型的对象来自定义图标。
* 地图上的线使用折线（表示点的集合）来显示。线是类型为 GPolyline 的对象。
* 地图上的区域显示为多边形（如果是任意形状的区域）或底面叠加层（如果是矩形区域）。多边形类似于闭合的折线，因此可以是任何形状。地面叠加层通常用于地图上与图块有直接或间接关联的区域。
* 地图本身使用图块叠加层显示。如果您有自己的系列图块，可以使用 GTileLayerOverlay 类来改变地图上已有的图块，甚至可以使用 GMapType 来创建您自己的地图类型。
* 信息窗口也是一种特殊的叠加层。但是请注意，信息窗口会自动添加到地图中，并且地图只能添加一个类型为 GInfoWindow 的对象。

## 事件

|构造函数/对象|描述|
|:-|:-|
|MapsEventListener|It has no methods and no constructor. Its instances are returned from addListener(), addDomListener() and are eventually passed back to removeListener()|
|event|Adds/Removes/Trigger event listeners|
|MouseEvent|Returned from various mouse events on the map and overlays|

## 标记

> 详见：[Marker](https://developers.google.com/maps/documentation/javascript/reference/marker#Marker)

记标识地图上的点。默认情况下，它们使用 G_DEFAULT_ICON（您也可以指定自定义图标）。GMarker 构造函数将 GLatLng 和 GMarkerOptions（可选）对象作为参数。标记设计为可交互。例如，默认情况下它们接收 "click" 事件，常用于在事件侦听器中打开信息窗口。在定义marker时直接传入`map`实例或通过 setMap() 方法在地图上添加标记:

```
var marker = new google.maps.Marker({
    // map: map
    position: new google.maps.LatLng(52.395715,4.888916), // position: {lat: 59.327, lng: 18.067}
    draggable: true, // 是否可以拖拽
    animation: google.maps.Animation.BOUNCE, // 使用 animation 属性来拖动标记/
    label: 'A', // 当前点标签，是一个字符串
    icon: 'pinkball.png' // 标记可以用自定义的新图标来显示，以替代默认图标
});

marker.setMap(map);
// marker.setMap(null);
```

## 折线

GPolyline 对象可在地图上创建线性叠加层。GPolyline 包括一系列点，并创建一系列有序连接这些点的线段。折线支持以下属性：

```
let polyline = new google.maps.Polyline({
    path: [ // 指定了多个直线的纬度/经度坐标
        new google.maps.LatLng(58.983991,5.734863),
        new google.maps.LatLng(52.395715,4.888916),
        new google.maps.LatLng(53.508742,-0.120850)
    ],
    strokeColor: "#0000FF", // 指定直线的十六进制颜色值(格式: "#FFFFFF")
    strokeOpacity: 0.8, //  指定直线的透明度(该值为 0.0 到 1.0)
    strokeWeight: 2, // 定义线的宽度,以像素为单位。
    editable: false // 定义用户是否可编辑直线(true/false)
});

polyline.setMap(map);
```

## 多边形

GPolygon 对象类似于 GPolyline 对象，因为它们都包括一系列有序的点。但是，多边形不像折线一样有两个端点，而是设计为定义形成闭环的区域。和折线一样，您可以自定义多边形边（线）的颜色、粗细和透明度，以及封闭的填充区域的颜色和透明度。颜色应是十六进制数字 HTML 样式。

```
let polyline = new google.maps.Polygon({
    path: [ // 指定了多个直线的纬度/经度坐标
        new google.maps.LatLng(58.983991,5.734863),
        new google.maps.LatLng(52.395715,4.888916),
        new google.maps.LatLng(53.508742,-0.120850)
    ],
    strokeColor: "#0000FF", // 指定直线的十六进制颜色值(格式: "#FFFFFF")
    strokeOpacity: 0.8, //  指定直线的透明度(该值为 0.0 到 1.0)
    strokeWeight: 2, // 定义线的宽度,以像素为单位。
    editable: false, // 定义用户是否可编辑直线(true/false)
    fillColor: "#0000FF", // 指定闭合区域的十六进制颜色值 (格式: "#FFFFFF")
    fillOpacity: 0.4 // 指定填充颜色的透明度 (该值为 0.0 到 1.0)
});

polyline.setMap(map);
```

##  圆

```
new google.maps.Circle({
  center: new google.maps.LatLng(52.395715,4.888916), // 指定圆的中心点参数
  radius: 20000, // 指定圆的半径，以米为单位
  strokeColor: "#0000FF", // 指定弧线的十六进制颜色值(格式: "#FFFFFF")
  strokeOpacity: 0.8, // 指定弧线的透明度(该值为 0.0 到 1.0)
  strokeWeight: 2, // 定义线的宽度,以像素为单位。
  fillColor: "#0000FF", // 指定圆的十六进制颜色值填充值 (格式: "#FFFFFF")
  fillOpacity: 0.4 // 指定填充颜色的透明度 (该值为 0.0 到 1.0)
  editable: false, // 定义用户是否可编辑(true/false)
})
```

## 信息窗口

```
var marker = new google.maps.Marker({
    position: new google.maps.LatLng(52.395715,4.888916),
    animation: google.maps.Animation.BOUNCE, // 使用 animation 属性来拖动标记
    icon: 'pinkball.png' // 标记可以用自定义的新图标来显示，以替代默认图标
});

marker.setMap(map);

var infowindow = new google.maps.InfoWindow({
   maxWidth: 600,
  content:"Hello World!"
});

infowindow.open(map,marker);
```

## 自定义popup

官方示例： [overlay-popup](https://developers.google.cn/maps/documentation/javascript/examples/overlay-popup)

代码片段：

```pug
.page-wrap
    .map-container(ref="mapContainer")
    div(ref="popup")
        p hello-world
```

```sass
.page-wrap
    width: 100%
    height: 100%
    position: relative
.map-container
    width: 100%
    height: 100%
// popup
.popup-container
    cursor: auto
    position: absolute
    height: 0
    width: 280px
.popup-bubble-anchor
    position: absolute
    bottom: 8px
    left: 0
    right: 0
    &::after, &::before
        content: ""
        position: absolute
        top: 0
        left: 0
        transform: translate(-50%, 0)
        width: 0
        height: 0
        border-left: 6px solid transparent
        border-right: 6px solid transparent
        border-top: 8px solid #019B91
    &::before
        top: -3px
        border-top: 8px solid rgba(23,74,85,0.999)
        z-index: 1
.popup-bubble
    position: absolute
    top: 0
    left: 0
    width: 280px
    transform: translate(-50%, -100%)
    padding: 5px
    border-radius: 5px
    font-family: sans-serif
    overflow-y: auto
    background: rgba(23,74,85,0.80)
    border: 2px solid #019B91
    box-shadow: 0 2px 10px 1px rgba(0,0,0,0.5)
```

```js
// add Custom Popups
init () {
    ... ...
    const Popup = this.createPoputClasss();
    let popup = new Popup(new google.maps.LatLng(...CENTER), this.$refs['popup']);
    popup.setMap(map);
},
createPoputClasss () {
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
                Math.abs(divPosition.x) < 4000 && Math.abs(divPosition.y) < 4000 ?
                    'block' :
                    'none';

            if (display === 'block') {
                this.containerDiv.style.left = divPosition.x + 'px';
                this.containerDiv.style.top = divPosition.y + 'px';
            }
            if (this.containerDiv.style.display !== display) {
                this.containerDiv.style.display = display;
            }
        }
    }
    return Popup;
}
```

## 实例

[自定义RippleMarker及弹层](./example-rippleMarker.md ':include')

# 地图事件

## 点击标记缩放地图

```
// 使用 addListener() 事件处理程序来注册事件的监听。该方法使用一个对象，一个事件来监听，当指定的事件发生时 函数将被调用。
google.maps.event.addListener(marker,'click',function() {
  map.setZoom(9); // // Zoom to 9 when clicking on marker
  map.setCenter(marker.getPosition());
});
```

## 平滑放大地图

```
/**
* params {map:map实例, max: 最大值也是目标值, cnt： 当前值}
*/
smoothZoom (map, max, cnt) {
    if (cnt >= max) {
        return;
    } else {
        let z = google.maps.event.addListener(map, 'zoom_changed', () => {
            google.maps.event.removeListener(z);
            this.smoothZoom(map, max, cnt + 1);
        });
        let timer = setTimeout(function(){
            map.setZoom(cnt);
            clearTimeout(timer);
        }, 80);
    }
}
```

## 重置标记

```
// 通过给地图添加事件处理程序来改变 'center' 属性，以下代码使用 center_changed 事件在3秒后标记移会中心点
google.maps.event.addListener(map,'center_changed',function() {
  window.setTimeout(function() {
    map.panTo(marker.getPosition());
  },3000);
});
```

## 点击标记时打开信息窗口

```
var infowindow = new google.maps.InfoWindow({
  content:"Hello World!"
});

google.maps.event.addListener(marker, 'click', function() {
  infowindow.open(map,marker);
});
```

## 设置标记及打开每个标记的信息窗口

当用户点击地图时执行一个窗口用户点击地图某个位置时使用 placeMarker() 函数在指定位置上放置一个标记，并弹出信息窗口：

```
google.maps.event.addListener(map, 'click', function(event) {
  placeMarker(event.latLng);
});

function placeMarker(location) {
  var marker = new google.maps.Marker({
    position: location,
    map: map,
  });
  var infowindow = new google.maps.InfoWindow({
    content: 'Latitude: ' + location.lat() +
    '<br>Longitude: ' + location.lng()
  });
  infowindow.open(map,marker);
}
```

# 地图控件集

|控件|描述|
|:-|:-|
|panControl|默认开启，地图上显示的是一个平底碗样的控件，点击4个角平移地图|
|zoomControl|默认开启，显示一个滑动条来控制map的Zoom级别|
|mapTypeControl|默认开启，允许用户在map types(roadmap 和 satallite)之间切换|
|streetViewControl|默认开启，显示为一个街景小人图标，可拖拽到地图上某个点来打开街景|
|fullscreenControl |默认开启，全屏|
|scaleControl|显示地图比例尺|
|overviewMapControl|从一个广域的视角俯视地图|
|rotateControl|显示一个小的圆周图标，可以转动地图|

```
new google.maps.Map(document.getElementById("googleMap"), {
    center: new google.maps.LatLng(51.508742, -0.120850),
    zoom: 5,
    mapTypeId: google.maps.MapTypeId.ROADMAP,
    // disableDefaultUI: true, // 关闭默认控件集
    rotateControl: true, // 开启对应控件
    zoomControl:true, // 如果需要修改一个控件，首先开启控件(设置其为true)。
    zoomControlOptions: { // 修改控件
        style: google.maps.ZoomControlStyle.SMALL // SMALL-最小化控件、LARGE-标准滑动控件、DEFAULT-基于设备和地图大小，选择最合适的控件
    },
    mapTypeControl:true,
    mapTypeControlOptions: {
        // DROPDOWN_MENU，用于显示单个按钮控件，以便从下拉菜单中选择地图类型
        // HORIZONTAL_BAR，用于在水平栏中将一组控件显示为如 Google Maps 中所示按钮。
        // DEFAULT，用于显示"默认"的行为，该行为取决于屏幕尺寸，并且可能会在 API 以后的版本中有所变化。
        style: google.maps.MapTypeControlStyle.DROPDOWN_MENU
        // 同样可以使用ControlPosition属性指定控件的位置:
        position:google.maps.ControlPosition.TOP_CENTER
    }
});
```

# 自定义控件集

```
<html>
<head>
<script src="//maps.googleapis.com/maps/api/js?key=AIzaSyDJW4jsPlNKgv6jFm3B5Edp5ywgdqLWdmc&sensor=false">
</script>

<script>
var map;
var london = new google.maps.LatLng(51.508742,-0.120850);

// Add a Home control that returns the user to London
function HomeControl(controlDiv, map) {
  controlDiv.style.padding = '5px';
  var controlUI = document.createElement('div');
  controlUI.style.backgroundColor = 'yellow';
  controlUI.style.border='1px solid red';
  controlUI.style.cursor = 'pointer';
  controlUI.style.textAlign = 'center';
  controlUI.title = 'Set map to London';
  controlDiv.appendChild(controlUI);
  var controlText = document.createElement('div');
  controlText.style.fontFamily='Arial,sans-serif';
  controlText.style.fontSize='12px';
  controlText.style.paddingLeft = '4px';
  controlText.style.paddingRight = '4px';
  controlText.innerHTML = '<b>Home<b>'
  controlUI.appendChild(controlText);

  // Setup click-event listener: simply set the map to London
  google.maps.event.addDomListener(controlUI, 'click', function() {
    map.setCenter(london)
  });
}

function initialize() {
  var mapDiv = document.getElementById('googleMap');
  var myOptions = {
    zoom: 12,
    center: london,
    mapTypeId: google.maps.MapTypeId.ROADMAP
  }
  map = new google.maps.Map(mapDiv, myOptions);
  // Create a DIV to hold the control and call HomeControl()
  var homeControlDiv = document.createElement('div');
  var homeControl = new HomeControl(homeControlDiv, map);
//  homeControlDiv.index = 1;
  map.controls[google.maps.ControlPosition.TOP_RIGHT].push(homeControlDiv);
}

google.maps.event.addDomListener(window, 'load', initialize);
</script>
</head>

<body>
    <div id="googleMap" style="width:500px;height:380px;"></div>
</body>
</html>
```

# 去掉log信息

```
a[title^=Open]
    display: none !important
.gmnoprint
    display: none !important
```

# 坐标转换

## 像素坐标转为地图坐标

```
fromPointToLatLng ({ x, y }) {
    let { map } = this;
    let ne = map.getBounds().getNorthEast();
    let sw = map.getBounds().getSouthWest();
    let projection = map.getProjection();
    let topRight = projection.fromLatLngToPoint(ne);
    let bottomLeft = projection.fromLatLngToPoint(sw);
    let scale = 1 << map.getZoom();
    return projection.fromPointToLatLng(new google.maps.Point(x / scale + bottomLeft.x, y / scale + topRight.y));
}
```

## 地图坐标转为像素坐标

```
function LatLng2Pixel(latLng) {
    let { map } = this;
    let scale = Math.pow(2, map.getZoom());
    let projection = map.getProjection();
    let bounds = map.getBounds();
    let nw = projection.fromLatLngToPoint(new google.maps.LatLng(bounds.getNorthEast().lat(), bounds.getSouthWest().lng()));
    let point = projection.fromLatLngToPoint(latLng);
    return new google.maps.Point(Math.floor((point.x - nw.x) * scale), Math.floor((point.y - nw.y) * scale));
}
```

## 计算两点距离

加载api时增加geometry库`libraries=geometry`
```html
<script type="text/javascript" src="http://maps.googleapis.com/maps/api/js?sensor=false&libraries=geometry"></script>
```
计算距离复制代码 代码如下:
```js
// 说明：单位是米
var meters=google.maps.geometry.spherical.computeDistanceBetween(latLngA, latLngB);
document.getElementById("distance").innerText = meters+"米";
```
