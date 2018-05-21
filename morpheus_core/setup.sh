#Switch to root user
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
cp ./config/root_crontab /var/spool/cron/crontabs/root
#Setup Web Server
apt-get install apache2 -y
cp ./WebApp/* /var/www/html/
#Make a scripts folder and copy the ifaceSetup script there
mkdir /etc/scripts
cp ./config/Networking/Interface/ifaceSetup.py /etc/scripts/ifaceSetup.py
/etc/scripts/ifaceSetup.py
