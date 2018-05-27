#!/usr/bin/python
import os
import sys
def disconnect():
	os.system("nmcli dev disconnect wlan0")

disconnect()
