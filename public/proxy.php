<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST,GET,OPTIONS");
header('Access-Control-Allow-Credentials: true');
header('Access-Control-Allow-Headers: Origin,Access-Control-Allow-Headers,Content-Type,Access-Control-Allow-Methods, Authorization, X-Requested-With,Access-Control-Allow-Credentials');

$headers = array();
foreach (getallheaders() as $header_name => $header_value) {
  if (strpos($header_name, 'Content-Type') === 0 || strpos($header_name, 'Authorization') === 0 || strpos($header_name, 'X-Requested-With') === 0) {
    $header_name = strtolower($header_name);
    $headers[] = $header_name . ":" . $header_value;
  }
}

$is_json_string_request = json_decode(file_get_contents("php://input"));

if (json_last_error() === JSON_ERROR_NONE) {
  $is_json_request = true;
  if (!isset($is_json_string_request->method) || empty($is_json_string_request->method)) {
    echo json_encode(array("message" => "PROXY ACCESS DENIED!, Request method not specified"));
    exit();
  }
  if (!isset($is_json_string_request->address) || empty($is_json_string_request->address)) {
    echo json_encode(array("message" => "PROXY ACCESS DENIED!, Address not specified"));
    exit();
  }
  if ($_SERVER['REQUEST_METHOD'] != $is_json_string_request->method) {
    echo json_encode(array("message" => "PROXY ACCESS DENIED!, Request type and method must be the same"));
    exit();
  }
  $url = $is_json_string_request->address;
  $method = $is_json_string_request->method;
} else {
  $is_raw_request = true;
  if (!isset($_REQUEST['method']) || empty($_REQUEST['method'])) {
    echo json_encode(array("message" => "PROXY ACCESS DENIED!, Request method not specified"));
    exit();
  }
  if (!isset($_REQUEST['address']) || empty($_REQUEST['address'])) {
    echo json_encode(array("message" => "PROXY ACCESS DENIED!, Address not specified"));
    exit();
  }
  if ($_SERVER['REQUEST_METHOD'] != $_REQUEST['method']) {
    echo json_encode(array("message" => "PROXY ACCESS DENIED!, Request type and method must be the same"));
    exit();
  }
  $url = $_REQUEST['address'];
  $method = $_REQUEST['method'];
}

switch ($method) {
  case "POST":
    if (isset($is_json_request) && $is_json_request == true) {
      $post_keys_values = (array) $is_json_string_request;
      unset($post_keys_values['address']);
      unset($post_keys_values['method']);
    }
    if (isset($is_raw_request) && $is_raw_request == true) {
      $post_keys_values = $_POST;
      unset($post_keys_values['address']);
      unset($post_keys_values['method']);
      $keys = "";
      $values = "";
      foreach ($post_keys_values as $key => $value) {
        $keys .= $key . '%%';
        $values .= $value . '%%';
      };
      $post_keys = explode('%%', $keys);
      $post_values = explode('%%', $values);
      $post_parameters = array_combine($post_keys, $post_values);
    }
    if (isset($is_json_request) && $is_json_request == true) {
      $post_parameters = json_encode($post_keys_values);
    } else {
      $post_parameters = http_build_query($post_parameters);
    }
    $curl = curl_init();
    curl_setopt_array($curl, array(
      CURLOPT_URL            => $url,
      CURLOPT_RETURNTRANSFER => true,
      CURLOPT_CUSTOMREQUEST  => $method,
      CURLOPT_POSTFIELDS     => $post_parameters,
      CURLOPT_HTTPHEADER     => $headers
    ));
    break;
  case "GET":
    if (isset($is_json_request) && $is_json_request == true) {
      $get_keys_values = (array) $is_json_string_request;
      unset($get_keys_values['address']);
      unset($get_keys_values['method']);
    }
    if (isset($is_raw_request) && $is_raw_request == true) {
      $get_keys_values = $_GET;
      unset($get_keys_values['address']);
      unset($get_keys_values['method']);
      $keys = "";
      $values = "";
      foreach ($get_keys_values as $key => $value) {
        $keys .= $key . '%%';
        $values .= $value . '%%';
      };
      $get_keys = explode('%%', $keys);
      $get_values = explode('%%', $values);
      $get_parameters = array_combine($get_keys, $get_values);
    }
    if (isset($is_json_request) && $is_json_request == true) {
      $get_params = json_encode($get_keys_values);
    } else {
      $get_params = http_build_query($get_parameters);
    }
    $curl = curl_init();
    curl_setopt_array($curl, array(
      CURLOPT_URL            => $url . "?" . $get_params,
      CURLOPT_RETURNTRANSFER => true,
      CURLOPT_HTTPHEADER     => $headers
    ));
    break;
  default:
    echo json_encode("Proxy only allows POST and GET request");
    exit();
}

$response = curl_exec($curl);
$err = curl_error($curl);
curl_close($curl);

if ($err) {
  echo json_encode($err);
} else {
  json_decode($response);
  if (json_last_error() === JSON_ERROR_NONE) {
    header('Content-Type: application/json');
  }
  echo $response;
}
