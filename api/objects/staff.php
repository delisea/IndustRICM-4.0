<?php
class Staff {
	private $conn;

	public $id;
	public $name;
	public $working;

	public function __construct($db) {
		$this->conn = $db;
	}

	function create() {
		$query = 'INSERT INTO Staff SET name=:name, working=:working';
		$stmt = $this->conn->prepare($query);

		$stmt->bindParam(':name', $this->name);
		$stmt->bindParam(':working', $this->working);

		if ($stmt->execute())
			return true;
		return false;
	}

	function update() {
		$query = 'UPDATE Staff SET name=:name, working=:working WHERE id=:id';
		$stmt = $this->conn->prepare($query);

		$stmt->bindParam(':id', $this->id);
		$stmt->bindParam(':name', $this->name);
		$stmt->bindParam(':working', $this->working);

		if ($stmt->execute())
			return true;
		return false;
	}

	function delete() {
		$query = 'DELETE FROM Staff WHERE id=:id';
		$stmt = $this->conn->prepare($query);

		$stmt->bindParam(':id', $this->id);

		if ($stmt->execute())
			return true;
		return false;
	}
}
?>