<?php 
session_start();
require_once('conn.php');
require_once('utils.php');


$username = null;
$user = null;
$role = null;
if(!empty($_SESSION['username'])) {
  $username = $_SESSION['username'];
  $user = getUserFromUsername($_SESSION['username']);
  $role = getRoleFromUsername($username);
}

$item_per_page = 10;
$page = 1;
if (!empty($_GET['page'])) {
  $page = $_GET['page'];
}
$offset = ($page - 1) * $item_per_page;
$sql = "SELECT " .
       "C.id as id, C.content as content, " .
       "C.create_at as create_at, U.nickname as nickname, U.username as username " . 
       "FROM ALAN_comments as C " . 
       "LEFT JOIN ALAN_users as U ON C.username = U.username " . 
       "WHERE C.is_deleted IS NULL " .
       "ORDER BY C.id desc " . 
       "LIMIT ? OFFSET ?";
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

  <title>留言板</title>
  <link rel="stylesheet" href="style.css">
</head>
<body>
  <header class="warning">
    <strong>注意！本站為練習用網站，因教學用途刻意忽略資安的實作，註冊時請勿使用任何真實的帳號或密碼。</strong>
  </header>
  <main class="wrapper">
    <div class="comments__header">
      <div class="comments__res">
        <?php if (!$username) { ?>
          <a class="res__btn" href="register.php">註冊</a>
          <a class="res__btn" href="login.php">登入</a>
        <?php } else { ?>
          <a class="res__btn" href="logout.php">登出</a>
          <span class="update__btn res__btn">修改暱稱</span>
          <a class="res__btn" href="admin.php">管理後台</a>
          <form class="hide update__nickname comments__new-form" method="POST" action="handle_update_nickname.php">
            新暱稱 : <input type="text" class="new_nickname__btn" name="nickname"/>
            <input class="comment__submit-btn" type="submit"> 
          </form>
          <h3>你好<?php echo escape($user['nickname']); ?></h3>
        <?php } ?>
      </div>
      <div class="comments__title">
        <h1>Comments</h1>
        <?php
        if(!empty($_GET['errorCode'])) {
            $error = $_GET['errorCode'];
            if($error === '1') {
              echo '<h2 class="error">' . '資料不齊全'. '</h2>';
            }
        }
        ?>
      </div>
      <?php
        if($role) {
          if ($role['role'] !== 0 ) { ?>
        <form class="comments__new-form" method="POST" action="handle_add_post.php">
        <textarea class="comments__text" rows="5" name="content"></textarea>
        <input class="comment__submit-btn" type="submit">
        </form>
      <?php } else if ($role['role'] === 0) { ?> 
        <h3>你已被停權</h3>
      <?php } else { ?>
        <h3>請登入</h3>
      <?php } } ?>
      <div class="comment__hr"></div>
    </div>
  <section>
      <?php 
        while ($row = $result->fetch_assoc()) {
      ?>
    <div class="card">
      <div class="card__avatar">
      </div>
      <div class="card__body">
        <div class="card__info">
          <span class="card__author">
            <?php echo escape($row['nickname']) ?> (@<?php echo escape($row['username']) ?>)
          </span>
          <span class="card__time">
            <?php echo escape($row['create_at']) ?>
            <?php 
              if($role) {
                if ($role['role'] === 2 ) { 
            ?>
              <a href="update_comment.php?id=<?php echo escape($row['id'])?>">編輯</a>
              <a href="handle_deleted_comment.php?id=<?php echo escape($row['id'])?>">刪除</a>
            <?php } else if ($row['username'] === $username){ ?>
              <a href="update_comment.php?id=<?php echo escape($row['id'])?>">編輯</a>
              <a href="handle_deleted_comment.php?id=<?php echo escape($row['id'])?>">刪除</a>
            <?php } } ?>
          </span>
        </div>
        <p class="card__text"><?php echo escape($row['content']) ?></p>
      </div>
    </div>
        <?php }?>
  </section>
  <?php 
    $sql = "SELECT count(id) as count FROM comments WHERE is_deleted IS NULL";
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
      <span>總共有  <?php echo $count ?> 筆留言，頁數 :</span>
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
<script>
  var btn = document.querySelector('.update__btn')
  btn.addEventListener('click', (e) => {
    var form = document.querySelector('.update__nickname')
    form.classList.toggle('hide')
  })
</script>
</body>
</html>