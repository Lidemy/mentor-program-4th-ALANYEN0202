<?php
session_start();
require_once('conn.php');

if (empty($_POST['password']) || empty($_POST['username']) ) {
  header('Location: login.php?errCode=1');
  return;
}

$username = $_POST['username'];
$password = $_POST['password'];

$sql = sprintf("SELECT * FROM users WHERE username='%s' AND password='%s'"
,$username, $password);

$result = $conn->query($sql);

if (!$result) {
  die($conn->error);
}
if ($result->num_rows) {
  // 登入成功
  $_SESSION['username'] = $username;
  header("Location: index.php");
} else {
  header("Location: login.php?errCode=2");
}
?>