

<?php
// router.php
$path = pathinfo($_SERVER["SCRIPT_FILENAME"]);
if ($path["extension"] == "js") {
    header("Content-Type: text/javascript");
    readfile($_SERVER["SCRIPT_FILENAME"]);
}
else if ($path["extension"] == "html") {
    header("Content-Type: text/html");
    readfile($_SERVER["SCRIPT_FILENAME"]);
}
else {
	include_once './main.html';
    return FALSE;
}
?>

