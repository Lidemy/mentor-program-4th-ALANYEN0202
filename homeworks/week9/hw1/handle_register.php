<?php
require_once('conn.php');

if (empty($_POST['password']) || empty($_POST['nickname']) || empty($_POST['username']) ) {
  header('Location: register.php?errCode=1');
  return;
}

$username = $_POST['username'];
$password = $_POST['password'];
$nickname = $_POST['nickname'];

$sql = sprintf("INSERT INTO users(username, password, nickname) values('%s', '%s', '%s')"
,$username, $password, $nickname, );

$result = $conn->query($sql);

if (!$result) {
  die($conn->error);
}

header('Location: index.php');
?>