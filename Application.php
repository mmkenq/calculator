<?php
require_once("./api/DB/DB.php");

class Application {
	function __construct(){
		$config = json_decode(file_get_contents('./api/config/config.json'), true);
		$db = new DB($config['DataBase']);

		$this->db = $db;
	}

	public function getStore($params){
		return 'getStore';
	}
	public function getMaterials($params){
		return $this->db->getMaterials();
	}
}

?>
