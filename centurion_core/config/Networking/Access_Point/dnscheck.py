#!/usr/bin/python
import os

default_file = open("/etc/udhcpd.conf.def","r")
def_lines = default_file.readlines()
default_file.close()
conf_file = open("/etc/udhcpd.conf","w")
conf_file.writelines(def_lines)
conf_file.close()
def newDns():
	new_conf = open("/etc/udhcpd.conf","a")
	process = os.popen('nmcli device show wlan0 | grep IP4.DNS')
	output = process.readlines()
	process.close()
	i = 0
	while (i<len(output)):
		str =  output[i]
		str = str[11:]
		str = str.strip()
		str = "opt     dns     "+str+"\n"
		new_conf.write(str)
		i+=1
	new_conf.close()
	dhcpid = os.popen('ps -A | grep "udhcpd"')
	output=dhcpid.readlines()
	out_line=output[0]
	out_line = out_line[:6]
	out_line = out_line.strip()
	os.popen('kill ' + out_line)
	os.popen('udhcpd /etc/udhcpd.conf')
newDns()
