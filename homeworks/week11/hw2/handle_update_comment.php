<?php
session_start();
require_once('conn.php');
require_once('utils.php');

$page = $_POST['page'];

if(
    empty($_POST['ckeditor']) ||
    empty($_POST['title'])  ||
    empty($_POST['id'])
    ) {
    header('Location:' . $page);
    die('資料不齊全');
};

$id = $_POST['id'];
$content = $_POST['ckeditor'];
$username = $_SESSION['username'];
$title = $_POST['title'];

$sql ="UPDATE ALAN_blog_comments SET content = ?, title = ? WHERE id = ? AND username = ?";
$stmt = $conn->prepare($sql);
$stmt -> bind_param('ssis', $content, $title, $id, $username);
$result = $stmt->execute();


if(!$result) {
    die($conn->error);
}

header('Location:' . $page);
?>