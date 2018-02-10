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

$postdata = $_POST['params'];
$equipment = new Equipment($db);

if (isset($postdata)) {
	$params = json_decode($postdata);

	if (isset($params->id) && isset($params->name) && isset($params->category)) {
		$equipment->id = htmlspecialchars(strip_tags($params->id));
		$equipment->name = htmlspecialchars(strip_tags($params->name));
		$equipment->category = htmlspecialchars(strip_tags($params->category));

		if ($equipment->update())
			echo json_encode(array('status' => 'OK'));
		else
			echo json_encode(array('status' => 'ERROR'));
	} else {
		echo json_encode(array('status' => 'ERROR'));
	}
} else {
	echo json_encode(array('status' => 'ERROR'));
}
