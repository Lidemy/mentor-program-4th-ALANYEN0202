## Webpack 是做什麼用的？可以不用它嗎？
  簡單來說 webpack 是前端常用的 『 打包工具 』，主要的功能就是把你手上的資源做一個模組化的打包，讓瀏覽器以及其他人能夠支援使用。

什麼是模組化呢？ 

例如：當你機車頭燈壞掉時，拿去修車廠修你只要把頭燈換掉就好，
不必整台機車換掉，因為每個部件都是獨立分開的模組。

webpack 是做什麼用的？

例如說，你有各有一個 js、sass、img 圖片擋，你就可以利用 webpack 打包成一個檔案，打包前會先載入到一個 loader 然後在打包成一個檔案，而在 loader 時，就可以額外做些事情，如 js 可以利用 babel 轉譯， sass 轉譯， img 壓縮等等，那為什麼要打包，主要目的就是為了讓瀏覽器支援。

可以不用它嗎？

當然可以，因為你也可以自己做轉譯的動作，然後利用 `export`、`import` 來讓瀏覽器支援，但其實支援程度有限，而且還多了很多麻煩的設定，因此有了 webpack 工具會方便許多。

## gulp 跟 webpack 有什麼不一樣？
gulp :
 簡單來說就是一個任務的管理工具，你可以自己編寫任務的順序以及任務內容，例如：做編譯、壓縮檔案等等，基本上只要寫得出來就可以執行。

 webpack:
  簡單來說就是把所有資料打包綁在一起，讓瀏覽器以及其他人可以使用，而在打包途中也可以幫你做一些轉譯、壓縮等等的處理。

  總結來說，gulp 就像是一個任務列表，你先列好任務清單，接著要用時就執行，而執行本身的內容是你自己設定或是套用其它套件來執行，與 gulp 本身無關，他只負責管理。

  而 webpack 就是幫你把資料都打包好好的，當你有許多資料想要讓瀏覽器支援或分享給其他人時，他會幫你把所有資料打包成一個檔案，而打包過程中做一些壓縮、轉譯等等的處理，而他最大的優點是可以讓瀏覽器直接支援使用。

## CSS Selector 權重的計算方式為何？

主要分為四個等級：

由高到低

* inline-style
* ID
* Class 包括（ psuedo-class 偽選擇器 、attribute 屬性選擇器 ）
* Element
----------
權重 { 1 - 0 - 0 - 0 }

inline-style: 直接寫在 html 行內的樣式
`<div style='margin:10px'></div>`

權重 { 0 - 1 - 0 - 0 }

ID: 在 html 裡長 `id='home'` 在 css 裡長 `#home` 

權重 { 0 - 0 - 1 - 0 }

Class: 在 html 裡長 `class='card'` 在 css 裡長 `.card`

權重 { 0 - 0 - 0 - 1 }

Element: 各個 html 標籤
`<div>、<body>、<header>、<footer>`

再來全域變數匯市最低權重，例如：
```
* {
 padding: 0px;
 margin: 0px;
}
```

特別例外：

`!important` 加了這個權重直接變最高！

用法範例：
```
.home {
  width: 200px;!important
}
```

最後當你同時使用多個選擇時，相同權重的就加一，最高的就贏～

舉個例子：

```
Ａ .home .info （ 兩個 Class 權重為 { 0 - 0 - 2 - 0 })

Ｂ div span p a ( 四個 Element 權重為 { 0 - 0 - 0 - 4 })

C #banner ( 一個 ID 權重為 { 0 - 1 - 0 - 0 })

D #banner .info ( 一個 ID 一個 Class 權重為 { 0 - 1 - 1 - 0 })
```

優先順序為 D => C => A => B 

總結：`!important > inline style > ID > Class/psuedo-class(偽類)/attribute（屬性選擇器） > Element > 全域 *`
