<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

include_once '../config/database.php';
include_once '../objects/staff.php';
 
$database = new Database();
$db = $database->getConnection();

$postdata = file_get_contents('php://input');
$staff = new Staff($db);

if (isset($postdata)) {
	$params = json_decode($postdata);
	
	if (isset($params->id) && isset($params->name) && isset($params->working)) {
		$staff->id = htmlspecialchars(strip_tags($params->id));
		$staff->name = htmlspecialchars(strip_tags($params->name));
		$staff->working = htmlspecialchars(strip_tags($params->working));

		if ($staff->update())
			echo json_encode(array('status' => 'OK'));
		else
			echo json_encode(array('status' => 'ERROR'));
	} else {
		echo json_encode(array('status' => 'ERROR'));
	}
} else {
	echo json_encode(array('status' => 'ERROR'));
}