<?php
session_start();
require_once('conn.php');
require_once('utils.php');

if(empty($_POST['content'])) {
    header('Location: update_comment.php?errorCode=1&id=' . $_POST['id']);
    die('資料不齊全');
};

$id = $_POST['id'];
$content = $_POST['content'];
$username = $_SESSION['username'];
$role = getRoleFromUsername($username);

if ($role['role'] === 2 ) {
  $sql ="UPDATE ALAN_comments SET content = ? WHERE id = ? ";
  $stmt = $conn->prepare($sql);
  $stmt -> bind_param('si', $content, $id);
  $result = $stmt->execute();
  if(!$result) {
    die($conn->error);
}
  header("Location: index.php");
} 

$sql ="UPDATE ALAN_comments SET content = ? WHERE id = ? AND username = ?";
$stmt = $conn->prepare($sql);
$stmt -> bind_param('sis', $content, $id, $username);
$result = $stmt->execute();


if(!$result) {
    die($conn->error);
}

header("Location: index.php");
?>