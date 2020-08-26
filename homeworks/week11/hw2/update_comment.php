<?php
  session_start();
  require_once('conn.php');
  require_once('utils.php');
  
  $id = null;
  $username = null;
  if(!empty($_SESSION['username'])) {
    $username = $_SESSION['username'];
    $id = $_GET['id'];
  } else {
    header('Location: index.php');
    exit();
  }
 $sql = "SELECT * FROM ALAN_blog_comments WHERE id = ?";
 $stmt = $conn->prepare($sql); 
 $stmt->bind_param('i', $id);
 $result = $stmt->execute();
 if (!$result) {
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
  <script src="https://cdn.ckeditor.com/4.7.3/standard/ckeditor.js"></script>
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
        <li class="username"><?php echo '你好 ' . $username ?></li>
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
      <div class="form__wrapper">
        <p>編輯文章</p>
        <?php
          if (!empty($_GET['errCode'])) {
             $error = $_GET['errCode'];
              if($error === '1') {
                echo '<h2 class="error">' . '資料不齊全'. '</h2>';
                }
              }
        ?>
        <form class="add__form" method="POST" action="handle_update_comment.php">
        <div class="form__title"><input class="add__title" name="title"  value="<?php echo escape($row['title'])?>"></div>
        <textarea name="ckeditor"><?php echo escape($row['content'])?></textarea>
        <input type="hidden"  name ="id" value="<?php echo escape($id); ?> "/>
        <input type="hidden"  name ="page" value="<?php echo $_SERVER['HTTP_REFERER']; ?> "/>
        <div class="submit-btn"><input class="add_submit-btn" type="submit" value="修改文章"></div>
      </form>
      </div>
    </div>
  </main>
  <footer class="footer">
    <div class="footer__ltd">
      Copyright © 2020 Who's Blog All Rights Reserved.
    </div>
  </footer>
  <script>
  CKEDITOR.replace("ckeditor");
  </script>
</body>
</html>