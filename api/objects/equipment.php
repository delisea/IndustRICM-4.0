<?php
class Equipment {
	private $conn;

	public $id;
	public $name;
	public $category;

	public function __construct($db) {
		$this->conn = $db;
	}

	function create() {
		$query = 'INSERT INTO Equipment SET name=:name, category=:category';
		$stmt = $this->conn->prepare($query);

		$stmt->bindParam(':name', $this->name);
		$stmt->bindParam(':working', $this->working);

		if ($stmt->execute())
			return true;
		return false;
	}

	function update() {
		$query = 'UPDATE Equipment SET name=:name, category=:category WHERE id=:id';
		$stmt = $this->conn->prepare($query);

		$stmt->bindParam(':id', $this->id);
		$stmt->bindParam(':name', $this->name);
		$stmt->bindParam(':category', $this->category);

		if ($stmt->execute())
			return true;
		return false;
	}

	function delete() {
		$query = 'DELETE FROM Equipment WHERE id=:id';
		$stmt = $this->conn->prepare($query);

		$stmt->bindParam(':id', $this->id);

		if ($stmt->execute())
			return true;
		return false;
	}
}
?>