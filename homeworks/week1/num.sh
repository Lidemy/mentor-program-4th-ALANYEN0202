#!/bin/bash
# Program:
#       This program cread n個js檔案 in your directory
# History:
# 2020/06/12

for((i = 1;i <= $1; i++))
do
	touch "${i}.js";
done
echo "檔案建立完成";
