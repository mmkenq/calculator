<?php class DB {
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
            print_r('ERROR CONNECTION TO DB: ' . $e);
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

	public function getUser($user_token){
		$query = 'SELECT * FROM calc_user WHERE user_token="' . $user_token . '"';
		return $this->getArray($query);
	}

	public function signin($user_token){
		$query = 'INSERT INTO calc_user (user_token, user_is_active)
				  VALUES ("' .$user_token. '", 1)
				  ON DUPLICATE KEY UPDATE user_is_active=1';
		return $this->db->query($query);
	}

	public function getUserOrders($user_id){
		$query = 'SELECT * FROM calc_order WHERE order_user_id=' . $user_id;
		return $this->getArray($query);
	}

	public function getCategories(){
		$query = 'SELECT * FROM calc_category';
		return $this->getArray($query);
	}
	public function getCategory($category_id){
		$query = 'SELECT * FROM calc_category WHERE category_id=' . $category_id; 
		return $this->getArray($query)[0];
	}

	public function getMaterials($category_id){
		$query = 'SELECT * FROM calc_material WHERE material_category_id=' . $category_id;
		return $this->getArray($query);
	}

	public function getMaterial($material_id){
		$query = 'SELECT * FROM calc_material WHERE material_id=' . $material_id; 
		return $this->getArray($query)[0];
	}

	public function getUnit($unit_id){
		$query = 'SELECT * FROM calc_unit WHERE unit_id=' . $unit_id;
		return $this->getArray($query)[0];
	}
	public function getMaterialImage($material_img_id){
		$query = 'SELECT * FROM calc_material_img WHERE img_id=' . $material_img_id;
		return $this->getArray($query)[0];
	}


	public function makeOrder($user_id, $items){
		$query = 'INSERT INTO calc_order (order_user_id, order_items) VALUES ('. $user_id .', \''. json_encode($items) . '\')';
		return $this->db->query($query);
	}
}
?>
