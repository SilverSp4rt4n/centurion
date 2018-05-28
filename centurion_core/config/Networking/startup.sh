sleep 30
echo "Startup data at ($date)" > /var/log/startlog.txt
sudo iptables-restore < /etc/iptables.def
if (( $dpkg -l | grep -E '^ii' | grep network-manager | wc -l > "0" )); then
	echo "network-manager is installed." >> /var/log/startlog.txt
else
	echo "network-manager is not installed." >> /var/log/startlog.txt
	sudo apt-get install network-manager -y
fi

while (( $(ps -A | grep udhcpd | wc -l) < "1" )); do
	sudo udhcpd /etc/udhcpd.conf
	sudo echo "Reran udhcpd" >> /var/log/startlog.txt
	sleep 1
