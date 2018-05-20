#!/usr/bin/python
from wifi import Cell, Scheme
networkList = Cell.all('wlan0')
encryption_file = open("./encrypt_data.txt","w")
address_file = open("./address_data.txt","w")
i = 0
while (i < len(networkList)):
	if (networkList[i].ssid!="The Sonic"):
		print networkList[i].ssid
		encryption_file.write(str(networkList[i].encryption_type)+"\n")
		address_file.write(str(networkList[i].address) + "\n")
	i += 1
encryption_file.close()
