<?php
  session_start();
  require_once('conn.php');
  require_once('utils.php');

  $username = null;
  if(!empty($_SESSION['username'])) {
    $username = $_SESSION['username'];
  }

  $id = null;
  if (!empty($_GET['id'])) {
    $id = $_GET['id'];
  } else {
    header('Location: index.php');
    exit();
  }
  $sql = "SELECT * FROM ALAN_blog_comments WHERE id = ?";
  $stmt = $conn->prepare($sql);
  $stmt->bind_param('i', $id);
  $result = $stmt->execute();
  if(!$result) {
    die($conn->error);
  }
$result = $stmt->get_result();
$row = $result->fetch_assoc();
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
  <nav class="navbar">
    <div class="navbar__title">
      <a class="title" href="index.php">Who's Blog</a>
      <ul class="navbar__list">
        <li><a href="index.php">文章列表</a></li>
        <li><a href="#">關於我</a></li>
      </ul>
    </div>
    <div class="navbar__admin">
      <ul class="navbar__list">
      <?php if (!$username) { ?>
        <li><a href="login.php">登入</a></li>
      <?php } else { ?>
        <li class="username"><?php echo '你好 ' . escape($username) ?></li>
        <li><a href="admin.php">管理後台</a></li>
        <li><a href="logout.php">登出</a></li>
      <?php } ?>
      </ul>
    </div>
  </nav>
  <div class="banner">
    <div class="banner__title">
      <div class="banner__text">存放技術之地</div>
      <p class="banner__intr">Welcome to my blog</p>
    </div>
  </div>
  <main class="main__article">
    <div class="wrapper">
      <div class="article">
        <div class="article__info">
          <div class="article__title"><?php echo escape($row['title'])?></div>
          <?php if ($row['username'] === $username) { ?>
            <div>
              <a href="update_comment.php?id=<?php echo escape($row['id'])?>">編輯</a>
              <a href="handle_deleted_comment.php?id=<?php echo escape($row['id'])?>">刪除</a>
            </div>
          <?php }?> 
        </div>
        <div class="article__time">
        <img src="./picture/watch-later-24-px.png"/><span><?php echo escape($row['created_at'])?></span><span><img src="./picture/folder-24-px.png"/></span><span>歷史公告</span>
        </div>
          <div class="para">
           <?php echo $row['content']?>
        </div>
      </div>
  </main>
  <footer class="footer">
    <div class="footer__ltd">
      Copyright © 2020 Who's Blog All Rights Reserved.
    </div>
  </footer>
</body>
</html>