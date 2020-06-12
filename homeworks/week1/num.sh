#!/bin/bash
# Program:
#       This program cread n個js檔案 in your directory
# History:
# 2020/06/12
PATH=/bin:/sbin:/usr/bin:/usr/sbin:/usr/local/bin:/usr/local/sbin:~/bin
export PATH
for((i = 1;i <= $1; i++))
do
	touch "${i}.js";
done
echo "檔案建立完成";
