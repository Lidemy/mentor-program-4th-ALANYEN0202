<?php
require_once('conn.php');

function getUsersFromUsername($username) {
  global $conn;

  $sql = sprintf("SELECT * FROM ALAN_users WHERE username = '%s'", 
  $username);
  $result = $conn->query($sql);
  $row = $result->fetch_assoc();
  return $row;
}
?>