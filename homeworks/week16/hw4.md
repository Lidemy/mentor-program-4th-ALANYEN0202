Q4:  請你說明以下程式碼會輸出什麼，以及盡可能詳細地解釋原因。
```js
const obj = {
  value: 1,
  hello: function() {
    console.log(this.value)
  },
  inner: {
    value: 2,
    hello: function() {
      console.log(this.value)
    }
  }
}
  
const obj2 = obj.inner
const hello = obj.inner.hello
obj.inner.hello() // ??
obj2.hello() // ??
hello() // ??
```

this 重點：

看怎麼呼叫，跟在哪裡無關

匿名函式例外，要看在哪裡。

可以轉換成call() 就比較知道 this 的值是什麼

首先第一題：
```js
obj.inner.hello() === obj.inner.hello.call(obj.inner)
```
所以
```js
const obj = {
  value: 1,
  hello: function() {
    console.log(this.value)
  },
  inner: {
    value: 2,
    hello: function() {
      console.log(this.value)
    }
  }
}
  第一題會輸出 2
```

第二題：
```js
obj2.hello() === obj2.hello.call(obj2)
```

所以
```js
const obj2 = obj.inner
第二題一樣輸出 2
```

第三題：
```js
hello() === hello.call()
第三題會輸出 undefind
```
