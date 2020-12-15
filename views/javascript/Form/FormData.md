## FormData

> 参考: [FormData-mdn](https://developer.mozilla.org/zh-CN/docs/Web/API/FormData)

FormData 接口提供了一种表示表单数据的键值对 key/value 的构造方式，并且可以轻松的将数据通过XMLHttpRequest.send() 方法发送出去，本接口和此方法都相当简单直接。如果送出时的编码类型被设为 "multipart/form-data"，它会使用和表单一样的格式。

### 构造函数

1. 创建一个实例

```js
let form = new FormData();
```

2. 使用已有的表单来初始化

```html
<form id="myForm" action="" method="post">
    <input type="text" name="name" value="test">名字
    <input type="password" name="pwd" value="123">密码
    <input type="submit" value="提交">
</form>
```

```js
let form = new FormData(document.getElementById(myForm))
form.forEach(console.log)
/*
* test name FormData
* 123 pwd FormData
*/
```

### 方法

```js
console.log(Object.getOwnPropertyNames(Object.getPrototypeOf(new FormData())));
// ["append", "delete", "get", "getAll", "has", "set", "entries", "forEach", "keys", "values", "constructor"]
```

#### `FormData.append(name, value[, filename])`

append() 方法 会添加一个新值到 FormData 对象内的一个已存在的键中，如果键不存在则会添加该键。FormData.set 和 append() 的区别在于，如果指定的键已经存在， FormData.set 会使用新值覆盖已有的值，而 append() 会把新值添加到已有值集合的后面，即会存在两个键值相同的记录。

##### 语法

```js
FormData.append(name, value[, filename])

// name: value中包含的数据对应的表单名称。
// value: 表单的值。可以是USVString 或 Blob (包括子类型，如 File)。
// filename 可选,传给服务器的文件名称 (一个 USVString), 当一个 Blob 或 File 被作为第二个参数的时候， Blob 对象的默认文件名是 "blob"。 File 对象的默认文件名是该文件的名称。
```

!> 注意： 如果你指定一个 Blob 作为数据添加到 FormData 对象中， 文件名会被放在 "Content-Disposition" 头部（常常会根据浏览器变化而变化）传给服务器。

```
formData.append('username', 'Chris');
formData.append('userpic', myFileInput.files[0], 'chris.jpg');
```

#### `FormData.delete(name)`

从 FormData 对象中删除指定键，即 key，和它对应的值，即 value。

#### `FormData.set(name, value[, filename])`

set() 方法会对 FormData 对象里的某个 key 设置一个新的值，如果该 key 不存在，则添加。

```
var formData = new FormData(); // Currently empty
formData.set('username', 'Chris');
formData.set('userpic', myFileInput.files[0], 'chris.jpg');
```

#### `FormData.get(name)与FormData.getAll(name)`

get()方法用于返回FormData对象中和指定的键关联的第一个值，如果你想要返回和指定键关联的全部值，那么可以使用getAll()方法。

```
var formData = new FormData();
formData.append('username', 'Chris');
formData.append('username', 'Bob');

formData.get('username'); // "Chris"
formData.getAll('username'); // ["Chris", "Bob"]

```

#### `FormData.has(name)`

has()方法会返回一个布尔值，表示该FormData对象是否含有某个key 。

#### `FormData.entries()`

返回一个包含所有键值对的iterator对象。。其中键值对的key是一个 USVString 对象；value是一个 USVString , 或者 Blob对象。

```js
// Create a test FormData object
var formData = new FormData();
formData.append('key1', 'value1');
formData.append('key2', 'value2');

// Display the key/value pairs
for(var pair of formData.entries()) {
   console.log(pair[0]+ ', '+ pair[1]);
}
// key1, value1
// key2, value2
```

#### `FormData.keys()`

返回一个包含所有键的iterator对象。

```js
// 先创建一个 FormData 对象
var formData = new FormData();
formData.append('key1', 'value1');
formData.append('key2', 'value2');

// 输出所有的 key
for (var key of formData.keys()) {
   console.log(key);
}
// key1
// key2
```

#### `FormData.values()`

返回一个包含所有值的iterator对象。


#### `FormData.forEach(value, name, this)`

遍历键值对
