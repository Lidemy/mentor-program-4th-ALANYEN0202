<?php
session_start();
require_once('conn.php');
require_once('utils.php');

if (empty($_POST['content'])) {
  header('Location: index.php?errCode=1');
  return;
}

$content = $_POST['content'];
$user = getUsersFromUsername($_SESSION['username']);
$nickname=$user['nickname'];

$sql = sprintf("INSERT INTO ALAN_comments(nickname, content) values('%s', '%s')",$nickname, $content);

$result = $conn->query($sql);

if (!$result) {
  die($conn->error);
}

header('Location: index.php');
?>