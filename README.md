# Project Centurion
## Description
A multi-part software suite focused on making security-based Raspberry Pi projects more accessible.
## Version List
|Version Number|Changes													           |
|--------------|-------------------------------------------------------------------------------------------------------------------|
|1.0.0         |First release, contains core functionality for running built-in wireless network and managing Wifi connections.    |
|1.1.0	       |Web Application has been updated with an authentication system and a functional GUI for managing Wi-Fi connections.|
|1.1.2	       |Centurion\_CTF added. Supports deploying vulnerable local and network services from C,C++ & Python source code.    |

## Todo List
* Centurion\_Core
  * Support changing web app credentials inside the web application
  * Support changing the access point SSID and password inside the web application
* Centurion\_CTF
  * Create "Live Mode": an operation which locks down the Pi during a CTF competition
  * Support uploading .zip files with C/C++ source code and a makefile
  * Support vulnerable web application services via uploading a .zip file of the web app

## Installation
To install Centurion\_Core, run setup.sh inside the centurion\_core folder.
To install Centurion\_CTF, run install.sh inside the centurion\_ctf folder.
