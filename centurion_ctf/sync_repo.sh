#!/bin/bash
sudo cp /var/www/html/CTF.html ./WebApp/CTF.html
sudo cp /var/www/html/js/cent.ctf.js ./WebApp/cent.ctf.js
sudo cp /var/www/html/php/CTF.php ./WebApp/CTF.php
sudo cp /usr/bin/local-ctf ./CTF_Scripts/local
sudo cp /usr/bin/network-ctf ./CTF_Scripts/network
sudo cp /usr/bin/web-ctf ./CTF_Scripts/web
sudo cp /etc/sudoers.d/012_www-data-ctf ./config/012_www-data-ctf
