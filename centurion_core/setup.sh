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
echo "net.ipv4.ip_forward = 1" >> /etc/sysctl.conf
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
#Copy the wifi suite to /usr/bin
cp ./config/Networking/Wireless/listWifi.py /usr/bin/wifi-list
cp ./config/Networking/Wireless/wifiConnect.py /usr/bin/wifi-connect
cp ./config/Networking/Wireless/wifiDisconnect.py /usr/bin/wifi-disconnect
#Copy the AP manager to /usr/bin
cp ./config/Networking/Access_Point/ap-manage.py /usr/bin/ap-manage
#Add Necessary Sudo privileges to www-data
sudo chown root ./config/WebApp/011_www-data-wifi
sudo cp ./config/WebApp/011_www-data-wifi /etc/sudoers.d/011_www-data-wifi
#Add Webapp authentication files
sudo mkdir /etc/auth
sudo cp ./config/WebApp/auth/* /etc/auth/
sudo chown www-data.www-data /etc/auth/credentials.json
sudo chown www-data.www-data /etc/auth/sessions.json
sudo chmod 600 /etc/auth/credentials.json
sudo chmod 600 /etc/auth/sessions.json
Make a scripts folder and copy the ifaceSetup script there
mkdir /etc/scripts
cp ./config/Networking/Interface/ifaceSetup.py /etc/scripts/ifaceSetup.py
/etc/scripts/ifaceSetup.py
