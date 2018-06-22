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
	$ssid = $_POST["ssid"];
	$mode = $_POST["mode"];
	$password = $_POST["password"];

	if($mode == "encryption"){
		$cmd = "sudo nmcli dev wifi list | grep '".$ssid."' | awk '{print \$NF}'";
		exec($cmd,$output);  
		echo $output[0];
	}
	if($mode == "connect"){
		$cmd = "sudo nmcli dev wifi list | grep '".$ssid."' | awk '{print \$NF}'";
		exec($cmd,$output);  
		$encryption=$output[0];
		if($encryption=="WPA2" || $encryption=="WPA1"){
			$connectcmd = "sudo wifi-connect '".$ssid."' '".$password."' wpa";
			exec($connectcmd,$connectoutput);
			echo $connectoutput[0];

		}elseif($encryption=="WEP"){
			$connectcmd = "sudo wifi-connect '".$ssid."' '".$password."' wep";
			exec($connectcmd,$connectoutput);
			echo $connectoutput[0];
		}else{
			echo "Unsupported encryption type";
		}
	}
}
?>
