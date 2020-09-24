## 下载二进制流文件

代码片段, 已下载excel为例
```js
import downloadjs from 'downloadjs';
import _ from 'lodash';
... ...
http.post(`/download/excel`, {}, {
    responseType: 'arraybuffer' // 让服务器以二进制流的方式返回
}).then((resp) => {
    if (_.get(resp, 'data.byteLength')) {
        // downloadjs(_.get(resp, 'data'), `${col.title}-${new Date().getTime()}`, 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
        downloadjs(_.get(resp, 'data'), `数据详情-${new Date().getTime()}.xls`, 'application/vnd.ms-excel');
    } else {
        
    }
}, () => {
    
}).finally(() => {
    
});
```
