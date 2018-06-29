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
	if($_POST["mode"]=="list"){
		exec("ls /opt/source",$output);
		echo json_encode($output);
	}
	elseif($_POST["mode"]=="flaglist"){
		exec("ls /opt/flags",$output);
		echo json_encode($output);
	}else{
	if(isset($_POST["submitSource"])){
		$target_file = "/opt/source/".basename($_FILES["sourceCode"]["name"]);
		move_uploaded_file($_FILES["sourceCode"]["tmp_name"],$target_file);
		echo "Source Uploaded.";
	}elseif(isset($_POST["submitFlag"])){
		$target_file = "/opt/flags/".basename($_FILES["flag"]["name"]);
		move_uploaded_file($_FILES["flag"]["tmp_name"],$target_file);
		echo "Flag Uploaded.";
	}
	echo "All good.";
	}
}
?>
