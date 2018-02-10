<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

include_once '../config/database.php';

ob_start();
include_once '../equipment/get.php';
ob_start();
include_once '../staff/get.php';
$staff = ob_get_clean();
$equipment = ob_get_clean();

$all=json_encode(array_merge_recursive(json_decode($equipment, true),json_decode($staff, true)));
echo $all;
?>
