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
exec("ls ../ | grep .html | sed -e 's/.html//g' | grep -v index ",$output);
$json_list = json_encode($output);

//Make sure Home is the first item in the list
$arr = json_decode($json_list);
for ($i = 0; $i < count($arr); $i++){
	if ($arr[$i] == "Home"){
		$temp = $arr[0];
		$arr[0] = $arr[$i];
		$arr[$i] = $temp;
	}
}
$json_list = json_encode($arr);
echo $json_list;
}
?>
