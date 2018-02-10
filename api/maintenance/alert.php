<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

include_once '../config/database.php';

$database = new Database();
$db = $database->getConnection();

$postdata = $_POST['params'];
$query = 'SELECT END.id FROM (SELECT ST.id, SQRT((ST.locationX-MA.locationX)*(ST.locationX-MA.locationX)+(ST.locationY-MA.locationY)*(ST.locationY-MA.locationY)) AS distance FROM (SELECT id, locationX, locationY FROM Staff LEFT JOIN (SELECT HistoS.idStaff, date, locationX, locationY FROM HistoS, (SELECT idStaff, MAX(date) AS MD FROM HistoS GROUP BY idStaff) AS GB WHERE HistoS.date=GB.MD AND HistoS.idStaff=GB.idStaff) AS FI ON Staff.id = FI.idStaff WHERE working = 1 AND idStaff IS NOT NULL) AS ST, (SELECT locationX, locationY FROM `HistoE`, (SELECT `idEquipment`, MAX(`date`) AS MD FROM `HistoE` WHERE idEquipment=:idEquipment GROUP BY `idEquipment`) as GB WHERE `HistoE`.date=GB.MD AND `HistoE`.idEquipment=GB.idEquipment AND ST.locationZ=MA.locationZ) AS MA ORDER BY distance ASC LIMIT 1) AS END';
$stmt = $db->prepare($query);
$params = json_decode($postdata);
$temp = htmlspecialchars(strip_tags($params->id));
$stmt->bindParam(':idEquipment', $temp);
$stmt->execute();
$row = $stmt->fetch(PDO::FETCH_ASSOC);
extract($row);
$staff_item = array(
	'id' => intval($id)
);
$query = 'INSERT INTO Maintenance SET idEquipment=:idEquipment, dateBreak=CURRENT_TIMESTAMP, idStaff=:idStaff, syn=0';
$stmt = $db->prepare($query);
$stmt->bindParam('idEquipment', $temp);
$stmt->bindParam('idStaff', $staff_item['id']);
$stmt->execute();