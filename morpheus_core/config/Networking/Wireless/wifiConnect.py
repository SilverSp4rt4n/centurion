#!/usr/bin/python
import os
import sys
try:
	ssid=sys.argv[1]
	password=sys.argv[2]
	encryption=sys.argv[3]
except:
	print "Syntax: \n"
	print "./wifiConnect.py <ssid> <password> <wpa/wep>"
	sys.exit()
def connect(ssid,password,encryption):
	if (encryption=="wep"):
		os.system("nmcli dev wifi connect '"+ssid  + "' wep-key-type "+ password)
	elif (encryption=="wpa"):
		os.system("nmcli dev wifi connect '"+ssid + "' password " + password)
	elif (encryption=="--"):
		os.system("nmcli dev wifi connect '"+ssid +  "' iface wlan0")
	else:
		print "\nInvalid encryption type. Please either type wpa or wep"
		sys.exit()

connect(ssid,password,encryption)
