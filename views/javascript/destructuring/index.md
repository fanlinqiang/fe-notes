# 解构赋值


## 函数的解构赋值

### 验证方法参数

```
const isRequired = () => {
  throw new Error('param is required')
}

const print = (num = isRequired()) => {
  console.log(`printing ${num}`)
}

print(2) //printing 2
print() // error
print(null) //printing null

```
