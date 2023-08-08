<?php
//header("Access-Control-Allow-Origin: *");
//header("Access-Control-Allow-Methods: OPTIONS,GET,POST,PUT,DELETE");
require_once("./Application.php");


function router($params){
	$method = $params['method'];
    if ($method) {
        $app = new Application();
        switch ($method) {
            case 'check' : return true;
			case 'getNewUserToken': return $app->getNewUserToken($params);
			case 'signin': return $app->signin($params);
			//case 'getUser': return $app->getUser($params);
			case 'getUserOrders': return $app->getUserOrders($params);
            case 'getCategories': return $app->getCategories($params);
			case 'getMaterials': return $app->getMaterials($params);
			case 'getUnit': return $app->getUnit($params);
			case 'getMaterialImage': return $app->getMaterialImage($params);
			case 'makeOrder': return $app->makeOrder($params);
        }
    }
    return false;
}

function answer($data) {
    if ($data) {
        return array(
            'result' => 'ok',
            'data' => $data
        );
    }
    return array(
        'result' => 'error'
    );
}


$path = pathinfo($_SERVER["SCRIPT_FILENAME"]);
if ($path["extension"] == "js") {
    header("Content-Type: text/javascript");
    readfile($_SERVER["SCRIPT_FILENAME"]);
}
else if ($path["extension"] == "html") {
    header("Content-Type: text/html");
    readfile($_SERVER["SCRIPT_FILENAME"]);
}
else if ($path["extension"] == "gif" || $path["extension"] == "jpg") {
    header("Content-Type: image/gif");
    readfile($_SERVER["SCRIPT_FILENAME"]);
}
else {
	if (preg_match('/api/', $_SERVER["REQUEST_URI"])){
		header("Content-Type: application/json");
		echo(json_encode(answer(router($_GET))));
	} 
	else{
		include_once './main.html';
	}
    //return FALSE;
}

?>

