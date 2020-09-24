## Date

### format

```js
// 
function (date) {
    let option2 = {minute: 'numeric', hour: 'numeric', year: "numeric", month: "long", day: "numeric", hour12: true};
    let [month, day, year, time, ap] = (new Date(date)).toLocaleString('en-US', option2).replace(/,/g, '').split(' ');
    return `${time} ${ap} on ${month} ${day}, ${year}`;
  
}
```
