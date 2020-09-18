主要前面申請主機被建制環境都是根據這位前輩
[部署 AWS EC2 遠端主機 + Ubuntu LAMP 環境 + phpmyadmin](https://github.com/Lidemy/mentor-program-2nd-yuchun33/issues/15)

我跟著一步步來到了使用 CLI 來連線主機時
`$ ssh -i 下載的金鑰檔案的路徑 ubuntu@IPv4`
這邊＠後面的 IPv4 在 aws 

出現了第一個錯誤
```
@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
@ WARNING: UNPROTECTED PRIVATE KEY FILE! @
@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
Permissions 0755 for private key file are too open.
It is recommended that your private key files are NOT accessible by others.
This private key will be ignored.
```
上網查了一下，找到這篇 [解決ssh連線時 unprotected private key file 問題](http://wallyjue.blogspot.com/2008/08/ssh-unprotected-private-key-file.html)

簡單來說就是把 AWS 給你的金鑰檔案搬來搬去導致權限被更動，變的過於公開很危險？
輸入指令改回權限

`chmod 0600 [private key file]` 
ex : `chmod 0600 Users/yanyulun/aws/alan.pem`

在登入一次就可以了！
這時已經進入主機了會看到畫面是這樣![](https://static.coderbridge.com/img/ALANYEN0202/805c325ff5074f4c8b4f849e0f54fd04.png)

放大一點～抱歉![](https://static.coderbridge.com/img/ALANYEN0202/f6910de64ed24835b31037df61688784.png)

會看到開頭是 ubuntu 就代表連線成功囉～

現在我們已經在遠端主機上了，接著再設定 LAMP ( Linux Apache MySQL PHP )

更新 ubuntu 系統 

`sudo apt update && sudo apt upgrade && sudo apt dist-upgrade`

問是否下載？
輸入 `y`

安裝 Tasksel

`sudo apt install tasksel`

問是否下載？
輸入 `y`

用 Tasksel 下載 lamp-server

`sudo tasksel install lamp-server`

會跑一個下載的紫色框

下載 phpmyadmin

`sudo apt install phpmyadmin`

** 記得連接 apache2（要按空白鍵，有顯示＊字號) **
如圖示![](https://static.coderbridge.com/img/ALANYEN0202/cd6487063055483085ed14002fe84e8e.png)

圖片來源 [部署 AWS EC2 遠端主機 + Ubuntu LAMP 環境 + phpmyadmin](https://github.com/Lidemy/mentor-program-2nd-yuchun33/issues/15)

是否設定 dbconfig-common
輸入 `y`

設定密碼

改變 phpmyadmin 登入的設定，改成可以用密碼登入

`sudo mysql -u root mysql`

進入 sql 指令

`UPDATE user SET plugin='mysql_native_password' WHERE User='root';`
`FLUSH PRIVILEGES;`

離開 sql 指令

`exit`

設定 root 的密碼

`sudo mysql_secure_installation`

選擇密碼強度後設定密碼
是否設定密碼？  `y`
選擇密碼強度 `0或1或2`  0 => 長度只需大於 8 ， 1 => 長度大於 8 需有數字、英文大小寫以及特殊字符， 2 => 跟 1 一樣，不過要符合字典符

輸入符合規定的密碼 
確定設這個密碼嗎
幾個設定的問題都可以選 `yes`
最後會出現 All Done!

接著只要在 IPv4/phpmyadmin 就可以看到 phpmyadmin 了！
帳號： root
密碼：剛剛設定的密碼。

到這邊我只是照著文章的指令來一步步部署，應該是不會遇到什麼問題～
接下來就比較是屬於我自己的部分了。

首先我要申請一個域名，我是在 Namecheap 申請的。
先輸入妳有興趣的名稱
![](https://static.coderbridge.com/img/ALANYEN0202/f8f2cf93e9224ceea201e26b30487396.png)
就會列出目前有沒有人註冊，一年多少錢之類的，然後點選加入購物車。
接著結帳，輸入信用卡資訊，接著來到會員管理後台，點選 Domain List 會看到你買的網域![](https://static.coderbridge.com/img/ALANYEN0202/6411cd3ff6264448818b34af0d43efed.png)
點選旁邊的 MANGE，接著這邊先放一邊，因為我們要先去 AWS 主機取得妳的 IVP4 的路經來指向你的 網域 ( DNS )

另開一個網頁，先登入 AWS ，搜尋 Route 53 
![](https://static.coderbridge.com/img/ALANYEN0202/735608f6ac8a43a4a29e2cb31deb018e.png)

點託管區域 
![](https://static.coderbridge.com/img/ALANYEN0202/cea15f80dd0048d1bd6fb2d84af66b71.png)

按建立託管區域

![](https://static.coderbridge.com/img/ALANYEN0202/898c6faecf5f430f9d695f7a8cec341d.png)

在妳得網域名稱輸入你申請的網域名稱，接著按建立託管區域。

![](https://static.coderbridge.com/img/ALANYEN0202/c8acc12efe7b4556bdc26acec1b60da7.png)

接著再按一次建立紀錄，選擇簡單路由

![](https://static.coderbridge.com/img/ALANYEN0202/b66f999db8ba4267bf622d00543e1e19.png)

按定義簡易紀錄，選擇端點，選第一個![](https://static.coderbridge.com/img/ALANYEN0202/b97758699c754bfb9463d104dd15dbda.png)

紀錄類型就照預設的 A 紀錄類型，接著建立。

完成之後回到剛剛妳建立好紀錄的網域，可以看到有三個紀錄，把第二項類型為 ns 的值記下來![](https://static.coderbridge.com/img/ALANYEN0202/f4001e93553545fd96a44ff9cf3027f9.png)

記下來之後，回到剛剛 Namecheap 網頁裡，找到 NANESERVERS 點選 Custom DNS 把剛剛在 aws 紀錄的值貼上。![](https://static.coderbridge.com/img/ALANYEN0202/ea9831eb997a4de892175660388cd529.png)

這樣就完成了！ 過一會兒  ( 5~15 分鐘左右) 輸入你的網域就可以看到你的網頁了！

接著是如何上傳作業，我是利用 FileZilla 連線來上傳檔案，連線教學主要來自這篇
[[AWS] 透過 FileZilla 使用 key-pairs 登入 AWS EC2 存取檔案](http://www.jysblog.com/coding/web/aws-%E9%80%8F%E9%81%8E-filezilla-%E4%BD%BF%E7%94%A8-key-pairs-%E7%99%BB%E5%85%A5-aws-ec2-%E5%AD%98%E5%8F%96%E6%AA%94%E6%A1%88/)
主要按照文章教學就沒問題了，主要重點為
一、先去主選單 => 編輯 => 設定 => SFTP => 導入你的金鑰檔案 (.pem)
二、新增站台
三、設定站台 協定 => SFTP; 主機 => 你的 ip; 登入形式 => 一般; 使用者； ubuntu;
接著連線成功後，請先連線遠端主機 ubuntu 設定權限
`sudo chown ubuntu /var/www/html`
意思是可以讓 ubuntu 使用者來更動資料夾底下的權限

接著上傳成功後，在 IPv4/資料夾名稱就可以看到自己的檔案內容了！ ( 從/var/www/html 後面開始輸入即可 )

附註：如果你的 phpmyadmin 出現這個錯誤 `count(): Parameter must be an array or an object that implements Countable`

我是參考這篇文章[Install phpMyAdmin on Ubuntu](https://blog.johnsonlu.org/install-phpmyadmin-on-ubuntu/)

第一步
輸入指令
`sudo vim /usr/share/phpmyadmin/libraries/plugin_interface.lib.php`
將#551(551行)
`count($options) > 0 拔除`
變成
```
if ($options != null ) {
    // …..
}
```

第二步
輸入指令
`sudo pico /usr/share/phpmyadmin/libraries/sql.lib.php`
將#613(613行)
```
(count($analyzed_sql_results['select_expr'] == 1)
```
修改成
```
((count($analyzed_sql_results['select_expr']) == 1)

```
多幾個括號而已，要小心看仔細～我第一次沒看好又重弄一段時間...orz

附註：
其實都照著學長姐來一步步部署不會太過困難，只能說一開始的人好厲害，我們後面只是照學而已，我這心得文只是把我的心得文章複製過來而已...我也很不會寫文章..QQ  屬於自己來的部分應該是用 FileZilla 來上傳檔案，因為看學長姐是用 git clone 來下載，很怕一次全下載到主機...才想說用 FileZilla 來上傳就可以上傳想上傳的檔案就好，是不知道會不會其實用 CLI 比較好？ 不過後來想到也可以例外整理一個想上傳的資料夾上傳到 github 然後再連到主機再用 git clone 應該也行，不過想著覺得有點麻煩，還是比較喜歡用 FileZilla 上傳。

全部資料參考來源：

部署 AWS EC2 遠端主機 + Ubuntu LAMP 環境 + phpmyadmin](https://github.com/Lidemy/mentor-program-2nd-yuchun33/issues/15)

[解決ssh連線時 unprotected private key file 問題](http://wallyjue.blogspot.com/2008/08/ssh-unprotected-private-key-file.html)

[部署 AWS EC2 遠端主機 + Ubuntu LAMP 環境 + phpmyadmin](https://github.com/Lidemy/mentor-program-2nd-yuchun33/issues/15)

[Install phpMyAdmin on Ubuntu](https://blog.johnsonlu.org/install-phpmyadmin-on-ubuntu/)

[我的心得文：簡易部署 AWS EC2 遠端主機 + Ubuntu LAMP 環境 + phpmyadmin ＋FileZilla上傳檔案 ＋遇到問題](https://www.coderbridge.com/@ALANYEN0202/d87b112bd5eb4f9ba1bcbd44cd627c3a)
