<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

include_once '../config/database.php';

$database = new Database();
$db = $database->getConnection();

$postdata = file_get_contents('php://input');
if (isset($postdata)) {
	$params = json_decode($postdata);
	if (isset($params->id) || isset($params->name) || isset($params->category)) {
		$query = 'SELECT e.id, e.name, e.category FROM Equipment e WHERE';
		if (isset($params->id)) {
			$query .= ' id=:id';
			if (isset($params->name)) {
				$query .= ' AND name LIKE :name';
				if (isset($params->category))
					$query .= ' AND category=:category';
			}
		} else {
			if (isset($params->name)) {
				$query .= ' name LIKE :name';
				if (isset($params->category))
					$query .= ' AND category=:category';
			} else {
				if (isset($params->category))
					$query .= ' category=:category';
			}
		}
		$stmt = $db->prepare($query);

		if (isset($params->id)) {
			$idTemp = htmlspecialchars(strip_tags($params->id));
			$stmt->bindParam(':id', $idTemp);
		}
		if (isset($params->name)) {
			$nameTemp = htmlspecialchars(strip_tags($params->name));
			$stmt->bindParam(':name', $nameTemp);
		}
		if (isset($params->working)) {
			$categoryTemp = htmlspecialchars(strip_tags($params->category));
			$stmt->bindParam(':category', $categoryTemp);
		}
	} else {
		$query = 'SELECT s.id, s.name, s.category FROM Equipment e';
		$stmt = $db->prepare($query);
	}
} else {
	$query = 'SELECT s.id, s.name, s.category FROM Equipment e';
	$stmt = $db->prepare($query);
}

$stmt->execute();
$num = $stmt->rowCount();

if ($num > 0) {
	$staffs_arr = array();
	$staffs_arr['records'] = array();

	while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
		extract($row);

		$staff_item = array(
			'id' => $id,
			'name' => $name,
			'category' => $category
		);

		array_push($staffs_arr['records'], $staff_item);
	}

	echo json_encode($staffs_arr);
} else {
	echo json_encode(array());
}
?>
