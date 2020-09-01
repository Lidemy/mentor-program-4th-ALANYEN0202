<?php
session_start();
require_once('conn.php');

if(
    empty($_POST['nickname']) || 
    empty($_POST['username']) ||
    empty($_POST['password'])
    ) {
    header('Location: register.php?errorCode=1');
    die('資料不齊全');
};

$role = 1;
$nickname = $_POST['nickname'];
$username = $_POST['username'];
$passhash = password_hash($_POST['password'], PASSWORD_DEFAULT);
$sql ="INSERT INTO ALAN_users(nickname, username, password, role) values(?, ?, ?, ?)";
$stmt = $conn->prepare($sql);
$stmt->bind_param('sssi', $nickname, $username, $passhash, $role);
$result = $stmt->execute();
if(!$result) {
    $code = $conn->errno;
    if($code === 1062) {
      header('Location: register.php?errorCode=2');
    }
    die($conn->error);
}
$_SESSION['username'] = $username;
header("Location: index.php");
?>