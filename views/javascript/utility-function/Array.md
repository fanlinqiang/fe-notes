## Array
### 数组元素交换位置
```js
/**
* 数组元素交换位置
* @param {array} arr 数组
* @param {number} index1 添加项目的位置
* @param {number} index2 删除项目的位置
* index1和index2分别是两个数组的索引值，即是两个要交换元素位置的索引值，如1，5就是数组中下标为1和5的两个元素交换位置
*/
function swapItem (arr, index1, index2) {
    arr[index1] = arr.splice(index2, 1, arr[index1])[0];
    return arr;
}
```
### 数组极值
```js
function minimum(arr) {   //  最小值 ，Math.max(...arr)                       
  return Math.min.apply(Math, arr);             
}                                                 
function maximum(arr) {  // 最大值， Math.min(...arr)                          
  return Math.max.apply(Math, arr);             
}  

```
