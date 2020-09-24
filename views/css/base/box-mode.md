## 盒模型

### W3C标准盒模型

![W3C标准盒模型](./images/standard-box.webp)

> 标准盒模型盒子的内容区域不包含盒子的padding、border

### IE盒模型

![IE模型](./images/ie-box.webp)

> IE模型盒子的内容区域包含盒子的padding、border

在实际运用中IE盒模型更符合开发需求，因此我们通常会重置全局样式：
```sass
*
    box-sizing: border-box
```
