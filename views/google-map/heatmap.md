# 热力图

> [heatmaplayer](https://developers.google.com/maps/documentation/javascript/heatmaplayer)
> [layer-heatmap](https://developers.google.com/maps/documentation/javascript/examples/layer-heatmap)

## 新建热力图

```
/* Data points defined as an array of LatLng objects */
var heatmapData = [
  new google.maps.LatLng(37.782, -122.447),
  new google.maps.LatLng(37.782, -122.445),
  new google.maps.LatLng(37.782, -122.443),
  new google.maps.LatLng(37.782, -122.441),
  new google.maps.LatLng(37.782, -122.439),
  new google.maps.LatLng(37.782, -122.437),
  new google.maps.LatLng(37.782, -122.435),
  new google.maps.LatLng(37.785, -122.447),
  new google.maps.LatLng(37.785, -122.445),
  new google.maps.LatLng(37.785, -122.443),
  new google.maps.LatLng(37.785, -122.441),
  new google.maps.LatLng(37.785, -122.439),
  new google.maps.LatLng(37.785, -122.437),
  new google.maps.LatLng(37.785, -122.435)
];

var sanFrancisco = new google.maps.LatLng(37.774546, -122.433523);

map = new google.maps.Map(document.getElementById('map'), {
  center: sanFrancisco,
  zoom: 13,
  mapTypeId: 'satellite'
});

var heatmap = new google.maps.visualization.HeatmapLayer({
  data: heatmapData
});
heatmap.setMap(map);
```

## 语法

> [Heatmaps](https://developers.google.com/maps/documentation/javascript/reference/visualization)

### 构造器

```
google.maps.visualization.HeatmapLayer[opts]
```

新建并返回一个HeatmapLayer实例

#### 配置项

```
google.maps.visualization.HeatmapLayerOptions
```

|配置项|描述|
|:-|:-|
|data|要显示的数据点，格式为：`MVCArray<LatLng|WeightedLocation>|Array<LatLng|WeightedLocation>`|
|dissipating|boolean类型，指定缩放时热图是否消散。默认情况下，数据点的影响半径仅由“半径”选项指定。禁用消散时，“半径”选项将解析为缩放级别为0时的半径|
|map|所挂载的map实例|
|maxIntensity|数值类型，热图的最大强度。默认情况下，热图颜色会根据地图上任何特定像素点的最大集中度进行动态缩放。此属性允许您指定固定的最大值。|
|opacity|数值类型，热图的透明度，用0到1之间的数字表示。默认为0.6。|
|radius|数值类型，每个数据点的影响半径，以像素为单位。|

#### 加权位置点对象

```
google.maps.visualization.WeightedLocation
```

|属性|描述|
|:-|:-|
|location|`LatLng`类型，数据点的位置。|
|weight|数值类型，数据点的加权值。|

例:
```
{location: new google.maps.LatLng(37.782, -122.447), weight: 0.5}
```

#### 方法

|方法名|描述|
|:-|:-|
|getData|返回数据集。|
|getMap|返回所挂载的map实例|
|getGradient|返回渐变值|
|setData|设置数据集|
|setMap|挂载map|
|setOptions|设置配置项|
