#!/bin/bash
# Program:
#       This program catch and print your introduction
# History:
# 2020/06/14

curl https://api.github.com/users/$1|grep -E "name|bio|location|blog"|sed "5d"|cut -d ":" -f 1 --complement| sed 's/"//g'|sed  's/.$//' 

# 先使用 curl 抓取網頁資料，這邊要注意的是使用 $1 讓使用扯可以輸入 ID 來搜尋該網頁
# 使用 grep 抓取特定關鍵字，這邊要注意的是使用 -E "字串1|字串2" 來一次搜尋多個字串
# 最後使用 sed 來擷取資料，由於使用 grep 也搜尋到了第五行的 twitter_username ，先用 sed "5d" 刪除第五行
# cut -d "分隔符" 也就是使用 ":"來區分該列字串 -f 1 -- complement 顯示除了使用 ":" 分隔的第一行以外的字串
# sed 's/舊字串/新字串/g' 讓 " 替換成空白，sed's/.$//' 刪除最後一個字元，也就是" ，"
# 不過如果要排序的話，應該 grep 變成要一行一行抓取，或是還有排序行的指令? 這部分可能要再研究一下。