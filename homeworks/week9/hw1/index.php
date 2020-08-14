<?php
  session_start();
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
   <?php 
     if (empty($_SESSION['username'])) { 
   ?>
   <a class="input-btn"  href="register.php">註冊</a>
   <a class="input-btn"  href="login.php">登入</a>
   <?php } else { ?>
    <a class="input-btn"  href="logout.php">登出</a>
    <h2>Hello~<?php echo $_SESSION['username']?></h2>
    <h1>Comments</h1>
   <?php }?>
    <?php
      if (!empty($_GET['errCode'])) {
        $error = $_GET['errCode'];
        if ($error === '1') {
            echo "<h2 class='err'>" . "資料不齊全" . "</h2>";
        }
      }
    ?>
     <?php if (!empty($_SESSION['username'])) { ?>
    <form class="form_comment" method="POST" action="handle_add.php">
      <div class="header__post">
        <textarea class="textarea" row="5" name="content"></textarea>
      </div>
    <input  class="input-btn" type="submit"/>
    </form>
     <?php } else {?>
      <h2>請註冊登入留言~</h2>
     <?php }?>
    <div class="hr"></div>
    </main>
    <section class="contents">
      <?php while($row = $result->fetch_assoc()) { ?>
      <div class="card">
        <div class="avatar"></div>
        <div class="card__info">
            <div class="card__time">
              <p class="nickname"><?php echo htmlspecialchars($row['nickname']) ?></p>
              <p class="time"><?php echo $row['create_at']?></p>
            </div>
            <div class="card__text">
            <span><?php echo htmlspecialchars($row['content'])?></span>
            </div>
        </div>
      </div>
      <?php }?>
    </section>
  </div>
</body>
</html>