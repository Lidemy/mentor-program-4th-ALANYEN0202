<?php 
require_once('conn.php');

function escape ($str) {
  return htmlspecialchars($str);
}

function getUserFromUsername($username) {
    global $conn;
      
    $sql ="SELECT * FROM ALAN_users WHERE username =?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param('s', $username);
    $result = $stmt->execute();
    if(!$result) {
      die($conn->error);
    }
    $result = $stmt->get_result();
    $row=$result->fetch_assoc();
    return $row;
}

function getRoleFromUsername($username) {
    global $conn;

    $sql = "SELECT role FROM ALAN_users WHERE username = ?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param('s', $username);
    $results = $stmt->execute();
    if(!$results) {
      die($conn->error);
    }
    $results = $stmt->get_result();
    $rows = $results->fetch_assoc();
    return $rows;
}
?>