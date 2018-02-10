<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

include_once '../config/database.php';

$database = new Database();
$db = $database->getConnection();

$query = 'SELECT id, locationX, locationY FROM Staff LEFT JOIN (SELECT `HistoS`.* FROM `HistoS`, (SELECT `idStaff`, MAX(`date`) AS MD FROM `HistoS` GROUP BY `idStaff`) AS GB WHERE `HistoS`.date=GB.MD AND `HistoS`.idStaff=GB.idStaff) AS FI ON Staff.id = FI.idStaff WHERE working = 1 AND idStaff IS NOT NULL';
$stmt = $db->prepare($query);
$stmt->execute();
$result = array();
$result['staff'] = array();
while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
	extract($row);
	$staff_item = array(
		'id' => $id,
		'locationX' => $locationX,
		'locationY' => $locationY
	);
	array_push($result['staff'], $staff_item);
}
$postdata = file_get_contents('php://input');
$params = json_decode($postdata);
$idEquipment = htmlspecialchars(strip_tags($params->id));
$query = 'SELECT locationX, locationY FROM `HistoE`, (SELECT `idEquipment`, MAX(`date`) AS MD FROM `HistoE` WHERE idEquipment=:idEquipment GROUP BY `idEquipment`) as GB WHERE `HistoE`.date=GB.MD AND `HistoE`.idEquipment=GB.idEquipment';
$stmt = $db->prepare($query);
$stmt->bindParam(':idEquipment', $idEquipment);
$stmt->execute();
$row = $stmt->fetch(PDO::FETCH_ASSOC);
extract($row);
$result['machine'] = array();
$machine_item = array(
	'locationX' => $locationX,
	'locationY' => $locationY
);
array_push($result['machine'], $machine_item);
echo json_encode($result);