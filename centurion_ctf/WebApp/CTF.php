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
	}elseif($_POST["mode"]=="getlive"){
		exec("cat /etc/ctf-live/live-mode",$output);
		echo($output[0]);
	}elseif($_POST["mode"]=="togglelive"){
		exec("sudo live-ctf toggle",$output);
		echo($output[0]);
	}
	elseif($_POST["mode"]=="flaglist"){
		exec("ls /opt/flags",$output);
		echo json_encode($output);
	}
	elseif($_POST["mode"]=="deploylocal"){
		$cmd = "exit";
		if(file_exists("/opt/source/".$_POST['source'])){
			$cmd = "sudo local-ctf /opt/source/".$_POST['source'];
		}
		if(file_exists("/opt/flags/".$_POST['flag'])){
			$cmd = $cmd." /opt/flags/".$_POST['flag'];
		}
		exec($cmd,$output);
	}
	elseif($_POST["mode"]=="deploynetwork"){
		$cmd = "exit";
		if(file_exists("/opt/source/".$_POST['source'])){
			$cmd = "sudo network-ctf /opt/source/".$_POST['source'];
		}
		if(file_exists("/opt/flags/".$_POST['flag'])){
			$cmd = $cmd." /opt/flags/".$_POST['flag'];
		}
		exec($cmd,$output);
	}elseif($_POST["mode"]=="deployweb"){
		echo("Deploying web app...\n");
		if(file_exists("/opt/source/".$_POST['source'])){
			$cmd = "sudo web-ctf /opt/source/".$_POST['source'];
			exec($cmd,$output);
			//print_r($output,true);
		}
		echo("Done.");
	}elseif($_POST["mode"]=="getservices"){
		$services = file_get_contents("/opt/challenges/challenges.json");
		$json_services = json_decode($services);
		//Get Status of each service
		foreach($json_services as $key =>$val){
			if($val->{"Service Type"}=="Local"){
				if(file_exists("/opt/challenges/".$key)){
				       	if($val->{"Flag"}=="None" || file_exists("/opt/challenges/".$val->{"Flag"})){
						$val->Status="Installed.";
					}else{
						$val->Status="Missing Flag";
					}
				}elseif(!file_exists("/opt/challenges/".$val->{"Flag"}) && $val->{"Flag"}!="None" &&file_exists("/opt/challenges/".$key)){

					$val->Status="Missing Flag";
				}else{
					$val->Status="Not Installed.";
				}
			}elseif($val->{"Service Type"}=="Network"){
				$cmd = "ps -A | grep ".$key." | wc -l";
				exec($cmd,$output);
				if($output[0]=="1" && file_exists("/opt/challenges/".$val->{"Flag"}) || $output[0]=="1" && $val->{"Flag"}=="None"){
					$val->Status="Running";
				}elseif(!file_exists("/opt/challenges/".$val->{"Flag"})){
					$val->Status="Missing Flag";
				}else{
					$val->Status="Not Running";
				}
			}elseif($val->{"Service Type"}=="Web"){
				$cmd1 = "ls /opt/challenges/web/ | wc -l";
				exec($cmd1,$output1);
				if($output1[0]=="0"){
					$val->Status="Not Installed";
				}else{
					$val->Status="Running";
				}
			}
		}
		echo(json_encode($json_services));	
	}elseif($_POST["mode"]=="eraseservice"){
		$service = $_POST["service"];
		$json_services = json_decode(file_get_contents("/opt/challenges/challenges.json"));
		$restartWeb = 0;
		$cmd = "rm /opt/challenges/".$service;
		exec($cmd);
		foreach($json_services as $key => $val){
			if($key == $service){
				$flag = $val->Flag;
				unset($json_services->{$key});
			}
			if($val->{"Service Type"}=="Web"){
				exec("sudo a2dissite 001-challenge.conf");
				$restartWeb = 1;
			}
		}
		if(file_exists("/opt/challenges/".$flag)){
			$cmd = "rm /opt/challenges/".$flag;
			exec($cmd);
		}
		file_put_contents("/opt/challenges/challenges.json",json_encode($json_services));
		echo("".$service." Erased.");
		if($restartWeb==1){
			exec("sudo service apache2 restart");	
		}
	}
	else{
	if(isset($_POST["submitSource"])){
		$target_file = "/opt/source/".basename($_FILES["sourceCode"]["name"]);
		move_uploaded_file($_FILES["sourceCode"]["tmp_name"],$target_file);
		echo "Source Uploaded.";
	}elseif(isset($_POST["submitFlag"])){
		$target_file = "/opt/flags/".basename($_FILES["flag"]["name"]);
		move_uploaded_file($_FILES["flag"]["tmp_name"],$target_file);
		echo "Flag Uploaded.";
	}
	}
}
?>
