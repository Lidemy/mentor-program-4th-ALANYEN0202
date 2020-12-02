## 請列出 React 內建的所有 hook，並大概講解功能是什麼
### 基礎的 Hook

* useState : 

存放資料的地方，要注意的是要更改資料時不能直接更改資料本身，可藉由 Hook 提供的第二個函式來更改，並且 useState括號裡面為初始值。

範例：
`const [user, setUser] = useState("");` ( 預設為字串 )

* useEffect:

可以想成畫面都渲染完之後要做什麼事情可以寫在裡面，要注意的是第二個參數傳的是[ 依屬 ] 也就是當依屬改變時，會再重新呼叫這個 Hook，搭配第二個參數可以做出很多組合，例如可以把第二個參數設為 [] 如此一來只有第一次渲染完網頁才會執行，useEffect 裡面可以 return 一個函式，叫做 clean up function ，當重新呼叫 useEffect 時，它會先清除再執行，而這個 clean up function 就是讓你在清除前可以做什麼這樣。

範例：
```js
useEffect(() => { // 只執行第一次的函式，第二個參數為一個空陣列
  fetch(BASE_API)
  .then(res => res.json())....
},[])

useEffect(() => {  
  // 當 todo 改變會再重新呼叫這個 函式
},[todo])

useEffect(() => {  
  // 當 todo 改變會再重新呼叫這個 函式
  return () => {
    // 當重新呼叫時，會先清除舊的 useEffect，清除前會先在這裡執行事情。
  }
},[todo])

```
* useContext: 

需搭配  createContext 來使用，簡易來說就是可以讓你把資料往下傳，底下的任意子層可以接收到，如此一來不用一層一層的往下傳遞。

範例: 
```js
const AuthContext = createContext(null) // 先創建要傳遞的資料，( 裡面是初始值 )

<AuthContext.Provider value={/*要傳下去的東西*/}>
<子層>
<子層>
<AuthContext.Provider />

```
如此一來被包住的所有子層都可以接收得到 value 的資料，當子層需要資料時:

`const data = useContext(AuthContext)`

data 就是你所傳遞的資料了。


#### 額外的 Hook

* useReducer:

這個 Hook 還沒有使用到，看官方說明是 useState 的加強版的感覺 ? 似乎跟下一週的 Redux 相似，應該是當 state 變得複雜且需要互相依賴時使用。

* useCallback:

可以把函式記住，跟 useEffect 很像，當第二個[ 依屬 ]改變時，會再改變一次函式，不然的話就會呼叫同一個函式，可以減少 render 次數優化效能。

範例: 
```js
const Component = useCallBack(() => {
  //doSomethiing
},[依屬])
```

* useMemo:

給資料使用的 Hook，用來記憶資料如果資料不變就不會再 render 一次而是會用同一個資料。通常用於複雜的計算時，如果值沒改變就不要再重新計算之類的。
範例: 

```js
const data = useMemo(() => {
  return(
    color: value? "red":"blue",
  )
},[value])
```

* memo: 

包住一個 Component ，React 會自動偵測 Component 的 props 如果都沒改變，就不會 re-render，而是用同一次的 Component 。

要注意的是 memo 是包住一個 component 得，useMemo 是一個函式然後回傳你想要的資料。

```js
const Component = memo(/*要記憶的Component*/)
```
* useRef:

感覺也是像記憶住一個東西，裡面的值要用 .current來拿取。
```js
const id = useRef(1);
id = id.current //id = 1
```
* useImperativeHandle：

看了官方跟同學作業的解釋還是矇矇懂懂...應該是自定義的 ref 可以往上傳給父層使得父層讀取得到之類的。
* useLayoutEffect: 

與 useEffect 相似，最大的不同在於會在 DOM 改變後"同步" 調用並更新 render，並且會在瀏覽器繪製之前發生，應此會阻礙畫面更新，因為要等它更新完畫面才會更新。
* useDebugValue:

也是不太知道是什麼，看官方解說為`可以用來在 React DevTools 中顯示自定義 hook 的標籤。`
## 請列出 class component 的所有 lifecycle 的 method，並大概解釋觸發的時機點

分為三個階段 Mounting ( 繪製 )、 Updating ( 更新 )、Unmounting ( 清除 )

首先從 Mounting 開始：

先 Constructor 初始化，先決定資料初始值。

Render 開始繪製你所寫的東西

最後為 componentDidMount(): 也就是渲染完畫面要執行什麼事情 (跟 useEffect(() => {}, [])相似)

Updating 更新: 

shouldComponentUpdate(): 確定要更新嗎？ 預設為 true ， 如果為 false 將會跳過更新這部分的生命週期。

Render 更新畫面

更新完後執行 componentDidUpdate(preProps, prevState): 可以拿到前一次的 Props 跟前一次的 State。

Unmounting 清除:

componentWillUnmount(): 清除畫面前要做什麼事。

## 請問 class component 與 function component 的差別是什麼？
最大的不同在於 function component 每次渲染時都會重新再呼叫一次 function ，function component 裡的 Props 只會是當下的值( 閉包的概念 ) ，而 class component 會根據 this 來馬上更新最新的 this.props。

## uncontrolled 跟 controlled component 差在哪邊？要用的時候通常都是如何使用？

差別再於一個的值是被 state 監控得，一個則沒有。

用法 controlled:
```js
const [value, setValue] = useState("") // 初始化

const handleValueChange = (e) => {
  setValue(e.target.value);
} // 當有改變就會把 value 的值更新。
return <input value={value} onChange={handleValueChange} />  // input value 綁定，加上onChange 事件
```

uncontrolled 就跟之前的做法很像，當按送出時再利用 `document.querySelector()`來選到input 元素拿取裡面的值，不過在使用 React 的時候並不建議直接更改 DOM。

