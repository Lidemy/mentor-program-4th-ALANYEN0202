<?php
  session_start();
  require_once('conn.php');
  require_once('utils.php');

  $username = null;
  if(!empty($_SESSION['username'])) {
    $username = $_SESSION['username'];
  }

  $item_per_page = 5;
  $page = 1;
  if (!empty($_GET['page'])) {
  $page = $_GET['page'];
  }
  $offset = ($page - 1) * $item_per_page;

  $sql = "SELECT * FROM ALAN_blog_comments WHERE is_deleted IS NULL ORDER BY id DESC LIMIT ? OFFSET ?";
  $stmt = $conn->prepare($sql);
  $stmt->bind_param('ii', $item_per_page, $offset);
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
      <?php while($row = $result->fetch_assoc()) { ?>
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
        <?php echo mb_substr($row['content'], 0, 500)?>
        </div>
          <a class="read__more-btn"href = "post.php?id=<?php echo escape($row['id'])?>">READ MODE</a>
      </div>
      <?php } ?>
      <?php 
    $sql = "SELECT count(id) as count FROM ALAN_blog_comments WHERE is_deleted IS NULL";
    $stmt = $conn->prepare($sql);
    $result = $stmt->execute();
    $result = $stmt->get_result();
    $row = $result->fetch_assoc();
    $count =  $row['count'];
    $total_page = ceil($count/$item_per_page);
  ?>
  <div class="comment__hr"></div>
  <div class="page__wrapper">
    <div class="page__info">
      <span>總共有  <?php echo $count ?> 篇文章，頁數 :</span>
      <span><?php echo $page ?>/<?php echo $total_page?></span>
    </div>
    <div class="page__btn">
    <?php if ($page != 1) { ?>
    <a href="index.php?page=1">首頁</a>
    <a href="index.php?page=<?php echo ($page - 1)?>">上一頁</a>
    <?php } ?>
    <?php if ($page != $total_page) { ?>
    <a href="index.php?page=<?php echo ($page + 1)?>">下一頁</a>
    <a href="index.php?page=<?php echo $total_page?>">最後一頁</a>
    <?php } ?>
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