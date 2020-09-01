<?php 
session_start();
require_once('conn.php');
require_once('utils.php');


$username = null;
$user = null;
if(!empty($_SESSION['username'])) {
  $username = $_SESSION['username'];
  $user = getUserFromUsername($_SESSION['username']);
}

$sql = "SELECT * FROM ALAN_users  ";
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
        <a class="res__btn" href="index.php">回留言板</a>
        <a class="res__btn" href="logout.php">登出</a>
        <h3>你好<?php echo escape($user['username']) ?></h3>
      </div>
      <div class="comments__title">
        <h1>管理後台</h1>
        <?php
          $rows = getRoleFromUsername($username);
        ?>
        <?php if ($rows['role'] === 'admin' ) { ?>
       <table rules="all" cellpadding='5'>
         <tr>
           <td>帳號</td>
           <td>綽號</td>
           <td>創建時間</td>
           <td>身份</td>
           <td>管理員</td>
           <td>一般使用者</td>
           <td>停權者</td>
         </tr>
         <?php while($row=$result->fetch_assoc()) { 
           $role = null;
           $id = $row['id'];
           if($row['role'] === 'banned') {
             $role = '停權使用者';
           } else if ($row['role'] === 'normal') {
             $role = '一般使用者';
           } else if($row['role'] === 'admin'){
             $role = '管理員';
           }
           if ($row['username'] !== $username ) {
           ?>
         <tr>
           <td><?php echo escape($row['username']) ?></td>
           <td><?php echo escape($row['nickname']) ?></td>
           <td><?php echo escape($row['create_at']) ?></td>
           <td><?php echo escape($role) ?></td>
           <td><a class="admin-btn" href="handle_update_admin.php?id=<?php echo escape($id)?>&role=admin">管理員</a></td>
           <td><a class="admin-btn" href="handle_update_admin.php?id=<?php echo escape($id)?>&role=normal">一般使用者</a></td>
           <td><a class="admin-btn" href="handle_update_admin.php?id=<?php echo escape($id)?>&role=banned">停權使用者</a></td>
         </tr>
         <?php }} ?>
           <?php } else { 
             header('Location: index.php');
           }
           ?>
       </table>
      </div>
      <div class="comment__hr"></div>
    </div> 
</main>

</body>
</html>