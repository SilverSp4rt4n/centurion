<?php
exec("ls ../ | grep .html | sed -e 's/.html//g' | grep -v index ",$output);
echo json_encode($output);
?>
