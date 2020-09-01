<?php
  require_once('conn.php');
?>
<!DOCTYPE html>

<html lang="en">
<head>
  <meta charset="utf-8">

  <title>Who'sBlog</title>
  <link rel="stylesheet" href="style.css">
  <link rel="stylesheet" href="https://necolas.github.io/normalize.css/8.0.1/normalize.css">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body>
 <div class="login__wrapper">
   <h2>Log In</h2>
   <?php 
     if (!empty($_GET['errCode'])) {
       $error = $_GET['errCode'];
       if($error === '1') {
        echo '<h2 class="error">' . '資料不齊全'. '</h2>';
      } else if ($error === '2') {
        echo '<h2 class="error">' . '帳號已被註冊'. '</h2>';
      }
     }
   ?>
   <form class="login__form" method="POST" action="handle_register.php">
     <div>USERNAME</div>
     <input class="username__input" name="username">
     <div>NICKNAME</div>
     <input class="nickname__input" name="nickname">
     <div>PASSWORD</div>
     <input class="password__input" type="password" name="password">
     <div class="form__btn">
       <input class="register-btn" type="submit" value="REGISTER">
       <a class="register-btn" href="login.php">Back to login</a>
     </div>
  </form>
</div>
</body>
</html>