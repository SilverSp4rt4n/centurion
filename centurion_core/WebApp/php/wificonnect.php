<?php
$ssid = $_POST["ssid"];
exec("nmcli dev wifi list | grep '" + $ssid + "' | awk '{print \$NF}'",$output);  
echo $output;
?>
