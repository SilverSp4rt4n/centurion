#!/bin/bash
#Compares timestamps of scripts installed on the system against the ones in the repo.
#If installed script is newer, it is copied to the repository. 

if test /etc/init.d/startup.sh -nt ./morpheus_core/config/Networking/startup.sh; then
	echo "/etc/init.d/startup.sh is newer than ./morpheus_core/config/Networking/startup.sh Replace repo file with system file?"
	echo "(y/n)"
	read answer
	if [ "$answer" = "y" ]; then
		cp /etc/init.d/startup.sh ./morpheus_core/config/Networking/startup.sh
	fi
fi

if test /etc/scripts/ifaceSetup.py -nt ./morpheus_core/config/Networking/Interface/ifaceSetup.py; then
	echo "/etc/scripts/ifaceSetup.py is newer than ./morpheus_core/config/Networking/Interface/ifaceSetup.py Replace repo file with system file?"
	echo "(y/n)"
	read answer
	if [ "$answer" = "y" ]; then
		cp /etc/scripts/ifaceSetup.py ./morpheus_core/config/Networking/Interface/ifaceSetup.py
	fi
fi

