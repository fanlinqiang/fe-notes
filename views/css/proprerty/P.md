## P
### [pointer-events](https://developer.mozilla.org/zh-CN/docs/Web/CSS/pointer-events)
 CSS 属性指定在什么情况下 (如果有) 某个特定的图形元素可以成为鼠标事件的 target。除了指示该元素不是鼠标事件的目标之外，值none表示鼠标事件“穿透”该元素并且指定该元素“下面”的任何东西。

```
/* Keyword values */
pointer-events: auto;
pointer-events: none;
pointer-events: visiblePainted; /* SVG only */
pointer-events: visibleFill;    /* SVG only */
pointer-events: visibleStroke;  /* SVG only */
pointer-events: visible;        /* SVG only */
pointer-events: painted;        /* SVG only */
pointer-events: fill;           /* SVG only */
pointer-events: stroke;         /* SVG only */
pointer-events: all;            /* SVG only */

/* Global values */
pointer-events: inherit;
pointer-events: initial;
pointer-events: unset;
```
