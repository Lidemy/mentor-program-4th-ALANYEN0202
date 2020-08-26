<?php
  require_once('conn.php');

  $sql = "SELECT * FROM ALAN_blog_comments";
  $stmt = $conn->prepare($sql);
  $result = $stmt->execute();
  if(!$result) {
    die($conn->error);
  }
$result = $stmt->get_result();
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
     echo '<h2 class="error">' . '帳號或密碼錯誤'. '</h2>';
   }
  }
   ?>
   <form class="login__form" method="POST" action="handle_login.php">
     <div>USERNAME</div>
     <input class="username__input" name="username">
     <div>PASSWORD</div>
     <input class="password__input" type="password" name="password">
     <div class="form__btn">
       <input class="login__submit-btn" type="submit" value="SIGN IN">
       <a class="register-btn" href="register.php">REGISTER</a>
     </div>
  </form>
</div>
</body>
</html>