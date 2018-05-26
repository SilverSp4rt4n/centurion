#!/bin/bash
sleep 60
sudo iptables-restore < /etc/iptables.def
sudo udhcpd /etc/udhcpd.conf
if (( $(dpkg -l | grep -E '^ii' | grep network-manager | wc -l) > "0" )); then
	echo "network-manager is installed."
else
	echo "network-maanger is not installed."
	sudo apt-get install network-manager -y
fi
