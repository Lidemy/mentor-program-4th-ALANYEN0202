## 交作業流程

1. 新開一個 branch : git branch hw1
2. 切換到該 branch : git branch checkout hw1
3. 寫作業到各個對應的檔案
4. 如果新增檔案記得要加入控制 : git add ..
5. 並且 commit : git commit -am 'addnewfile'
6. 全部都寫完了之後，自我檢查也沒問題，push到遠端 ( Github ) : git push oringin hw1
7. 把 PR (Pull request) 連結貼到作業列表的新增作業上面

助教改完 Merge (合併) 之後 :

1. 切換到 master : git checkout master
2. 把遠端最新的進度來回來本地端更新 : git  pull oringin master
3. 把分支刪除 : git branch -d hw1

