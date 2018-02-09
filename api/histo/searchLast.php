<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

include_once '../config/database.php';

$database = new Database();
$db = $database->getConnection();

$query = 'SELECT * FROM Staff LEFT JOIN (SELECT `HistoS`.* FROM `HistoS`, (SELECT `idStaff`, MAX(`date`) AS MD FROM `HistoS` GROUP BY `idStaff`) AS GB WHERE `HistoS`.date=GB.MD AND `HistoS`.idStaff=GB.idStaff) AS FI ON Staff.id = FI.idStaff WHERE working = 1 AND idStaff IS NOT NULL';
$stmt = $db->prepare($query);
$stmt->execute();
$result = array();
$result['staff'] = array();
while($row = $stmt->fetch(PDO::FETCH_ASSOC)) {	 
	extract($row);
	$staff_item = array(
		'id' => $id,
		'name' => $name,
		'working' => $working,
		'date' => $date,
		'locationX' => $locationX,
		'locationY' => $locationY
	);
	array_push($staffs_arr['records'], $staff_item);
}
echo json_encode($staffs_arr)
