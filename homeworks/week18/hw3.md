## 什麼是反向代理（Reverse proxy）？
  我認為要說明反向代理前要先說明代理是什麼，代理就是當多個客戶端發送請求給伺服端時，會先經過一個代理伺服器，在統一由代理伺服器發送給伺服端。

  優點： 客戶可以隱藏自己身份，較安全，可以利用這原理翻牆

  缺點： 代理伺服器如果是惡意的也是不安全

      客戶一  =>             
      客戶二  =>  代理伺服器 => 伺服器端  
      客戶三  =>             

  而反向代理就是當客戶發請求給伺服端時，也會經過代理伺服器，不過這個代理伺服器會根據一些規則分把這些請求分發給多個伺服器。

  
優點：可以利用同個伺服器做不同的服務，也可以利用快取功能節省許多時間。
缺點：如連線數量龐大，代理伺服器會變成中間的瓶頸
                           =>   伺服器一   
        客戶 => 代理伺服器   =>   伺服器二
                           =>   伺服器三

## 什麼是 ORM？
   ORM ( Obeject Relational Mapping) 中文可能叫做 物件關聯映射？

   我的理解是利用像物件的方法來實現 SQL query 等的指令操作。

   例如使用 sequelize 來操作 SQL query 時，就會用到 `.findAll()、.findOne()、.destroy()、.create()、.update()` 等等來對應相應的 SQL query，也就是當你使用上面這些方法時， sequelize 會自動幫你做一個映射直接幫你下相對應的 SQL query，如此一來就不用直接寫 SQL query，會變得方便許多。

## 什麼是 N+1 problem？

在 ORM 中使用一對多的關聯查詢時很容易發生的一個問題。

舉例來說我們創建兩個資料表，一個是使用者 (Users)，一個為文章(Posts)，假設現在有十個文章，我們要查詢每個文章的使用者 (也就是作者)是誰，在 ORM 中可能會這樣查詢
```js
Posts.findAll().then(posts => { // 先列出所有文章
for(const post of posts) { // 對每筆文章
  Author: post.author.name // 這裡會執行 SELECT * FROM Users WHERE users_id = post.user_id
}
})
```
在這邊就會發現當有十筆文章時，我們會先找出所有文章 `SELECT * FROM Posts` 此時是 N + 1 的 1 ，接著在每個迴圈做一次 `SELECT * FROM Users WHERE users_id = post.user_id` 查詢，所以十筆就是十次，這是 N + 1 的 N ，會發現嚴重影響效能問題，解決方法之一是使用 include，例如
```js
Users.includes(:posts)

SELECT `posts`.* FROM `posts` WHERE `posts`.`user_id` IN (1, 2, 3, 4, ....,10)

# 回傳所有 User 和 關聯的 posts
```

其實網路上看了很多文章，不過還是沒有很了解這個東西，覺得要實際操作才能大致了解吧，也可能是因為不太熟悉 sequelize 的原因，不知道他們實際是怎麼下 SQL query 的，所以才沒有發現 N + 1 的問題，照理說都是使用 join 來關聯資料庫的，有時間要在多多爬文，好好思考一下。

[什么是ORM中的N+1](https://www.the5fire.com/what-is-orm-n+1.html)


[[Rails] N+1 Queries Problem](https://medium.com/@dd0425/rails-n-1-queries-problem-73dfe5f99182)
