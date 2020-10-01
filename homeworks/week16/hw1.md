Q1:  請你說明以下程式碼會輸出什麼，以及盡可能詳細地解釋原因。
```js
console.log(1)
setTimeout(() => {
  console.log(2)
}, 0)
console.log(3)
setTimeout(() => {
  console.log(4)
}, 0)
console.log(5)
```
首先答案是 1 => 3 => 5 => 2 => 4

接著我來解釋為什麼

首先我們知道 JavaScript 是單一執行緒，也就是一次只能執行一件事，所以會有一個地方會按照順序來讓 JavaScript 一個一個執行，這個地方英文叫 stack ( 堆疊 ) ，但只有 stack 是無法達成非同步的，因此會借助瀏覽器或是 Node js 的執行環境來幫忙處理一些事項，完成後傳回另一個地方，叫做 task queue ( 任務的列表 )，這時有一個叫做 event loop 的工具就會查看 stack 是否已清空，有清空就會把 task queue 跑完的結果放到堆疊上執行，他的任務就這樣，接下來我一步步講解上面程式碼的執行。

首先 

ㄧ、 ```console.log(1)```  堆疊上放入這段程式碼並解輸出 1

二、
```js
setTimeout(() => {
  console.log(2)
}, 0)
```
將`setTimeout()`這個瀏覽器或是 Node js 提供的方法放到 執行環境 ( web 或 node js ) 裡計時，由於是 0 秒，所以很快就執行完畢，並且把結果 `console.log(2)`傳到 task queue 等待 event loop 發放，由於此時堆疊還沒清空，因此還在等待。

三、 ```console.log(3)``` 堆疊上放入這段程式碼並解輸出 3

四、
```js
setTimeout(() => {
  console.log(4)
}, 0)
```
同步驟二，此時 task quequ 上有結果 `console.log(2)、console.log(4)`並等待放上堆疊。

五、```console.log(5)``` 疊上放入這段程式碼並解輸出 5

六、此時已無程式碼並且堆疊清空，也就是 JS 主執行環境已經清空沒事了， event loop 發現並且把 task queue 第一位往上放到堆疊 ( 也就是 console.log(2) ) 此時才輸出 2 

七、同上步驟 輸出 4 ，全部清空，執行完畢。

所以答案是 1 => 3 => 5 => 2 => 4 

參考資料

[Philip Roberts | JSConf EU](https://www.youtube.com/watch?v=8aGhZQkoFbQ)
