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
#Make Source Code Directory
mkdir /opt/source/
mkdir /opt/flags/
chown www-data /opt/source
chown www-data /opt/flags
echo "Adding CTF users...you will be prompted to create passwords for them!"
adduser ctf1
adduser ctf2
