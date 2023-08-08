<?php
require_once("./api/DB/DB.php");

class Application {
	function __construct(){
		$config = json_decode(file_get_contents('./api/config/config.json'), true);
		$db = new DB($config['DataBase']);

		$this->db = $db;
	}
	private function checkUserToken($token){
		if($token) return true;
		else return false;
	}
	private function getUser($token){
		return $this->db->getUser($token);
	}
	private function checkOrderItems($items){
		foreach($items as $item){
			if(isset($item->category_id,
				$item->material_id, 
				$item->amount,
				$item->price)) continue;
			else return false;
		}
		return true;
	}
	private function getCategory($category_id){
		return $this->db->getCategory($category_id);
	}
	private function getMaterial($material_id){
		return $this->db->getMaterial($material_id);
	}
	


	public function getNewUserToken($params){
		return bin2hex(random_bytes(4));
	}
	public function getUserOrders($params){
		$user = $this->getUser($params['token'])[0];
		$orders = $this->db->getUserOrders($user->user_id);
		foreach($orders as $order){
			$order->order_items = json_decode($order->order_items);
			foreach($order->order_items as $item){
				$item->category_name = $this->getCategory($item->category_id)->category_name;
  				unset( $item->category_id );

				$item->material_name = $this->getMaterial($item->material_id)->material_name;
  				unset( $item->material_id );
			}
		}

		return $orders;
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
		if($this->checkUserToken($data->orderUserToken)
			&& $this->checkOrderItems($data->items)
		){
			$user = $this->getUser($data->orderUserToken)[0];
			return $this->db->makeOrder($user->user_id, $data->items);
		}
		else return "ERROR: ONE OF THE FOLLOWING NOT PRESENT: (TOKEN, CATEGORY, MATERIAL, PRICE, AMOUNT)";
	}
}

?>
