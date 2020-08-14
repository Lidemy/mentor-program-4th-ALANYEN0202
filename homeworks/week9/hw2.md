## 資料庫欄位型態 VARCHAR 跟 TEXT 的差別是什麼

 * VARCHAR : 主要是存取資料長度不一致，但資料量比較小時會使用的文字型態，可以預設長度。
 * TEXT : 主要是存取資料長度不一致，但資料量比較大時會使用的文字型態，不能預設長度。


|             | VARCHAR  |   TEXT   |
|  ---------- | -------  | -------- |
| 資料長度     |   較短   |   較長    |
| 資料量       |    少    |     多    |
| 設定預設值   |   可以   |    不行    |

所以說，大家建議是可以用 VARCHAR 就用 VARCHAR，比較節省儲存空間~

查了網路上資料說 SQL2005(含)以上的 VARCHAR 長度已經跟 TEXT 是一樣的了，以後可能會沒有TEXT的型態。

資料來源 :[[Mysql] 資料型態int, float, double, text, char, varchar, blob大小](http://n.sfs.tw/content/index/10266)


## Cookie 是什麼？在 HTTP 這一層要怎麼設定 Cookie，瀏覽器又是怎麼把 Cookie 帶去 Server 的？

Cookie 是 Session 裡面的其中一種機制，當你瀏覽網頁時，伺服器會在你的電腦上留下一些小小的檔案，當你再次瀏覽該網站時，伺服器便會讀取這些檔案來辨認你，這個小小的檔案就是 Cookie。


以 php 為例，在伺服器使用函式 `setcookie("name", values)`來設定cookie，當瀏覽器讀取網站時(向伺服器發送請求)，伺服器便會回傳這個cookie給瀏覽器，於是瀏覽器就會接收到並寫入到自己的電腦上，當再次造訪該網站時(向伺服器發送請求)此時的請求多了一筆 cookie，於是伺服器就知道該使用者的資訊了~

資料來源 :[老師好聞:白話 Session 與 Cookie：從經營雜貨店開始](https://medium.com/@hulitw/session-and-cookie-15e47ed838bc)
[Cookie 是什麼？](http://www.vixual.net/blog/archives/12)
## 我們本週實作的會員系統，你能夠想到什麼潛在的問題嗎？


* 第一個想到的是 html標籤的符號會被當成程式語言寫入

* 第二個是看到老師課程的提示，明文密碼的風險。


* 


