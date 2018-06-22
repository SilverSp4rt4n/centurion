<?php
$sessid = $_COOKIE["sessionid"];
$sessions = file_get_contents("/etc/auth/sessions.json");
$sess_json = json_decode($sessions,true);
$success = "false";
foreach($sess_json as $key => $value){
	if($value==$sessid){
		$sess_json[$key]='-1';
		$success = "true";
	}
}
file_put_contents("/etc/auth/sessions.json",json_encode($sess_json));
echo $success;
?>
