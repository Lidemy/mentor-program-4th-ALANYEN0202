Q3:  請你說明以下程式碼會輸出什麼，以及盡可能詳細地解釋原因。
```js
var a = 1
function fn(){
  console.log(a)
  var a = 5
  console.log(a)
  a++
  var a
  fn2()
  console.log(a)
  function fn2(){
    console.log(a)
    a = 20
    b = 100
  }
}
fn()
console.log(a)
a = 10
console.log(a)
console.log(b)
```

直接學老師模仿 JS 引擎來運作一次答案就會呼之欲出。

首先執行 global Execution Context ( 簡稱 EC ) 裡面會有一個 Variable Object ( 簡稱 VO ) 

順序:

 ㄧ、參數

 二、函式 
 
 三、變數

 接著開始執行吧！

 第一步 初始化
```
global EC 

global VO {
  fn: function
  a: undefind
}
```

第二步 開始執行程式碼
```
global EC 
global VO {
  fn: function,
  a: 1 // var a = 1 
}
```

第三步 呼叫 fn() 創建 fn EC   以及 fn VO

```
fn EC 
fn VO {
  fn2: function,
  a: undefind
}

global EC 
global VO {
  fn: function,
  a: 1 // var a = 1 
}
```
第四步 開始執行 fn()

```js
var a = 1
function fn(){
  console.log(a) // 往上看可以看到這時 fn VO 的 a: undefind 所以輸出 undefind
  var a = 5  // fn VO a: 5  var 可以略過，因為已經宣告過了，直接看賦值即可
  console.log(a) // 此時 fn VO a = 5 ，輸出 5
  a++ // fn VO a: 6
  var a // 可以略過，已經宣告過了
  fn2() // 進入下一階的 EC VO
  console.log(a)
  function fn2(){
    console.log(a)
    a = 20
    b = 100
  }
}
fn()
console.log(a)
a = 10
console.log(a)
console.log(b)
```
接著介入下一階的 EC VO 長這樣
```
fn2 EC
fn2 VO {

}

fn EC 
fn VO {
  fn2: function,
  a: 6 // var a = 5 , a++ 
}

global EC 
global VO {
  fn: function,
  a: 1 // var a = 1 
}
```
第五步 開始執行 fn2()
```js
var a = 1
function fn(){
  console.log(a)
  var a = 5
  console.log(a)
  a++
  var a
  fn2()
  console.log(a)
  function fn2(){ 
    console.log(a)//印出 a 由於 fn2 裡面並沒有宣告 a ，往上一層 fn VO 找，找到 a = 6，輸出 6

    a = 20 // a = 20 ， 由於 fn2 裡面並沒有宣告 a ，往上一層 fn VO 找，找到 a 並改成 a = 20 

    b = 100 //fn2 裡面找不到有宣告 b ，往上一層 fn 找，fn 也沒有宣告 b ，往上一層 global 找，global 也找不到宣告 b ，由於已經是最上層，因此在 global VO 上添加 b: 200
  }
}
fn()
console.log(a)
a = 10
console.log(a)
console.log(b)
```

此時的 EC VO 找這樣
```
fn EC 
fn VO {
  fn2: function,
  a: 20 // a = 20  
}

global EC 
global VO {
  fn: function,
  a: 1 // var a = 1 
  b: 200 // b = 200 
}
```
由於 fn2() 以執行完畢，因此結束了 EC 。

繼續往下執行

```js
var a = 1
function fn(){
  console.log(a)
  var a = 5
  console.log(a)
  a++
  var a
  fn2()
  console.log(a) //這邊可以看到 fn VO 的 a = 20 ，輸出 20 
  function fn2(){
    console.log(a)
    a = 20
    b = 100
  }
}
fn()
console.log(a)
a = 10
console.log(a)
console.log(b)
```
此時 fn() 也執行完畢。

剩下 global
```
global EC 
global VO {
  fn: function,
  a: 1 // var a = 1 
  b: 200 // b = 200 
}
```
繼續執行
```js
var a = 1
function fn(){
  console.log(a)
  var a = 5
  console.log(a)
  a++
  var a
  fn2()
  console.log(a) //這邊可以看到 fn VO 的 a = 20 ，輸出 20 
  function fn2(){
    console.log(a)
    a = 20
    b = 100
  }
}
fn()
console.log(a) // 這邊的 a 可以看到 global 的 a = 1 ，輸出 1
a = 10 //  global VO a = 10
console.log(a) // 10
console.log(b) // 200
```
最後順序為
```js
var a = 1
function fn(){
  console.log(a) // undefind
  var a = 5
  console.log(a) // 5
  a++
  var a
  fn2()
  console.log(a) // 20
  function fn2(){
    console.log(a) // 6
    a = 20
    b = 100
  }
}
fn()
console.log(a) // 1
a = 10
console.log(a) // 10
console.log(b) // 200
```
順序為 
```
undefind
5
6
20
1
10
200
```

總結一下 hoisting 重點：

宣告才會提升，賦值不會

順序為 ：參數 => 函式 => 變數宣告 
