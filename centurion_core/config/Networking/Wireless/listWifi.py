#!/usr/bin/python
from wifi import Cell, Scheme
networkList = Cell.all('wlan0')
i = 0
while (i < len(networkList)):
	if (networkList[i].ssid!="The Sonic"):
		print networkList[i].ssid
	i += 1
encryption_file.close()
