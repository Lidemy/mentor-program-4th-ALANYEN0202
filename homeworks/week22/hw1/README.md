# blog

## 這是什麼

這是利用 React 做的比較完整一點的部落格，使用 Function Hook 來練習，裡面有使用了 styled component 做樣式 、 Router 做換頁 、createContext 來往下傳遞資料 useContext 來接收資料用來做使用者的驗證功能、也簡單串了 API 來顯示文章。 

## Demo

[Demo](https://alanyen0202.github.io/react-blog)

## 功能

- 註冊功能 ( 由於是測試 API 密碼都會變為 Lidemy )
- 登入功能 ( 會拿到 JSON Web Token 再利用 Token 來驗證身份)
- 文章列表頁面 ( 可看到所有文章，每頁顯示 5 筆 )
- 關於我頁面
- 身份驗證 ( 登入才可發表文章 )
- 發表文章
- 可看單篇文章

Route 的部分使用 React Router。

[資料串接的 API](https://github.com/Lidemy/lidemy-student-json-api-server
)

