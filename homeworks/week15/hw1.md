## 十一到十五週心得
  這一次的總複習真的學了很多東西，是很豐富充實的幾週，前十週學得比較像是基礎，掌握了之後，十一到十五週就比較像是建立在前十週的基礎上在實務上比較會做的方法以及該注意的事項，例如前十週學的 DOM 的原理，如何發佈 AJAX ，以及瀏覽器請求跟 Node js 請求不同之處，知道了這些才能在第十一週知道由於我們是在瀏覽器上，在安全性上有許多地方要注意，才能瞭解第十二、十三週教的工具 ( sass、boostrap、jQuery、wepback、gulp、babel )如何使用，一直記得老師的話 
  
  **工具是為了讓你更加方便而使用的**

  因此工具反而害你綁手綁腳那不用也無妨～ 接下來稍微回顧一下十五～十一週的學習以及心得。

  ## 第十五週 ：
   看了老師的文章，對瀏覽器運作有個概念，首先要知道 CPU 就像是電腦裡的員工，每一個負責一件事情，不過什麼事情不太了解，反正每個事都要給他做，有夠忙就是了，所以還有一個叫 GPU 負責畫畫方面的，就像是電腦裡的藝術家 ( 也是員工，哈哈 ) ，也做一些圖像*平行運算*，就是可以一次畫 100 格，不用從 1 畫完，然後 2..3..4 ，可以想成 GPU 每個都有心電感應，可以同時一起作業無縫接軌，也可以做一些複雜運算來幫 CPU 減輕一些負擔。

   再來就是每個應用程序會有多個 process ( 程序 )，每個程序都有多個 thread ( 執行緒 )，作業系統會分配記憶體給各個 process ，各個 process 在利用 Inter Process Communication (IPC) 相互溝通， chrome 每個 process 都是分開的，優點是當一個 process 壞掉了其他並不影響，不會整個瀏覽器壞掉。
   
   接著解析並渲染畫面的流程，大致上瀏覽器會先把資料解析成 DOM ，解析完再計算 CSS，再來 layout，接著開始渲染最後在合成全部畫面，當然每個步驟其實都還會做一些事，像是將資料解析成 DOM 時如果看到 `<script>` 會先暫停解析，因為會影響 DOM 物件等等，其實也是大概有個概念，其他有點小複雜先等等 XD

   再來是老師給我們的小測驗，有些知道是可以，但詳細回答出原因就不太行，要再理解的透徹一點才行，或是要懂的如何表達也很重要。

   也看了第四期官網的 sass 模樣，
   看看大專案是如何寫 sass 的，感覺就是好好分類 ( 字型的、畫面顏色、RWD ) ，最後再用一個 `main.sass` 把所有的 `import` 進來，真的很厲害，要很有耐心，一步步來。

  ## 第十四週：

  第十四週的重點就在網站部署，也是矇矇懂懂得跟著學長姐一步步來就完成了，還蠻幸運沒有遇到太多的問題，看了老師的示範也說明了最多的問題就是防火牆跟權限問題，看來都是跟資訊安全有關的比較多，不過也很合理，因為是遠端的，如果不做安全機制那大家都可以來就糟糕了。
  
  再來自己做的部分在申請域名以及設定 DNS 還有使用 Filezilla ，我是用 NameCheap 申請域名的以及用 Route 53 來設定 DNS，在指向 DNS 時要產生一個 NS 紀錄以及一個 A 類型的簡易紀錄，再把 NS 紀錄複製貼上到 NameCheap 上，讓你申請的域名能夠指向你的 ip 主機，後來 `JAS0N HUANG `同學詢問了我是否不一定要用 Route 53 來設定 DNS ? 我想是對的，應該只要有辦法把 DNS 指向你的主機不管用什麼 DNS 服務都可以，不過有些需要設定 A類型紀錄以及 NS ( Name Server ) 紀錄才行，有些只要設定 A 類型指向你的 ip 就可以，這部分我就不太了解...

再來就是自我檢測的部分了～這邊貼上我比較不太會的部分

### Ｑ1 你知道虛擬空間、虛擬主機以及實體主機的差別

實體主機比較好懂，就是一台主機在一個房間放置，並把資料放進去，由於整台都是你的所以你享有所有硬體空間、記憶體全部的資源，缺點：需要 24 小時不斷電、維護成本之類的費用會比虛擬的高一些，端看你的需求。

虛擬主機簡單來說就是利用程式或軟體把實體主機分割成多個 [ 虛擬空間 ] 給大家使用，每個虛擬主機都可以建立網站、資料庫、伺服器，就跟一個實體主機一樣，由於大家分攤一台實體主機的維護費用，所以費用相對的便宜許多，缺點是你的資源較少，不過如果只架設一個網站不需要太多資源，所以還是要端看你的需求。

  *這邊有我的部署心得～ 不一定要看，助教、老師很辛苦*

  [簡易部署 AWS EC2 遠端主機 + Ubuntu LAMP 環境 + phpmyadmin ＋FileZilla上傳檔案 ＋遇到問題](https://www.coderbridge.com/@ALANYEN0202/d87b112bd5eb4f9ba1bcbd44cd627c3a)


## 第十三週 ：

是我覺得這幾週裡面以來最難的一週，教了很多工具，比較重要的應該是 webpack 工具的使用，如何把網頁的程式碼模組化，全部轉成 JavaScript ( css、html ) 然後重構分類，做後打包、測試。

主要步驟：

ㄧ、先構思打包完後要如何引用
```js
commentPlugin.init({
  sitekey: 'blan',
  apiUrl: 'http://...',
  containerSelector: '.comments-area'
})
```

二、重構 js 

三、客製化變數

自己做了兩三遍，結果現在又忘記...有空再看老師做一遍...

第二個重點就是改用`fetch`來串 API ，而要懂 `fetch`  就要瞭解`promise` 詳細原理我也不懂，只知道 fetch 會回傳一個 promise ，只要是 promise 就可以用 `.then`來接收，然後只要`return`下一個 `.then`的變數的值就是前一個的 return....還蠻繞口的，總之，老師說，多用就對了！哪天會開竅的 ( 希望會有這一天 )

再來是這週的自我檢測，一樣是回答我比較不熟的部分

### Q1 你知道 webpack 的目的以及原理:

使用 webpack 的目的就是讓瀏覽器能夠引用模組，雖然 ES6 已經有支援了，但是還沒到成熟，要一些設定才能引用，而且支援度也不是很好。

原理就是把你的程式碼用函式包住，轉換成一個個的模組，再把模組打包束起來變成一個檔案給你引用。

當然打包束起來之間也可以做很多事情 ( 轉譯、壓縮 )等等

## 第十二週：

十二週也是工具的使用( jQuery、bootstrap ) 

jQuery 是一個 JavaScript 的函式庫( library ) 主要優點就是可以跨瀏覽器，不用對每個瀏覽器都寫另外的程式碼，也可以簡化 Select 以及許多語法的簡化。

bootstrap 就是一個模板的 css ，讓你能夠快速建立一個網頁的 css 利用 class 的命名來改變樣子，因為 bootstrap 都幫你寫好樣式了。

不過這週的作業我兩個都不太會...哈哈，看了老師才會做載入更多的功能，主要就是更改`sql`，然後在抓一次資料並且新增上去。

然後 todolist 有做出來前端的功能，後端也是不會，後來同學以及老師的提示終於有做出來後端的部分，不過我是不管三七二十一的直接把裡面所有 html 轉成 json 字串存入後端，拿取時在直接 append 上去...看完老師的才發現只要擷取需要的資料即可，不過如何選到需要的資料也是重點這邊老師用了`.each、.find、.hasClass、.attr、.text` 許多函式來找尋，沒看老師的還不知道有這麼多函式可以用... 看完了就稍微記一下這些函式，以後突然想到還可以用一下。

最後老師還用了一種不同的方式來做 todolist ，就是直接修改 data 然後再重新 render data 資料的方式，由於資料一直處於最新，儲存時直接把 data 轉成 json 字串存入後端即可。

自我檢測部份：

### Q1 你知道什麼是 SPA
  就是單頁式應用，所有畫面都在同一頁產生，不會像多頁式的一個網頁就是對應一個畫面，利用 JS 動態新增資料到 html 上，再用 Ajax 來發出請求到後端 API 並新增資料。
### Q2 你知道在 server 與在 client render 的差別

差別在於 

server (SSR) 是直接在後端就生成 html 並傳給前端。所以這邊 php 以及 html 會混合再一起～豆頁會痛。

client (CSR) 是接收到後端的資料 ( API )再決定要如何渲染。這邊後端只負責給資料，前端負責串接並渲染。


## 第十一週：
主要在講資訊安全，是非常重要的一週，總結老師一句話 

**不要相信來自 client 端的資料**

講了雜揍、加密、SQL injection、XSS、CSRF以及一些當入機制、權限問題要注意，防守是相對弱勢的，防守要全面，攻擊只要一點，跟打球一樣，雖然教練會說*攻擊就是最好的防守* 但用在這裡不太對，哈哈哈。

雜揍主要可以理解為一個雜湊亂數可能對應多個字串，因此無法回推才相對安全，而你輸入的字串一定會對應到相同的雜湊～

加密就只能一對一，所以可以回推，一但被破解就知道密碼了。

自我檢測：

### Q1 你知道什麼是 SQL Injection 以及如何防範

就是利用填字遊戲來觸發 sql指令進而竊取資料庫的資料。

防範方法也就是改成 `prepared statement` 就可以了。
### Q2 你知道什麼是 XSS 以及如何防範

就是利用輸入的地方輸入標籤`<script>alert('hello~')</script>`，讓瀏覽器以為是要執行程式

防範方法就是使用跳脫字元的函式跳脫就可以了。
### Q3 你知道為什麼儘管前端做了驗證，後端還是要再做一次驗證
因為前端僅管做了驗證不顯示，有心人士照樣可以發請求到後端，如果後端沒有驗證的話，照樣可以刪除資料或是做一些不是他可以做的事情，因此前後端都要做驗證是最保險的做法。

參考資料：

[Client-side Render 和 SSR 的差別](https://noob.tw/client-server-side-render/)

[webpack 新手教學之淺談模組化與 snowpack](https://blog.huli.tw/2020/01/21/webpack-newbie-tutorial/)

[網站前後端開發基礎測試](https://github.com/Lidemy/mentor-program-3rd/issues/5)

[瀏覽器運作導讀](https://www.youtube.com/watch?v=5iaNYpVedIU&feature=youtu.be&t=2432)

[虛擬主機是什麼？入門與進階該如何選擇與比較？](https://techmoon.xyz/virtual-host/)

