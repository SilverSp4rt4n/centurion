#!/usr/bin/python
from wifi import Cell, Scheme
networkList = Cell.all('wlan0')
i = 0
while (i < len(networkList)):
	print networkList[i].ssid
	i += 1
