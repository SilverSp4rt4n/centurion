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
function buildModal(ssid){
	//All of the new modal tags
	var newModal = document.createElement("DIV");
	var newDialog = document.createElement("DIV");
	var newContent = document.createElement("DIV");
	var newHeader = document.createElement("DIV");
	
	//Content to go inside of the modal
	var head = document.createElement("H4");
	var exit = document.createElement("BUTTON");

	//Configure Modal Tags
	newModal.setAttribute("class","modal");
	newModal.setAttribute("id",cleanssid(ssid)+"modal");
	newModal.ssid = ssid;

	newDialog.setAttribute("class","modal-dialog");
	
	newContent.setAttribute("class","modal-content");

	newHeader.setAttribute("class","modal-header");
	
	//Configure Content Tags
	head.setAttribute("class","modal-title");
	head.innerText = "Connect to " + ssid + ":";
	
	exit.setAttribute("type","button");
	exit.setAttribute("class","close");
	exit.setAttribute("data-dismiss","modal");
	exit.innerText = "\u00D7"

	
	newHeader.appendChild(head);
	newHeader.appendChild(exit);
	newContent.appendChild(newHeader);
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
function connectwifi(){
	var ssid = this.innerText;
	var xhr = new XMLHttpRequest;
	xhr.responseType = "text";
	xhr.addEventListener("load",connectresult);
	xhr.open("POST","php/wificonnect.php");
	xhr.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
	xhr.send("ssid="+ssid);
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
					children[i].parentNode.removeChild(children[i]);
			}
			
		}
		for (var item in this.response){
			if(inCurrentList(this.response[item])==false){
			var newButton = document.createElement("BUTTON");
			var newModal = buildModal(this.response[item]);
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
			container.appendChild(newModal);
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
