<?php
require_once('conn.php');
header('Content-type:application/json;charset=utf-8');
header('Access-Control-Allow-Origin: *');

if (
    empty($_GET['list_id'])
  ) {
  $json = array(
    'ok' => false,
    'message' => 'Please input list_id into url'
  );
  $response = json_encode($json);
  echo $response;
  die();
}

$list_id = $_GET['list_id'];

$sql = 'select * from ALAN_todolist where list_id = ? ';
$stmt = $conn->prepare($sql);
$stmt->bind_param('i', $list_id);


$result = $stmt->execute();
if (!$result) {
  $json = array(
    'ok' => false,
    'message' => $conn->error
  );
}

$result = $stmt->get_result();
$todolist = array();
if ($result->num_rows) {
  while($row = $result->fetch_assoc()) {
    array_push($todolist, array(
      'id' => $row['id'],
      'json_str' => $row['json_str'],
      'list_id' => $row['list_id'],
      'created_at' => $row['created_at']
    ));
  }
} else {
$json = array (
  'ok' => false,
  'message' => 'this list_id is not exit'
);
$response = json_encode($json);
echo $response;
die();
}


$json = array(
  'ok' => true,
  'todolist' => $todolist
);
$response = json_encode($json);
echo $response;

?>