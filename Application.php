<?php
require_once("./api/DB/DB.php");

class Application {
	function __construct(){
		$config = json_decode(file_get_contents('./api/config/config.json'), true);
		$db = new DB($config['DataBase']);

		$this->db = $db;
	}

	public function getNewUserToken($params){
		return bin2hex(random_bytes(4));
	}
	public function getUser($params){
		return 'GETUSER REQ '.$params['token'];
	}
	public function getUserOrders($params){
		return 'GETUSERORDERS REQ';
	}
	public function signin($params){
		return $this->db->signin($params['token']);
	}
	public function getCategories($params){
		return $this->db->getCategories();
	}
	public function getMaterials($params){
		return $this->db->getMaterials($params['category_id']);
	}
	public function getUnit($params){
		return $this->db->getUnit($params['unit_id']);
	}
	public function getMaterialImage($params){
		return $this->db->getMaterialImage($params['material_img_id']);
	}

	public function makeOrder($params){
		$data = json_decode($params['data']);
		return $data;
	}
}

?>
