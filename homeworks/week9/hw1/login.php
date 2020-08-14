<?php
  require_once('conn.php');

  $result = $conn->query("SELECT * FROM ALAN_comments ORDER BY id DESC");
  if(empty($result)) {
    die($conn->error);
  }
?>
<!DOCTYPE html>

<html lang="en">
<head>
  <meta charset="utf-8">
  <title>留言板</title>
  <link rel="stylesheet" href="style.css">
</head>

<body>
  <header>
    <div class="waring">
      <strong>注意 ! 本站為練習用網站，因教學用途刻意忽略資安的實作，註冊時請勿使用任何真實的帳號或密碼。</strong>
    </div>
  </header>
  <div class="wrapper">
    <main>
   <a class="input-btn"  href="index.php">首頁</a>
   <a class="input-btn"  href="register.php">註冊</a>
    <h1>登入頁面</h1>
    <?php
      if (!empty($_GET['errCode'])) {
        $error = $_GET['errCode'];
        if ($error === '1') {
          echo "<h2 class='err'>" . "請註冊~" . "</h2>";
        } else if($error === '2') {
          echo "<h2 class='err'>" . "密碼或帳號輸入錯誤" . "</h2>";
        }
      }
    ?>
    <form class="form_comment" method="POST" action="handle_login.php">
      <div class="header__post">
        <div class="form__info">帳號 : <input name="username"/></div>
        <div class="form__info">密碼 : <input name="password" type="password"/></div>
      </div>
    <input  class="input-btn" type="submit"/>
    </form>
    </main>
  </div>
</body>
</html>