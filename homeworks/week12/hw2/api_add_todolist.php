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
$sql = 'insert into ALAN_todolist(json_str, list_id) values(?, ?)';
$stmt = $conn->prepare($sql);
$stmt->bind_param('ss', $json_str, $list_id);
$result = $stmt->execute();
if (!$result) {
  json(false, 'id有人使用了!');
}

json(true, 'success!');

?>
