<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

include_once '../config/database.php';

$database = new Database();
$db = $database->getConnection();

$query = 'SELECT `HistoS`.*, `Staff`.name FROM `HistoS`, (SELECT `idStaff`, MAX(`date`) as dateM FROM `HistoS` GROUP BY idStaff) AS LASTH, `Staff` WHERE `HistoS`.idStaff = LASTH.idStaff AND `HistoS`.date = LASTH.dateM AND `Staff`.working=1 AND `Staff`.id=`HistoS`.idStaff';
$stmt = $db->prepare($query);
$stmt->execute();
$result = array();
$result['staff'] = array();
while($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
	extract($row);

	
}