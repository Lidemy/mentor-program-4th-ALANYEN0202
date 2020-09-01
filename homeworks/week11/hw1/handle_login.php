<?php
session_start();
require_once('conn.php');
require_once('utils.php');

if(
    empty($_POST['username']) ||
    empty($_POST['password'])
    ) {
    header('Location: login.php?errorCode=1');
    die('資料不齊全');
};

$username = $_POST['username'];
$password = $_POST['password'];
$sql ="SELECT * FROM ALAN_users where username = ?";
$stmt = $conn->prepare($sql);
$stmt->bind_param('s', $username);
$result = $stmt->execute();
if (!$result) {   //有無執行成功
  die($conn->error);
}

$result = $stmt->get_result(); //拿取資料
if ($result->num_rows === 0 ) {
  header("Location: login.php?errorCode=2"); //查無使用者
  exit();
}

$row = $result->fetch_assoc();
if (password_verify($password, $row['password'])) {
  //登入成功
  $_SESSION['username'] = $username;
  header("Location: index.php");
} else {
  header("Location: login.php?errorCode=2");
}

?>