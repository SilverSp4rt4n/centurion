#!/usr/bin/python
import sys

path = "/etc/hostapd/hostapd.conf"
conf_file = open(path,"r")
conf_lines = conf_file.readlines()
conf_file.close()

def newSSID(ssid):
    for i in range(len(conf_lines)):
        if(conf_lines[i][0:4]=="ssid"):
            print(str(i)+": " + conf_lines[i])
            conf_lines[i]="ssid2=P\""+ssid+"\"\n"
    new_file = open(path,"w")
    new_file.writelines(conf_lines)
    new_file.close()

def newPass(password):
    for i in range(len(conf_lines)):
        if(conf_lines[i][0:14]=="wpa_passphrase"):
            print(str(i)+": " + conf_lines[i])
            conf_lines[i]="wpa_passphrase="+password
    new_file = open(path,"w")
    new_file.writelines(conf_lines)
    new_file.close()

if(len(sys.argv)<3):
    print("Usage: " + sys.argv[0] + " <mode ssid/password> <new ssid/password>")
    exit(-1)
elif(sys.argv[1] == "ssid"):
    newSSID(sys.argv[2])
elif(sys.argv[1] == "password"):
    newPass(sys.argv[2])
