### theme

```js
{
    "editor.tokenColorCustomizations": {
        "functions": "#55f52e",//函数
        "keywords": "#40fcdd",//关键字
        "types": "#f8d92c",//类型定义
        "variables": "#ffa53d",//变量
        "numbers": "#fffb08",//数字
        "comments": "#6ba78b",//注释
    },

    "backgroung.enable":true,
    "background.useDefault":false,
    "background.customImages":[
        "file:///D:/kaierxi.png"  //更改路径可以替换背景图
    ],
    "background.style":{ //调整背景图的相关设置
        "content":"''",
        "pointer-events":"none",
        "position":"absolute",
        "top":"0",
        "left":"0",
        "width":"100%",
        "height":"100%",
        "z-index":"99999",
        "background.repeat":"no-repeat",
        "background-size":"contain",
        "opacity":0.3
    }
    "workbench.colorCustomizations": {
        // 以下代码复制到 settings.json 中，鼠标移到代码上会显示对应的修改对象名称，无法理解就多多尝试吧
        "editor.background": "#242929",
        "editorGutter.background": "#20201c",

        "titleBar.activeBackground": "#21272e",
        "titleBar.activeForeground": "#df5141",
        "menu.background": "#0e1f20",
        "menu.foreground": "#e4d760",

        "activityBar.background": "#e74c3c",
        "activityBar.foreground": "#21272e",
        "sideBar.background": "#172724",
        "sideBar.foreground": "#c1c422",
        "sideBarSectionHeader.background": "#155e63",

        "tab.activeBackground": "#d8675a",
        "tab.inactiveBackground": "#0e3a2c",
        "tab.activeForeground": "#ebe70d",
        "tab.inactiveForeground": "#21d1b4",

        "editor.selectionBackground": "#6e4015",
        "editor.selectionHighlightBackground": "#522d5e",
        "editor.findMatchBackground": "#78b8c0",
        "editor.findMatchHighlightBackground": "#00ffbf",
        "statusBar.background": "#55511e",


    },
    //以下三行表示本主题所使用的文件图标主题为  material-icon-theme
    //本主题基于 Monokai Dark Soda 主题修改而成
    "workbench.iconTheme": "material-icon-theme",
    "workbench.colorTheme": "Monokai Dark Soda",
    "window.zoomLevel": 0
}
```