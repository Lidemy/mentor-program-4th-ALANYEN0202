![](https://static.coderbridge.com/img/ALANYEN0202/bce5d776417842459287e04a82e121a7.jpeg)

圖片不是很美觀...傷了你們眼睛不好意思...

來大概講解一下圖片～

ㄧ、首先顧客經由 Browser ( 瀏覽器 )，來向伺服器 ( 例如 google 的短網址服務 ) 提出短網址請求，到達伺服器前會先經過 Load Balance  ( 負載均衡器 ) 來分配任務給各個伺服器。

二、伺服器接收到請求，把顧客的短網址拿去資料庫做查詢，這邊也是一樣到達資料庫前會在經過一層 Load Balance 做分配給各個資料庫。

三、資料酷查詢有無此短網址，有 ＝> 回傳給 LB ＝> 回傳給伺服器 => 回傳給LB => 回傳給瀏覽器 ( 顧客 )

無 => 回傳給 LB => 回傳給伺服器 => 伺服器新增一個新的短網址 => 往下傳給 LB 做分配 => 傳到資料庫做儲存 => 回傳給 LB ＝> 回傳給伺服器 => 回傳給LB => 回傳給瀏覽器 ( 顧客 )

而資料庫在做儲存的同時，資料庫也會複製同樣的資料到其他的子資料庫 ( slave data base ) 也就是備份，當主資料庫 ( Master data base )故障時，其中一個子資料庫將被升級變為主資料庫，如此可保障資料的安全以及穩定。

至於虛線的部分也是為了防止其中一個環節出錯還有另外一個可以運行，因為如果只有一個 LB ( 負載平衡器 )或是伺服器 ( Server ) 當哪一個故障將導致所有系統故障。

每個資料庫都是相連的，資料是共通。

不過為何伺服器到資料庫之間還要再一個 LB 我就不太了解了，是因為如果伺服器直接連接到資料庫去做查詢的話會過於混亂不好維護？ 或是說伺服器直接連接到資料庫可能造成資源分配不均？( 大家都查詢同一個資料庫，以致效率變慢？
) 

參考資料：

[CS75 (Summer 2012) Lecture 9 Scalability Harvard Web Development David Malan](https://www.youtube.com/watch?v=-W9F__D3oY4)


[短网址(short URL)系统的原理及其实现](https://hufangyun.com/2017/short-url/)


[Designing a URL Shortening service like TinyURL](https://www.educative.io/courses/grokking-the-system-design-interview/m2ygV4E81AR#div-stylecolorblack-background-colore2f4c7-border-radius5px-padding5px2-requirements-and-goals-of-the-systemdiv)
