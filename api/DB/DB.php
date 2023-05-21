<?php
class DB {
    function __construct($config) {
		$this->config = $config;
        $host = $config["host"];
        $port = $config["port"];
        $name = $config["name"];
        $user = $config["user"];
        $password = $config["password"];

        try {
            $this->db = new PDO(
                'mysql:host=' . $host . ';port=' . $port . ';dbname=' . $name,
                $user,
                $password
            );
        } catch (Exception $e) {
            print_r('Error connecting to DB: ' . $e);
            die;
        }
    }

    function __destruct() {
        $this->db = null;
    }

    private function getArray($query) {
        $stmt = $this->db->query($query);
        if ($stmt) {
            $result = array();
            while ($row = $stmt->fetch(PDO::FETCH_OBJ)) {
                $result[] = $row;
            }
            return $result;
        }
    }

	public function getConfig(){
		return $this->config;	
	}

	public function getMaterials(){
		$query = 'SELECT * from calc_material';
		return $this->getArray($query);
	}
}
?>
