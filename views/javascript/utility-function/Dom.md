## Dom
### getStyle
```js
function getStyle (dom, styleName) {
    if (!dom || !styleName) return null;
        styleName = camelize(styleName);
        if (styleName === 'float') {
            styleName = 'cssFloat';
        }
    /**
    * let style = window.getComputedStyle(dom, null);
    * 它等价于
    * let style = document.defaultView.getComputedStyle(dom, null);
    */
    return dom.currentStyle ? dom.currentStyle[styleName] : getComputedStyle(dom, null)[styleName]; // 火狐
}
```
### getWidth
```js
function getWidth (dom) {
    let stl = root.currentStyle || document.defaultView.getComputedStyle(dom);
    return ((dom.clientWidth || parseInt(stl.width, 10)) - parseInt(stl.paddingLeft, 10) - parseInt(stl.paddingRight, 10)).toFixed(0) - 0;
}
```
### modifyCSS
```js
function modifyCSS (dom, css) {
  if (dom) {
    for (var key in css) {
      if (css.hasOwnProperty(key)) {
        dom.style[key] = css[key];
      }
    }
  }
  return dom;
}
```
### hasClass
```js
function hasClass (el, cls) {
    if (!el || !cls) {return false;}
    if (cls.indexOf(' ') !== -1) {throw new Error('className should not contain space.');}
    if (el.classList) {
        return el.classList.contains(cls);
    } else {
        return (' ' + el.className + ' ').indexOf(' ' + cls + ' ') > -1;
    }
}
```
### removeClass
```js
function removeClass (el, cls) {
    if (!el || !cls) {return;}
    const classes = cls.split(' ');
    let curClass = ' ' + el.className + ' ';

    for (let i = 0, j = classes.length; i < j; i++) {
        const clsName = classes[i];
        if (!clsName) {continue;}

        if (el.classList) {
            el.classList.remove(clsName);
        } else {
            if (hasClass(el, clsName)) {
                curClass = curClass.replace(' ' + clsName + ' ', ' ');
            }
        }
    }
    if (!el.classList) {
        el.className = trim(curClass);
    }
}
```
### addClass
```js
/**
 * Created by linqiang on 2019/6/5.
 */
function addClass (el, cls) {
    if (!el) {return;}
    let curClass = el.className;
    const classes = (cls || '').split(' ');
    for (let i = 0, j = classes.length; i < j; i++) {
        const clsName = classes[i];
        if (!clsName) {continue;}
        if (el.classList) {
            el.classList.add(clsName);
        } else {
            if (!hasClass(el, clsName)) {
                curClass += ' ' + clsName;
            }
        }
    }
    if (!el.classList) {
        el.className = curClass;
    }
}
```
### setOpacity
设置透明度
```js
function setOpacity (elem, value) {
    elem.filters ? elem.style.filter = 'alpha(opacity=' + value + ')' : elem.style.opacity = value / 100;
}
```
### getScrollTop
获得当前视口距离页面顶部的像素
```js
function getScrollTop () {
    return document.documentElement.scrollTop || window.pageYOffset || document.body.scrollTop
}
```
### getScrollLeft
获得当前视口距离页面左边的像素
```js
function getScrollLeft () {
    return document.documentElement.scrollLeft || window.pageXOffset || document.body.scrollLeft
}
```
### addEventListener
```js
/**
 * 添加事件监听器
 * @param  {Object} target DOM对象
 * @param  {String} eventType 事件名
 * @param  {Funtion} callback 回调函数
 * @return {Object} 返回对象
 */
function addEventListener (target, eventType, callback) {
  if (target) {
    if (target.addEventListener) {
      target.addEventListener(eventType, callback, false);
      return {
        remove: function remove() {
          target.removeEventListener(eventType, callback, false);
        }
      };
    } else if (target.attachEvent) {
      target.attachEvent('on' + eventType, callback);
      return {
        remove: function remove() {
          target.detachEvent('on' + eventType, callback);
        }
      };
    }
  }
}
```
### getKeyCode
```js
document.onkeypress = function(e){
    e = e || window.event;
    console.log(e.keyCode || e.which);  // 常规浏览器 || IE
}
```
### stopProp
阻止事件冒泡
```js
function stopProp (event) {
    event = event || window.event;
    event.stopPropagation ? event.stopPropagation() : event.cancelBubble = true;  // 常规浏览器 || IE
};
```
### preDef
阻止浏览器默认行为，如：按标签链接跳转
```js
function preDef (event) {
    event = event || window.event
    event.preventDefault ? event.preventDefault() : event.returnValue = false // 常规浏览器 | IE
}
```
