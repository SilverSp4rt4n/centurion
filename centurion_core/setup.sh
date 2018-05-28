#Switch to root user
if [[ $(whoami) != "root" ]]; then
	echo "Must be root!"
	exit
fi
#Install udhcpd and hostapd to run wireless AP
apt-get install udhcpd -y
apt-get install hostapd -y
#Install openssh-server to allow remote login
apt-get install openssh-server -y
#Install nmcli so that we can manage our network interfaces
#apt-get install network-manager -y
#Install pip and use it to download the python wifi package
apt install python-pip -y
pip install wifi
#Enable packet forwarding for the wireless AP
echo 1 > /proc/sys/net/ipv4/ip_forward
#Copy config files for hostapd and udhcpd
cp ./config/Networking/Access_Point/hostapd.conf /etc/hostapd/hostapd.conf
cp ./config/Networking/Access_Point/udhcpd.conf /etc/udhcpd.conf
#Copy the iptables rules into /etc
cp ./config/Networking/Access_Point/iptables.def /etc/iptables.def
#Copy the startup script into /etc/init.d/startup.sh
cp ./config/Networking/startup.sh /etc/init.d/startup.sh
chmod +x /etc/init.d/startup.sh
#Copy the interfaces file
cp ./config/Networking/Interface/interfaces /etc/network/interfaces
#Add crontab entries for root
crontab -l > newcron
echo "@reboot		/etc/init.d/startup.sh" >> newcron
echo "@reboot		systemctl start ssh" >> newcron
crontab newcron
rm newcron
#Setup Web Server
apt-get install apache2 -y
apt-get install php -y
cp -r ./WebApp/* /var/www/html/
#Add Necessary Sudo privileges to www-data
chown root ./config/WebApp/011-www-data-wifi
cp ./config/WebApp/011-www-data-wifi /etc/sudoers.d/011-www-data-wifi
#Make a scripts folder and copy the ifaceSetup script there
mkdir /etc/scripts
cp ./config/Networking/Interface/ifaceSetup.py /etc/scripts/ifaceSetup.py
/etc/scripts/ifaceSetup.py
