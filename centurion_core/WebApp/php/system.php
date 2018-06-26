<?php
$sessid = $_COOKIE["sessionid"];
$sessions = file_get_contents("/etc/auth/sessions.json");
$sess_json = json_decode($sessions,true);
$valid = "false";
foreach($sess_json as $key => $value){
	if($value==$sessid && $sessid!="-1"){
	$valid = "true";
	}
}
if($valid == "true"){
	$mode = $_POST["mode"];
	$output = "";
	if($mode=="shutdown"){
		exec("sudo shutdown -t 0 2>&1",$output);
		echo $output[0];
	}
	elseif($mode=="reboot"){
		exec("sudo reboot 2>&1",$output);
		echo $output[0];
	}
	elseif($mode=="usage"){
		exec("df --block-size=M | grep \"/dev/root\" | awk '{print \$3,\$4,\$5}'",$output);
		echo $output[0];
	}
}else{
	echo "Invalid Authentication.";
}
?>
