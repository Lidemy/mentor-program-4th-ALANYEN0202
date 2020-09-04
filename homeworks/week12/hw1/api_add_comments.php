<?php
require_once('conn.php');
header('Content-type:application/json;charset=utf-8');
header('Access-Control-Allow-Origin: *');

if (
  empty($_POST['site_key']) ||
  empty($_POST['nickname']) ||
  empty($_POST['content'])
  ) {
   $json = array (
     'ok' => false,
     'message' => 'Please input fields'
   );
   $response = json_encode($json);
   echo $response;
   die();
  };

$site_key = $_POST['site_key'];
$nickname = $_POST['nickname'];
$content = $_POST['content'];
$sql = 'insert into ALAN_discussions(site_key, nickname, content) values(?, ?, ?)';
$stmt = $conn->prepare($sql);
$stmt->bind_param('sss', $site_key, $nickname, $content);
$result = $stmt->execute();
if (!$result) {
  $json = array(
    'ok' => false,
    'message' => $conn->error
  );
  $response = json_encode($json);
  echo $response;
  die();
}

$json = array(
  'ok' => true,
  'message' => 'success!'
);
$response = json_encode($json);
echo $response;

?>
