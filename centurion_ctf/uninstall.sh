#!/bin/bash
#Check if we're root
if [[ $(whoami) != "root" ]]; then
	echo "Must be root!"
	exit
fi

#Remove WebApp Features
rm /var/www/html/CTF.html
rm /var/www/html/php/CTF.php
rm /var/www/html/js/cent.ctf.js
#Remove Challenge Generation Scripts
rm /usr/bin/local-ctf
#Remove CTF users
userdel -r ctf1
userdel -r ctf2
