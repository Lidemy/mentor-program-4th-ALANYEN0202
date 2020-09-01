<?php
session_start();
require_once('conn.php');
require_once('utils.php');


$id = $_GET['id'];
$role = $_GET['role'];
$username = $_SESSION['username'];

$sql ="UPDATE ALAN_users SET role = ? WHERE id = ? ";
$stmt = $conn->prepare($sql);
$stmt->bind_param('si', $role, $id);
$result = $stmt->execute();


if(!$result) {
    die($conn->error);
}
header('Location:admin.php');
?>