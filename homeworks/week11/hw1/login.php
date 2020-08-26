<!DOCTYPE html>

<html lang="en">
<head>
  <meta charset="utf-8">

  <title>登入</title>
  <link rel="stylesheet" href="style.css">
</head>
<body>
  <header class="warning">
    <strong>注意！本站為練習用網站，因教學用途刻意忽略資安的實作，註冊時請勿使用任何真實的帳號或密碼。</strong>
  </header>
  <main class="wrapper">
    <div class="comments__header">
      <div class="comments__res">
        <a class="res__btn" href="index.php">回留言板</a>
        <a class="res__btn" href="register.php">註冊</a>
      </div>
      <div class="comments__title">
        <h1>登入</h1>
        <?php
        if(!empty($_GET['errorCode'])) {
            $error = $_GET['errorCode'];
            if($error === '1') {
              echo '<h2 class="error">' . '資料不齊全'. '</h2>';
            } else if ($error === '2') {
              echo '<h2 class="error">' . '帳號或密碼輸入錯誤'. '</h2>';
            }
        }
        ?>
      </div>
      <form class="comments__new-form" method="POST" action="handle_login.php">
      <div class="comments__nickname" name="nickname">
          帳號 : <input class="username__input" name = "username"/>
      </div>
      <div class="comments__nickname" name="nickname">
          密碼 : <input type= "password" class="password__input" name = "password"/>
      </div>
      <input class="comment__submit-btn" type="submit">
      </form>
      <div class="comment__hr"></div>
    </div>
</main>
</body>
</html>