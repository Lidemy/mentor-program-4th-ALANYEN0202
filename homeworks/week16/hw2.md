Q2:  請你說明以下程式碼會輸出什麼，以及盡可能詳細地解釋原因。
```js
for(var i=0; i<5; i++) {
  console.log('i: ' + i)
  setTimeout(() => {
    console.log(i)
  }, i * 1000)
}
```
答案是:

i: 0

i: 1

i: 2

i: 3

i: 4

接著每隔一秒 印出 5 

首先上列程式碼可以看成 
```js
var i // 全域變數
for(i = 0; i < 5; i++) {
  console.log('i: ' + i)
  setTimeout(() => {
    console.log(i)
  }, i * 1000)
}
```

再來每執行一個迴圈就會跑一次`setTimeout`，像這樣 

```js 
i: 0 

setTimeout(() => {
  console.log(i) // 還不會執行，會放到 web 或 node 裡計時
}, i * 1000) // 讀取到 0 秒

i: 1 

setTimeout(() => {
  console.log(i)
}, i * 1000) // 讀取到 1 秒

i: 2 

setTimeout(() => {
  console.log(i)
}, i * 1000) // 讀取到 2 秒

.....
``` 

重點在當跑到 `setTimeout()`時，裡面的 `console.log(i)` 不會先執行，而是會先放到 web 那邊先計時，這邊計時器的 i 讀取得到迴圈的 i 。

由於所有 `setTimeout` 都被放入 web 計時，計時完並放入 task queue 等待執行，這時迴圈已經先在堆疊上跑完並輸出 `i: 0 、i: 1 ... i: 4` 最後 ` i = 5 ` 時由於超出迴圈限制，跳出迴圈，此時全域變數 `i = 5 `因此當 event loop 把從 task queqe 的 console.log(i) 放到堆疊上執行時， i = 5 ，因此會輸出五次 i = 5 。

堆疊 stack：
```js
console.log(0)
console.log(1)
console.log(2)
console.log(3)
console.log(4) //此時 i = 5 跳出迴圈 並清空堆疊
```
web apis :
```js
setTimeout(() => { // 0 秒後執行 console.log(i)
  console.log(i)
},0 * 1000) 

setTimeout(() => { // 1 秒後執行 console.log(i)
  console.log(i)
},1 * 1000) 

setTimeout(() => { // 2 秒後執行 console.log(i)
  console.log(i)
},2 * 1000) 

setTimeout(() => { // 3 秒後執行 console.log(i)
  console.log(i)
},3 * 1000) 

setTimeout(() => { // 4 秒後執行 console.log(i)
  console.log(i)
},4 * 1000) 
```
當在 web apis 計時完後，會把到 task queue 等待執行。

task queue : 
```js
console.log(i) // 0 秒的 setTimeout 計時完
console.log(i) // 1 秒的 setTimeout 計時完
console.log(i) // 2 秒的 setTimeout 計時完
console.log(i) // 3 秒的 setTimeout 計時完
console.log(i) // 4 秒的 setTimeout 計時完

i = 5
```
所以會輸出 

5

5

5

5

5


參考資料

[前端三十｜08. [JS] 請寫出間隔一秒印出 1, 2, 3, 4, 5 的程式碼](https://medium.com/schaoss-blog/%E5%89%8D%E7%AB%AF%E4%B8%89%E5%8D%81-08-js-%E8%AB%8B%E5%AF%AB%E5%87%BA%E9%96%93%E9%9A%94%E4%B8%80%E7%A7%92%E5%8D%B0%E5%87%BA-0-1-2-3-4-%E7%9A%84%E7%A8%8B%E5%BC%8F%E7%A2%BC-6564da4c84c7)

[Philip Roberts | JSConf EU](https://www.youtube.com/watch?v=8aGhZQkoFbQ)
