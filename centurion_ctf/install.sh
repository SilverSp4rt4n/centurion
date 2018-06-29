#!/bin/bash
#Check if we're root
if [[ $(whoami) != "root" ]]; then
	echo "Must be root!"
	exit
fi

#Copy WebApp
cp ./WebApp/CTF.html /var/www/html/CTF.html
cp ./WebApp/CTF.php /var/www/html/php/CTF.php
cp ./WebApp/cent.ctf.js /var/www/html/js/cent.ctf.js

