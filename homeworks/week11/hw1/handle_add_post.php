<?php
session_start();
require_once('conn.php');
require_once('utils.php');

if(empty($_POST['content'])) {
    header('Location: index.php?errorCode=1');
    die('資料不齊全');
};

$username = $_SESSION['username'];

$content =$_POST['content'];
$sql ="INSERT INTO ALAN_comments(username, content) values(?, ?)";
$stmt = $conn->prepare($sql);
$stmt -> bind_param('ss', $username, $content);
$result = $stmt->execute();


if(!$result) {
    die($conn->error);
}

header("Location: index.php");
?>