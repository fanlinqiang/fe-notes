# 正则表达式

### 断言

|字符	|含义|
|:-|:-|
|`x(?=y)`|仅匹配被y跟随的x。举个例子，/Jack(?=Sprat)/，如果"Jack"后面跟着sprat，则匹配之。/Jack(?=Sprat|Frost)/ ，如果"Jack"后面跟着"Sprat"或者"Frost"，则匹配之。但是，"Sprat" 和"Frost" 都不会在匹配结果中出现。|
|`x(?!y)`|仅匹配不被y跟随的x。举个例子，/\d+(?!\.)/ 只会匹配不被点（.）跟随的数字。/\d+(?!\.)/.exec('3.141') 匹配"141"，而不是"3.141"|
|`(?<=y)x`|x只有在y后面才匹配。/(?<=\$)\d+/.exec('Benjamin Franklin is on the $100 bill')  // ["100"](?<!y)x	x只有不在y后面才匹配。/(?<!\$)\d+/.exec('it’s is worth about €90') // ["90"]|

#### 必须有数字和字母组合的密码正则表达式

```
^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{8,16}$
```


#### 同时匹配两个字符串

```
/.*ili.*number.*|.*number.*ili.*/.test('ilinumber')

/(?=.*ili)(?=.*number)^.*$/.test('numberili')
/(?=.*ili)(?=.*number)/.test('numberili')
```

#### 不匹配一段字符串

```
# https://blog.csdn.net/xiiii/article/details/89450341
^((?!simple).)*$
```
