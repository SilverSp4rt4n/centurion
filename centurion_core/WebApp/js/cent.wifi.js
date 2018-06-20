function inNextList(ssid,response){
	for(var i = 0; i < response.length;i++){
		if(response[i]==ssid){
			return true;
		}
	}
	return false;
}
function inCurrentList(ssid){
	var children = document.getElementById("WifiContainer").children;
	var iterator = children.length;
	for (var i = 0; i < iterator; i++){
		var child = children[i];
		if(child.ssid==ssid){
			return true;
		}
	}
	return false;
}
function getEncryption(ssid,encryptionType){
	
	var xhr = new XMLHttpRequest;
	xhr.responseType = "text";
	xhr.addEventListener("load",function(){
		if(encryptionType!=null){
			encryptionType.innerText=this.response;
		}
	});
	xhr.open("POST","php/wificonnect.php");
	xhr.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
	xhr.send("ssid="+ssid+"&mode=encryption");
	
}
function buildModal(ssid){
	//All of the new modal tags
	var newModal = document.createElement("DIV");
	var newDialog = document.createElement("DIV");
	var newContent = document.createElement("DIV");
	var newHeader = document.createElement("DIV");
	var newBody = document.createElement("DIV");
	
	//Content to go inside of the modal
	var head = document.createElement("H4");
	var exit = document.createElement("BUTTON");
	var label = document.createElement("P");
	var passInput = document.createElement("INPUT");
	var encryptionType = document.createElement("P");
	var connectButton = document.createElement("BUTTON");
	var connectionStatus = document.createElement("P");

	//Configure Modal Tags
	newModal.setAttribute("class","modal");
	newModal.setAttribute("id",cleanssid(ssid)+"modal");
	//newModal.ssid = ssid;

	newDialog.setAttribute("class","modal-dialog");
	
	newContent.setAttribute("class","modal-content");

	newHeader.setAttribute("class","modal-header");
	
	newBody.setAttribute("class","modal-body");

	//Configure Content Tags
	head.setAttribute("class","modal-title");
	head.innerText = "Connect to " + ssid + ":";
	
	exit.setAttribute("type","button");
	exit.setAttribute("class","close");
	exit.setAttribute("data-dismiss","modal");
	exit.innerText = "\u00D7"

	label.innerText = "Password:";
	
	passInput.setAttribute("type","password");
	passInput.setAttribute("id","passInput"+cleanssid(ssid));
	
	connectionStatus.setAttribute("id","status"+cleanssid(ssid));
	
	connectButton.innerText = "Connect";
	connectButton.setAttribute("type","button");
	connectButton.setAttribute("class","btn btn-primary");
	connectButton.onclick = function(){
		connectionStatus.innerText="Attempting to connect...";
		console.log("Connecting to " + ssid);
		var password = document.getElementById("passInput"+cleanssid(ssid)).value;
		console.log("Trying password " + password);
		var xhr = new XMLHttpRequest;
		xhr.responseType = "text";
		xhr.addEventListener("load",function(){
			if(connectionStatus!=null){
				if(this.response.indexOf("success")>=0){
				connectionStatus.innerText="Connected!";
				}else{
				connectionStatus.innerText="Failed.";
				}
				console.log(this.response);
			}
		});
		xhr.open("POST","php/wificonnect.php");
		xhr.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
		xhr.send("ssid="+ssid+"&mode=connect&password="+password);
	};

	getEncryption(ssid,encryptionType);
	
	//Append everything
	newBody.appendChild(label);
	console.log(encryptionType.innerText);
	newBody.appendChild(passInput);
	newBody.appendChild(encryptionType);
	newBody.appendChild(connectButton);
	newBody.appendChild(connectionStatus);
	newHeader.appendChild(head);
	newHeader.appendChild(exit);
	newContent.appendChild(newHeader);
	newContent.appendChild(newBody);
	newDialog.appendChild(newContent);
	newModal.appendChild(newDialog);
	return newModal;
}
function cleanssid(theString){
	theString = theString.replace(/[^0-9a-z]/gi,'');
	return theString;
}
function connectresult(){
	console.log(this.response);
}
function loadwifi(){
	var container = document.getElementById("WifiContainer");
	var itemArray = [];
	for (var item in this.response){
		itemArray.push(this.response[item]);
	}
	console.log(itemArray);
	if (container.childElementCount < 2){
		var loadingImg = document.createElement("IMG");
		loadingImg.setAttribute("class","loading-icon");
		loadingImg.setAttribute("src","images/loadingwifi.gif");
		loadingImg.setAttribute("alt","Loading Wi-Fi...");
	}
	if(container!=null){
		loadingNode = document.getElementById("WifiLoading");
		if(loadingNode!=null){
			loadingNode.parentNode.removeChild(loadingNode);
		}
		var children = container.children;
		console.log(container.children.length);
		var iterator = children.length
		for(var i = iterator-1; i >= 0; i-- ) {
			if(inNextList(children[i].ssid,itemArray)==false && children[i].tagName!="H4"){
				if(children[i].id.indexOf("modal")<0){	
				children[i].parentNode.removeChild(children[i]);
				}
			}
			
		}
		for (var item in this.response){
			if(inCurrentList(this.response[item])==false){
			var newButton = document.createElement("BUTTON");
			if(document.getElementById(cleanssid(this.response[item])+"modal")==null){
			var newModal = buildModal(this.response[item]);
			container.appendChild(newModal);
			}
			newButton.setAttribute("id",cleanssid(this.response[item])+"btn");
			newButton.setAttribute("class","menu-button");
			newButton.setAttribute("type","button");
			newButton.setAttribute("data-toggle","modal");
			newButton.setAttribute("data-target","#"+cleanssid(this.response[item])+"modal");
			//newButton.addEventListener("click",loadwifi);
			newButton.innerText = this.response[item];		
			newButton.ssid = this.response[item];
			newButton.myModal = cleanssid(this.response[item]) + "modal";

			container.appendChild(newButton);
			}
		}
	}
}
function listwifi(){
	if(document.getElementById("WifiContainer")!=null){
		var xhr = new XMLHttpRequest();
		xhr.addEventListener("load",loadwifi);
		xhr.responseType="json";
		xhr.open("GET","php/wifilist.php");
		xhr.send();
	}
}
