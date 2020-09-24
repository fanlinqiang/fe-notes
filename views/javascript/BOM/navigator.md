## navigator对象

|属性|	描述|
|:-|:-|
|userAgent|	返回由客户机发送服务器的 user-agent 头部的值。|
|appCodeName|	返回浏览器的代码名。浏览器的名称。通常都是Mozilla，即 使在非Mozilla浏览器中也是如此|
|appMinorVersion|	返回浏览器的次级版本。|
|appName|	返回浏览器的名称。|
|appVersion|	返回浏览器的平台和版本信息。浏览器的版本。一般不与实际的浏览器版本对应|
|cookieEnabled|	返回指明浏览器中是否启用 cookie 的布尔值。|
|cpuClass|	返回浏览器系统的 CPU 等级。客户端计算机中使用的CPU类型(x86、 68K、Alpha、PPC或Other)|
|language|浏览器的主语言|
|mimeTypes|在浏览器中注册的MIME类型数组|
|onLine|表示浏览器是否连接到了因特网|
|platform|浏览器所在的系统平台, 如：mac中"MacIntel"|
|plugins|浏览器中安装的插件信息的数组|
|product|产品名称(如 Gecko)|
|productSub|关于产品的次要信息(如Gecko的版本)|
|onLine|	返回指明系统是否处于脱机模式的布尔值。|
|platform|	返回运行浏览器的操作系统平台。|
|systemLanguage|	返回 OS 使用的默认语言。|
|userLanguage|	返回 OS 的自然语言设置。|
|javaEnabled()|表示当前浏览器中是否启用了Java|

### 检测插件
检测浏览器中是否安装了特定的插件是一种最常见的检测例程。对于非 IE 浏览器，可以使用 plugins 数组来达到这个目的。该数组中的每一项都包含下列属性。
1. name:插件的名字。
2. description:插件的描述。
3. filename:插件的文件名。
4. length:插件所处理的 MIME 类型数量。

```js
function hasPlugin(name){
    name = name.toLowerCase();
    for (var i=0; i < navigator.plugins.length; i++){
if (navigator. plugins [i].name.toLowerCase().indexOf(name) > -1){ return true;
  } }
    return false;
}
```

检测 IE 中的插件比较麻烦，因为 IE 不支持 Netscape 式的插件。在 IE 中检测插件的唯一方式就是 使用专有的 ActiveXObject 类型，并尝试创建一个特定插件的实例。IE 是以 COM 对象的方式实现插 件的，而 COM 对象使用唯一标识符来标识。因此，要想检查特定的插件，就必须知道其 COM 标识符。 例如，Flash 的标识符是 ShockwaveFlash.ShockwaveFlash。知道唯一标识符之后，就可以编写类似 下面的函数来检测 IE 中是否安装相应插件了
```js
//检测 IE 中的插件
function hasIEPlugin(name){
    try {
        new ActiveXObject(name);
        return true;
    } catch (ex){
        return false;
    } 
}
//检测 Flash 
alert(hasIEPlugin("ShockwaveFlash.ShockwaveFlash"));
```

### Geolocation API

通过这套 API，JavaScript 代码能够访问到用户的当前位置信息。当然，访问之前必须得到用户的明确许可，即同意在页面中共享 其位置信息。如果页面尝试访问地理定位信息，浏览器就会显示一个对话框，请求用户许可共享其位置信息。

|方法|描述|
|:-|:-|
|getCurrentPosition|获取用户共享地理定位信息|
|watchPosition|用于注册监听器，在设备的地理位置发生改变的时候自动被调用。|
|clearWatch(id)|这个方法主要用于移除使用 Geolocation.watchPosition() 注册的 位置/错误 监听器。|

####  getCurrentPosition()

调用这个方法就会触发请求用户共享地理定位信息的对话框。这个方法接收 3 个参数:成功回调函数、可选的失败回调函数和可选的选项对象。 其中，成功回调函数会接收到一个 Position 对象参数，该对象有两个属性:coords 和 timestamp。而 coords 对象中将包含下列与位置相关的信息。

|属性|描述|
|:-|:-|
|latitude|以十进制度数表示的纬度。|
|longitude|以十进制度数表示的经度。|
|accuracy|经、纬度坐标的精度，以米为单位。|
|altitude|以米为单位的海拔高度，如果没有相关数据则值为 null。|
|altitudeAccuracy|海拔高度的精度，以米为单位，数值越大越不精确。|
|heading|指南针的方向，0°表示正北，值为 NaN 表示没有检测到数据。|
|speed|速度，即每秒移动多少米，如果没有相关数据则值为 null。|


```
navigator.geolocation.getCurrentPosition(function (position) { 
    drawMapCenteredAt(position.coords.latitude, positions.coords.longitude);
}, function (error) { 
    // 失败回调函数，接收到一个参数。这个参数是一个对象，包含两个属性:message 和 code。
    // 其中，message 属性中保存着给人看的文本消息，解释为什么会出错，而 code 属性中保存着一个数值，
    // 表示错误的类 型:用户拒绝共享(1)、位置无效(2)或者超时(3)。
    console.log("Error code: " + error.code); console.log("Error message: " + error.message);
}, {
    // 选项对象，用于设定信息的类型。可以设置的选项 有三个:
    enableHighAccuracy: true, // 一个布尔值，表示必须尽可能使用最准确的位置信息;
    timeout: 5000, // 以毫秒数表示的等待位置信息的最长时间;
    maximumAge: 25000 // 表示上一次取得的坐标信息的有效时间，以毫 秒表示，如果时间到则重新取得新坐标信息。
    // 除非确实需要非常精确的信 息，否则建议保持 enableHighAccuracy 的 false 值(默认值)。将这个选项设置为 true 需要更长 的时候，而且在移动设备上还会导致消耗更多电量。类似地，如果不需要频繁更新用户的位置信息，那 么可以将 maximumAge设置为 Infinity，从而始终都使用上一次的坐标信息。
});
```

如果你希望跟踪用户的位置，那么可以使用另一个方法 watchPosition()。这个方法接收的参数 与 getCurrentPosition()方 法 完 全 相 同 。 实 际 上 ，watchPosition()与 定 时 调 用 getCurrentPosition()的效果相同。在第一次调用 watchPosition()方法后，会取得当前位置，执 行成功回调或者错误回调。然后，watchPosition()就地等待系统发出位置已改变的信号(它不会自 己轮询位置)。
调用 watchPosition()会返回一个数值标识符，用于跟踪监控的操作。基于这个返回值可以取消 监控操作，只要将其传递给 clearWatch()方法即可(与使用 setTimeout()和 clearTimeout()类 似)。例如:

```
var watchId = navigator.geolocation.watchPosition(function (position) { 
    drawMapCenteredAt(position.coords.latitude, positions.coords.longitude); 
}, function(error){
    console.log("Error code: " + error.code); console.log("Error message: " + error.message);
});

clearWatch(watchId);
```
