function loadwifi(){
	console.log(this.response);
	var container = document.getElementById("WifiContainer");
	if(container!=null){
		while(container.childElementCount > 1){
			container.removeChild(container.lastChild);
		}
		for (var item in this.response){
			var newButton = document.createElement("BUTTON");
			newButton.setAttribute("class","menu-button");
			newButton.setAttribute("type","button");
			//newButton.addEventListener("click",importPage)
			newButton.innerText = this.response[item];		
			
			container.appendChild(newButton);
		}
		if (this.response.length==0){
			var loadingImg = document.createElement("IMG");
			loadingImg.setAttribute("class","loading-icon");
			loadingImg.setAttribute("src","images/loadingwifi.gif");
			loadingImg.setAttribute("alt","Loading Wi-Fi...");
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
