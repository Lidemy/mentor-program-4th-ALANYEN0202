<?php 
session_start();
require_once('conn.php');
require_once('utils.php');


$username = null;
$user = null;
$role = null;
$id = $_GET['id'];
if(!empty($_SESSION['username'])) {
  $username = $_SESSION['username'];
  $user = getUserFromUsername($_SESSION['username']);
  $role = getRoleFromUsername($username);
}
$sql = "SELECT * FROM ALAN_comments WHERE id = ? ";
       
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

  <title>留言板</title>
  <link rel="stylesheet" href="style.css">
</head>
<body>
  <header class="warning">
    <strong>注意！本站為練習用網站，因教學用途刻意忽略資安的實作，註冊時請勿使用任何真實的帳號或密碼。</strong>
  </header>
  <main class="wrapper">
    <div class="comments__header">
      
      <div class="comments__title">
        <h1>編輯留言</h1>
        <?php
        if(!empty($_GET['errorCode'])) {
            $error = $_GET['errorCode'];
            if($error === '1') {
              echo '<h2 class="error">' . '資料不齊全'. '</h2>';
            }
        }
        ?>
      </div>

        <form class="comments__new-form" method="POST" action="handle_update_comment.php">
        <?php if ($role['role'] === 2 ) { ?>
        <textarea class="comments__text" rows="5" name="content"> <?php echo $row['content']?></textarea>
        <input type="hidden" name="id" value="<?php echo $row['id']?>"/>
        <input class="comment__submit-btn" type="submit">
        <?php } else if ($row['username'] === $username ) { ?>
          <textarea class="comments__text" rows="5" name="content"> <?php echo $row['content']?></textarea>
          <input type="hidden" name="id" value="<?php echo $row['id']?>"/>
          <input class="comment__submit-btn" type="submit">
        <?php } ?>
        </form>
      <div class="comment__hr"></div>
    </div>
</main>

</body>
</html>