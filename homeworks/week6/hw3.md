## 請找出三個課程裡面沒提到的 HTML 標籤並一一說明作用。

  一、* `<section></section>` : <br>
  其實 `<section> <article> <div>` 三種標籤的功能是一樣的，差別在於語意，除了`<div>` 以外其他兩個表遷都是有語意的，差別在哪呢?

  * `<section>` : 有主題性的文章或段落，通常會有個標題，然後下面有內文。

   * `<article>` : 有主題性的文章或段落，通常會有個標題，然後下面有內文。*且是完整的獨立內容*

   差別就是後面這段***且是完整的獨立內容**，至於如何判斷是否為完整的獨立內容，有個比較容易辨別的方法就是看這段內容脫離了所在的語境，是否還是完整的、獨立的，所以`<article>`比`<section>`規範的更嚴格一些。

   [資料來源 : HTML5標記div、section、article使用說明_19](https://yongxjb.pixnet.net/blog/post/6312952)

   二、 `<bgsound />` : 連接音樂 <br>
   `src：音樂檔路徑`<br>
   範例: `<bgsound src="img/music.mp3"
   loop="5" />`  
   **loop：重播次數，若要一直重複播放，可使用infinite**

   [資料來源 : HTML標籤列表](http://web.thu.edu.tw/hzed/www/tag.htm)

   三、`<frameset></frameset>` : 分割視窗標籤<br>
  應該就是說一個 html 算是一個頁面，這個標籤可以把多個 html 放在同一個頁面。

>引用 : [關於HTML框架(frameset)的一些基本用法](https://www.itread01.com/content/1543812006.html)

垂直切割屬性為cols。例如：

        <frameset cols="50%,50%">
        <frame src="http://www.baidu.com">
        <frame src="http://www.google.cn"
        </frameset>
  第一個 50%, 50% 就是左右各一半，下面兩個連結，就會有兩個視窗，把 `src` 連結換成你的 html 就能連到妳的頁面，其實還有很多屬性可以設定，這邊就不一一贅述，詳情可以去 google 一下。

  [資料來源 : 關於HTML框架(frameset)的一些基本用法](https://www.itread01.com/content/1543812006.html)
## 請問什麼是盒模型（box modal）
  就是在 CSS 裡 html 最基本的組成模式，就是每個 html 標籤都是一個盒子，可以在盒子裡面填整大小，框線以及盒子與盒子間的排序等等。

  參考資料 : [前端基礎：CSS 盒模型（box model）](https://medium.com/@hugh_Program_learning_diary_Js/%E5%89%8D%E7%AB%AF%E5%9F%BA%E7%A4%8E-css-%E7%9B%92%E6%A8%A1%E5%9E%8B-box-model-1b977df8d3d0) 

## 請問 display: inline, block 跟 inline-block 的差別是什麼？

 * inline : <br>
 簡單說就是所有元素都在同一行，不會換行，所以不能調整高度。```<a> 、 <span> 、 <b> 、 <i> 、 <img> 、 <iframe> ``` 這些標籤預設都是 inline

 * block : <br>
 就是所有元素都是一個區塊一個區塊的，所以可以調整寬高，但要注意的是 block 的排序方式為上下，意思是每一個 block 元素都會換行。```<div> 、 <p> 、 <h1 ~ 6>``` 這些標籤預設為 block。

 * inline-block : <br>
 綜合兩種屬性的優點的顯示方式，也就是每個元素為一個區塊，但排序方式又都在同一行，外面是 inline 裡面是 block。

參考資料 : [CSS 屬性 display 的值 inline block inline-block none](https://blog.xuite.net/vexed/tech/29221717-CSS+%E5%B1%AC%E6%80%A7+display+%E7%9A%84%E5%80%BC+inline+block+inline-block+none)

## 請問 position: static, relative, absolute 跟 fixed 的差別是什麼？

 * static : (預設定位)

無法定義 top、left、bottom 與 right。

 * relative : 相對定位

 簡單來說就是可以用來讓元素偏移卻又**不影響其他元素**，利用 left、right、top、bottom 來讓元素偏移或互換，可以讓該元素跑出框線卻又不影響到其他元素。**要注意的是該元素實際位置還是沒變，只是畫面呈現出來有偏移而已** 

 * absolute : 絕對定位

 絕對定位會找第一個上層定位不為 static 的元素，來根據這個元素作相對應的定位。
**如果都沒設定定位的話，那該元素會對應到 body 元素 (也就是整個網頁內容)**

 * fixed : 固定定位

 固定定位會根據瀏覽器視窗來做定位，意味著網頁往下滑時元素也會跟著定在上面。
 **與 absolute 的最大差別在於， absolute 是固定在網頁上，所以捲動時就會看不到，而 fixed 怎麼滑動就是會在瀏覽器上面 (就像有時跳出的廣告一樣...)**


