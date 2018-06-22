<?php
$username = $_POST["username"];
$password = $_POST["password"];
$credentials = file_get_contents("/etc/auth/credentials.json");
$json_creds = json_decode($credentials,true);
$md5pass = md5($password);
if (isset( $json_creds[$username])){
	if ($json_creds[$username] == $md5pass){
		ini_set("session.use_cookies","0");
		session_start();
		$sessions = file_get_contents("/etc/auth/sessions.json");
		$json_sess = json_decode($sessions,true);
		$sessionid = session_id();
		echo "1:".$sessionid;
		session_destroy();
		$json_sess[$username] = $sessionid;
		file_put_contents("/etc/auth/sessions.json",json_encode($json_sess));
	}else{
		echo "0:-1";
	}
}else{
	echo "0:-1";
}

?>
