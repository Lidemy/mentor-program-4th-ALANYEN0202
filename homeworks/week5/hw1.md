## 前四週心得與解題心得

### 第一週 (不暖身的暖身週)

  第一週簡單來說就是安裝 git 以及註冊 github 以及熟悉這兩個套件的指令還有相關用法。

因為都要使用終端機 (terminal) 來操作，所以對於習慣使用圖形介面的人來說會需要時間適應，
還有一些指令要熟悉起來，先是熟悉 git 的指令，開始時使用 `git init` 來代表開始使用版本控制
在來使用` git add` 來加入以及 `git commit` 來代表存檔告一個段落，要實際操作一遍才會記憶的
比較快，當然可以加一些參數來使用每個指令，這邊就沒有再細講，再來熟悉 git hub 的操作模式，
要知道 push、pull 以及分支(branch)的概念，這部分我也是停了一下，來自己想一遍，遠端的，本地端
的，怎麼交流的關係，大致了解這一週也差不多了，覺得這一週蠻重要的，畢竟以後有要開發專案想必
也是這種模式，去 github 載回來開發 (開分支)，開發完 push 回 github 大家一起討論並且合併 (merge)
，是個基礎且重要的一週。

###第二、三週

  第二、三週就是 javascript 的基礎概念，因為之前有先上老師的先別急著寫 leetcode 所以相對來說好上手，
題目也有先上過了，遇到比較困難的部分是函式 filter ，裡面的 callback 讓我不太懂，看老師是用 ` element => !==element` 代表會過濾不等於 element 的元素我懂，不懂的部分是名字可以隨意換嗎?例如我可以寫`number => !==number`意思是一樣嗎?擷取 [MDN](https://developer.mozilla.org/zh-TW/docs/Web/JavaScript/Reference/Global_Objects/Array/filter) 的一段程式碼:
```js 
const words = ['spray', 'limit', 'elite', 'exuberant', 'destruction', 'present'];

const result = words.filter(word => word.length > 6);

console.log(result);
// expected output: Array ["exuberant", "destruction", "present"]
```
裡面是寫 `word => word.length > 6`，可以改成 `element => element.length > 6` 嗎?後來自己試了一遍發現是可以的，應該說這個函式是對第一個引數來判斷是否為 true 是就留下來，通常第一個都會取名為 element。

帶我又發現 filter 可以再另外接收兩個引數，這是我上網找到的資訊[Javascript中關於Array.filter()的妙用詳解](https://codertw.com/%E5%89%8D%E7%AB%AF%E9%96%8B%E7%99%BC/251866/)
裡面有一段這樣寫:
``` js
var arr = ['A', 'B', 'C'];
var r = arr.filter(function (element, index, self) {
console.log(element); // 依次列印'A', 'B', 'C'
console.log(index); // 依次列印0, 1, 2
console.log(self); // self就是變數arr
return true;
});
```
當然你也可以把名字都改掉，但函式是對應位置的，第一個位置代表每個元素，第二個代表每個 index ，帶三個就是陣列本身，應該是這樣沒錯吧? 有那裡理解錯誤請糾正我，因為我對著種 callback 的概念很難理解，很苦手 XD。

### 第四週 (串接 API)

  這週就是來串 API 拉，一開始很不熟悉，不知如何開始，就跟著老師有樣學樣，最後在自己做一次看看，目前都是這種模式來進行，發現很多不一樣的格式但可以達到同樣效果，所以方法各式各樣，不過先學有辦法達成目標就好，反正就是資料的增刪查改，看了老師的**公車動態**還有**寄信小程式**大致是沒問題，不過就是 callback 很不熟，不知道為什麼 callback 的格式例如老師其中一段程式碼:
  ``` js
  function getBusData(number, cb) {
  request(url + number, (err, response) => {
    if (err){
      cb(err)
      return
    }
    cb(null, response.body)
  })
}
getBusData(process.argv[2], (err, html) => {
  if (err) {
    return console.log(err)
  }

  let result = getStopInfo(html)
  console.log(result.join('\n'))
})
```
裡面的函式`function getBusData(number, cb)`最後一段 `cb (null,response.body)` 不太了解，
我有試過改成`cb (response.body)` 結果直接印出所有的`response.body`，不知道為甚麼前面要放一個 `null`，是因為這是`request`的固定格式嗎`request('', (err, res, body) => {})`

應該是因為我們是要取得`response.body`但是根據`request(url + number, (err, response)` 前面還有一個`err`所以給定一個`null`?應該是吧 哈哈。

對了老師後來補充一個概念叫**race condition** 就是網路上非同步的概念，就是發兩個 request 時，妳以為先發會先到，但由於每個伺服器處理狀態不一樣，或資料量不同，還有很多因素等等，所以不一定先傳得先到，為了避免這種情形發生要把兩個 request 一起包起來，順序一的先，確保第一個收到 response 完成了，在跑下一個 request，謝謝老師補充如此重要的概念。

### 【HTTP】Lidemy Http challenge 小遊戲
  版上很多詳細的心得以及破關方法，所以不必擔心破不了關，前面己關的增刪查改比較簡單，只要查好格式就沒甚麼問題，
  
  
  後面改成要有認證才能做增刪查改，這種也感覺比較符合現實，畢竟總不能誰都可以動你的資料吧...裡面遇到的問題是要查詢時 url 無法辨識中文，需要把字串改成`var str = encodeURI('要搜尋的字串')`然後再把`str`放到 url 就可以了，
  
  再來是使用 `user-agent`來偽裝瀏覽器，來源也可以設定，在 Header 放入`origin:#`就可以了，還有 3 開頭的轉址訊息卡了一下，要去瀏覽器找，找了一段時間 XD，
  
  再來是卡最久了要假裝是菲律賓伺服器發的 request ，用了 Chrome 的 proxy 屬性，試了有幾組 ip 終於有成功，最後一關也是使用`user-agent`來偽裝是 google 來針對不同瀏覽器顯示不同畫面，卡點是一直搜尋 chrome 的 XD，哈哈，
  
  
  真的非常好玩，也謝謝老師的用心以及彩蛋，雖然我一個都沒發現 XD，顧著解題已耗費我所有精力，藉著闖關來提升串 API 的能力。

### 總結
  這幾個禮拜是個充實的一個月，想先把基礎打好，有些挑戰題只能先放著，在跟著課程途中難免心情會有所起伏，覺得怎麼都學不會阿，或是該如何開始阿，後來只能先跟著老師先依樣畫葫蘆，再自己獨自試一遍看看，也只能一步步來，走到哪裡算哪裡，不然一次看到要學那麼多東西，容易害怕，把大目標變成一堆小目標，當小目標完成了，大目標也不遠了，希望大家都能順順利利，自己有盡力就很棒了，共勉之~
