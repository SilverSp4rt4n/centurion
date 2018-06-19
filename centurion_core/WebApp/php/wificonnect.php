<?php
$ssid = $_POST["ssid"];
$mode = $_POST["mode"];
if($mode == "encryption"){
	$cmd = "sudo nmcli dev wifi list | grep '".$ssid."' | awk '{print \$NF}'";
	exec($cmd,$output);  
	echo $output[0];
}
?>
