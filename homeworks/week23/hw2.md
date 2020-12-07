## 為什麼我們需要 Redux？
當資料的狀態變得複雜且龐大時，如果沒有統一管理狀態的工具，資料狀態會變得難以追蹤，出現問題時也難以找出問題點。

## Redux 是什麼？可以簡介一下 Redux 的各個元件跟資料流嗎？
是一套管理共同[ 狀態 ]的工具 主要有三大元件：

ㄧ、 actions: 負責管理有什麼指令，詳細會描述資料類型以及內容。

二、 reducer: 會接收 actions 跟 state 然後做相對應的處理，

三、 store: 統一存放資料狀態的地方。 

資料流：
首先當使用者點擊商品 + 1 按紐時 => 

actions 會下一個 商品新增 +1 的指令 => 

 reducer 接收到 商品新增 +1 的指令去更改相對應的 state =>
 
  state 更新完傳給畫面 => 
  
  重新渲染畫面

## 該怎麼把 React 跟 Redux 串起來？
有兩種方式可以讓 React 跟 Redux 串起來。

第一種 Hook 版：

首先在你的 React App 檔案裡面的 index.js 裡引入
```js
import { Provider } from 'react-redux';
import store from './redux/store'; //這邊是要對應到你創建的 store.js
```
接著在最外層使用

 `<Provider store={store}>...</Provider>`

 來傳遞資料

 接著在要使用的地方，先引入
 ```js
import { useSelector, useDispatch } from 'react-redux';
```
使用 `useSelector` 來選取你要的資料

`const todos = useSelector(store => store.todos.todos)`

使用 `useDispatch` 來下你要的指令

```js
const dispatch = useDispatch()
dispatch({
  type: 'add_todo'
  payload: {
    content: value,
  }
})
```

connect 版：

首先初始傳遞資料跟 Hook 一樣

```js
import { Provider } from 'react-redux';
import store from './redux/store'; //這邊是要對應到你創建的 store.js
```
接著在最外層使用

 `<Provider store={store}>...</Provider>`

 來傳遞資料

 接著在要使用的地方，先引入

 ```js
import { connect } from 'react-redux';
```


```js
// 選取你要的資料
const mapStateToProps = (store) => {
  return {
    todos: store.todos.todos
  }
}

//選取你要的方法
const mapDispatchToProps = (dispatch) => {
  return {
    addTodo: payload => dispatch(addTodo(payload))//前面的 addTodo 是傳給 Function 的 Props 後面的 addTodo 是來自 actions
  }
}
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(你的 Function Component) //只要這樣就可以與你的 Redux 連接
```

這時你的 Function Component 就會接收到一個 addTodo 的 Props 然後去執行他並且傳入資訊。


