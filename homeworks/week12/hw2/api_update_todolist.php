<?php
require_once('conn.php');
require_once('utils.php');
header('Content-type:application/json;charset=utf-8');
header('Access-Control-Allow-Origin: *');


if (
  empty($_POST['json_str']) ||
  empty($_POST['list_id'])
  ) {
   json(false, '代辦事項是空的唷');
  };

$json_str = $_POST['json_str'];
$list_id = $_POST['list_id'];
$sql = 'update ALAN_todolist set json_str = ? where list_id = ?';
$stmt = $conn->prepare($sql);
$stmt->bind_param('si', $json_str, $list_id);
$result = $stmt->execute();
if (!$result) {
  json(false, $conn->error);
}

json(true, 'success!');
?>
