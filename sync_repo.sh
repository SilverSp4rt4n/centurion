#!/bin/bash
#Compares timestamps of scripts installed on the system against the ones in the repo.
#If installed script is newer, it is copied to the repository. 

if test /etc/init.d/startup.sh -nt ./centurion_core/config/Networking/startup.sh; then
	echo "/etc/init.d/startup.sh is newer than ./centurion_core/config/Networking/startup.sh Replace repo file with system file?"
	echo "(y/n)"
	read answer
	if [ "$answer" = "y" ]; then
		cp /etc/init.d/startup.sh ./centurion_core/config/Networking/startup.sh
	fi
fi

if test /etc/scripts/ifaceSetup.py -nt ./centurion_core/config/Networking/Interface/ifaceSetup.py; then
	echo "/etc/scripts/ifaceSetup.py is newer than ./centurion_core/config/Networking/Interface/ifaceSetup.py Replace repo file with system file?"
	echo "(y/n)"
	read answer
	if [ "$answer" = "y" ]; then
		cp /etc/scripts/ifaceSetup.py ./centurion_core/config/Networking/Interface/ifaceSetup.py
	fi
fi
if test /var/www/html -nt ./centurion_core/WebApp; then
	echo "The installed web app is newer than the web app in the repository. Replace repo app with installed app?"
	echo "(y/n)"
	read answer
	if [ "$answer" = "y" ]; then
		cp -r /var/www/html/* ./centurion_core/WebApp/
	fi
fi
