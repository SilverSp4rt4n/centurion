#!/usr/bin/python
#This script needs to be changed to use local linux methods of gathering MAC addresses
import os
import sys

def macCheck(iface):
	output = os.popen("ip addr | grep ether")
	array = output.readlines()
        dataLines = []
        for line in array:
            dataLines += [line]
        for i in range(len(dataLines)):
            dataLines[i] = dataLines[i][15:]
            dataLines[i] = dataLines[i][:len(dataLines[i])-23]
        dataLines.pop(0)
        for line in dataLines:
            print(line)
        for line in dataLines:
            print(line)
            new_command = 'SUBSYSTEM=="net", ACTION=="add", ATTR{address}=="'+line+'", NAME="wap0"'
	    dataCheck = line[:8]
	    print dataCheck
	    print new_command
	    if "b8:27:eb" in dataCheck:
		    print "This is a Pi interface!"
		    writefile = open("/etc/udev/rules.d/70-ap_interface.rules","w")
		    writefile.write(new_command)
		    writefile.close()
		    os.popen("reboot")
	    else:
		    print "This is NOT a Pi interface!"

macCheck("wlan0")
