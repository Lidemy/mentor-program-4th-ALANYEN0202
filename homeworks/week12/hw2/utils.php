<?php
 require_once('conn.php');

 function json($isOk, $message) {
    $json = array(
      'ok' => $isOk,
      'message' => $message
    );
    $response = json_encode($json);
    echo $response;
    die();
  }
?>
