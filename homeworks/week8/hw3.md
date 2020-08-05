## 什麼是 Ajax？
  全名 (Asynchronous JavaScript and XML) 非同步的 JavaScript and XML ，重點就是第一個單詞的非同步 ~ 使得我們在做交換資料時不必每次都重新整理頁面。

## 用 Ajax 與我們用表單送出資料的差別在哪？
  與表單最大的差別就在於表單每次都會換頁，而 Ajax 是會讓伺服器回傳給 JavaScript 再由瀏覽器來顯示頁面。

  表單 : 瀏覽器發 請求 => 伺服器接受 回傳 => 瀏覽器解讀並顯示。

  Ajax : 瀏覽器發 請求 => 伺服器接受 回傳 給 *JavaScript* => JavaScript 處理完 => 瀏覽器顯示
## JSONP 是什麼？
  全名叫做 JSON with Padding 主要來說就是跨來源請求的一種方法，利用 JavaScript 裡面附帶網址去發請求，再利用函式來拿取資料。
``` js
<script src="https://api.twitch.tv/kraken/games/top?client_id=xxx&callback=receiveData&limit=1"></script>
<script>
  function receiveData (response) {
    console.log(response);
  }
</script>
```

參考資料，老師的好文 [輕鬆理解 Ajax 與跨來源請求](https://blog.techbridge.cc/2017/05/20/api-ajax-cors-and-jsonp/)



## 要如何存取跨網域的 API？
  老師有教兩種，一種就是上面那題的 JSONP ，因為 JavaScript不受限同源政策，應該說是`<script>`這個標籤。

  再來一種比較常見也比較推薦

  使用 CORS 全名為 Cross-Origin Resource Sharing，跨來源資源共享

  規則就是如果 Server 端想把資料提供給妳的話，會在 Header 裡面添加 `Access-Control-Allow-Origin` 首先瀏覽器一樣會發請求，然後一樣瀏覽器會收到回應，但他會先檢查回應裡 Header 裡有沒有`Access-Control-Allow-Origin`如果沒有就不會讓你收到 回應，反之有則會通過並讓你收到。

  所以 server 可以利用 `Access-Control-Allow-Origin`  來限制有誰可以拿取你的資料 ~


  補充老師說的 Preflight Request (預檢請求)，重點是瀏覽器會先用一個 option 請求來確認是否可以通過，可以的話才會發真正的請求，因為如果是刪除請求我們並不需要 server 端的回應，當 server 端收到刪除請求就會刪除了...因此瀏覽器先用 option 請求測試，發現沒有 CORS ，就會阻止真正的刪除請求，反之就會再發一個真正的請求，算是一個預檢的機制。

## 為什麼我們在第四週時沒碰到跨網域的問題，這週卻碰到了？

因為第四週是用 node js 在發送請求，也就是使用自己的電腦在請求，而這一週是使用瀏覽器再發請求，每個人都可能用瀏覽器，因此就會有安全性問題，有點像是一個是私人空間(個人電腦)，一個是公共場合(瀏覽器)。


第四週 個人電腦 node js 串 API :

  自己的電腦去發請求 => 得到伺服器回應


第八週 利用瀏覽器 串 API :

  利用瀏覽器發請求 (任何人都可以到你的網站) *因此可以竊取別人資料* => 得到伺服器回應 => **瀏覽器檢查** => 通過拿到資料， 不通過不給拿~