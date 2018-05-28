<?php
exec("sudo wifi-list | grep -v '\\x00'",$output);
echo json_encode($output);
?>
