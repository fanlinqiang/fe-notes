## 下载json数据为json文件

```js
import downloadjs from 'downloadjs';

let content = JSON.stringify({test: 1}, null, 2);
downloadjs(new Blob([content], {type: "application/json;charset=utf-8"}), +new Date(), 'application/json;charset=utf-8');
```

