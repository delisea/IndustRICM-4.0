<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

include_once '../config/database.php';

$database = new Database();
$db = $database->getConnection();

$postdata = $_POST['params'];
$params = json_decode($postdata);
$query = 'SELECT idEquipment, dateBreak, idStaff, dateSolved FROM Maintenance WHERE idStaff=:idStaff AND syn=0';
$stmt = $db->prepare($query);
$temp = htmlspecialchars(strip_tags($params->id));
$stmt->bindParam(':idStaff', $temp);
$stmt->execute();
$num = $stmt->rowCount();
if ($num>0) {
	$row = $stmt->fetch(PDO::FETCH_ASSOC);
	extract($row);
	$main_item = array(
		'idEquipment' => $idEquipment,
		'dateBreak' => $dateBreak,
		'idStaff' => $idStaff,
		'dateSolved' => $dateSolved
	);
	$query = 'UPDATE Maintenance SET idStaff=:idStaff, dateSolved=:dateSolved, syn=1 WHERE idEquipment=:idEquipment AND dateBreak=:dateBreak';
	$stmt = $db->prepare($query);
	$stmt->bindParam(':idEquipment', $main_item['idEquipment']);
	$stmt->bindParam(':dateBreak', $main_item['dateBreak']);
	$stmt->bindParam(':idStaff', $main_item['idStaff']);
	$stmt->bindParam(':dateSolved', $main_item['dateSolved']);
	$stmt->execute();
	echo json_encode($main_item);
}