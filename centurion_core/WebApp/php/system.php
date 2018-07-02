<?php
$sessid = $_COOKIE["sessionid"];
$sessions = file_get_contents("/etc/auth/sessions.json");
$sess_json = json_decode($sessions,true);
$valid = "false";
foreach($sess_json as $key => $value){
	if($value==$sessid && $sessid!="-1"){
		$valid = "true";
		$username = $key;
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
	}elseif($mode=="changepass"){
		$credentials = file_get_contents("/etc/auth/credentials.json");
		$creds_json = json_decode($credentials,true);
		if(md5($_POST['oldpass'])!=$creds_json[$username]){
			echo("Old password does not match!");
		}else{
			echo("Password changed");
			$creds_json[$username]=md5($_POST['newpass']);
			file_put_contents("/etc/auth/credentials.json",json_encode($creds_json));
		}
	}
}else{
	echo "Invalid Authentication.";
}
?>
