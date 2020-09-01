<?php
session_start();
require_once('conn.php');

if(empty($_GET['id'])) {
    header('Location: index.php');
    die('資料不齊全');
};

if(!empty($_SESSION['username'])) {
    $username = $_SESSION['username'];
  } else {
    header('Location: index.php');
    exit();
  }
  
$id = $_GET['id'];

$sql ="UPDATE ALAN_blog_comments SET is_deleted = 1 WHERE id = ? AND username = ?";
$stmt = $conn->prepare($sql);
$stmt -> bind_param('is', $id, $username);
$result = $stmt->execute();

if(!$result) {
    die($conn->error);
}

header("Location: index.php");
?>