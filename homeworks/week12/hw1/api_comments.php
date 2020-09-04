<?php
require_once('conn.php');
header('Content-type:application/json;charset=utf-8');
header('Access-Control-Allow-Origin: *');

if (
    empty($_GET['site_key'])
  ) {
  $json = array(
    'ok' => false,
    'message' => 'Please input site_key into url'
  );
  $response = json_encode($json);
  echo $response;
  die();
}

$site_key = $_GET['site_key'];
$before = null;
if (!empty($_GET['before'])) {
  $before = $_GET['before'];
}

$sql = 'select id, nickname, content, created_at from ALAN_discussions where site_key = ? ' .
        (empty($before) ? '' : 'and id < ? ') .
       'order by id desc limit 5';
$stmt = $conn->prepare($sql);
if (!$before) {
  $stmt->bind_param('s', $site_key);
} else {
  $stmt->bind_param('si', $site_key, $before);
}

$result = $stmt->execute();
if (!$result) {
  $json = array(
    'ok' => false,
    'message' => $conn->error
  );
}

$result = $stmt->get_result();
$discussions = array();
while($row = $result->fetch_assoc()) {
  array_push($discussions, array(
    'id' => $row['id'],
    'nickname' => $row['nickname'],
    'content' => $row['content'],
    'created_at' => $row['created_at']
  ));
}
$json = array(
  'ok' => true,
  'discussions' => $discussions
);
$response = json_encode($json);
echo $response;

?>