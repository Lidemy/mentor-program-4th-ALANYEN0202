## Redux middleware 是什麼？
就是 dispatch => store 之中會先經過一個中介軟體 ( middleware )可以先幫你做其他處理 ( call API )，拿到資料時，再回傳一個真正要做的 dispatch 給 store ， store 再做接下的動作。

## CSR 跟 SSR 差在哪邊？為什麼我們需要 SSR？
最大的差別在於當你打開 devTool 觀看網頁的內容時，如果只看到空空的 html 那就是 CSR 也就是網頁內容全都是由 JS 動態產生，如果 html 裡面有網頁相對應的資料，就是 SSR 畫面由伺服器傳來。

由於 CSR 並不利於 SEO，所以需要 SSR 來讓 html 裡面有內容讓搜尋引擎能夠抓到資料。

## React 提供了哪些原生的方法讓你實作 SSR？
ReactDOMServer 裡面的 renderToString() 來把資料變成 html 裡的元素，不過這是這個元素無法作出任何互動，無法添加 addEventListener 來監聽事件。

所以接著再使用 ReactDOM.hydrate() 注水 再把元素加入該有的功能，如此一來 browser 能看到 html 的內容，而 client 也能與網頁正常互動。

要特別注意的是，以上的內容都是建立在比較固定的內容，如果要串 API 的話，可能要事先拿取資料再操作上面那兩個方法或是下一題的回答也就是使用一些框架來解決這個問題。

## 承上，除了原生的方法，有哪些現成的框架或是工具提供了 SSR 的解決方案？至少寫出兩種

 * prerender.io 他做的事情很好懂，就是他幫你執行完 JavaScript 並把執行完的結果儲存起來，當搜尋引擎來要資料時就會把資料給搜尋引擎。

 * Next.js 一個以 React 為基礎的框架，基本上跟寫 React 一樣，不一樣的地方是 Rounder 路由部分要設置在內建的 Page 裡的 JS 檔，只要直接創建 ( 例如 about.js )，在路由上直接輸入檔名 ( http:.../about ) 就會顯示你 about.js 的內容。


