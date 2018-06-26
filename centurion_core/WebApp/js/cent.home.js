var valid_session = "";
function getCookie(cname){
	var name = cname + "=";
	var decodedCookie = decodeURIComponent(document.cookie);
	var ca = decodedCookie.split(';');
	for(var i = 0; i < ca.length; i++){
		var c = ca[i];
		while(c.charAt(0) == ' '){
			c = c.substring(1);
		}
		if (c.indexOf(name) == 0){
			return c.substring(name.length,c.length);
		}
	}
	return "";
}
function checkSession(){
	var xhr = new XMLHttpRequest();
	xhr.addEventListener("load",function(){
		console.log(this.response);
		var cookies = document.cookie;
		//check if sessionid is valid
		if(this.response == "true"){
		var xhrr = new XMLHttpRequest();
		xhrr.addEventListener("load",function() {
		var container = document.getElementById("pageContainer");
		container.innerHTML = this.response;
		});
		xhrr.responseType="text";
		xhrr.open("GET","Home.html");
		xhrr.send();
		}
	});
	xhr.responseType="text";
	xhr.open("GET","php/check_auth.php");
	xhr.send();

}
function displayPage(){
	//get pageContainer
	var container = document.getElementById("pageContainer");
	
	//Run any inline javascript
	var startIndex = this.response.indexOf("<script>") + "<script>".length;
	var endIndex = this.response.indexOf("</script>") - "</script>".length;
	console.log(startIndex+":"+endIndex);
	if(startIndex>=0 && endIndex>=0){
		eval(this.response.substr(startIndex,endIndex));
	}

	//Display new page
	container.innerHTML = this.response;
}
function importPage(){
	console.log(this.innerText);
	var xhr = new XMLHttpRequest();
	xhr.addEventListener("load",displayPage);
	xhr.responseType="text";
	xhr.open("GET",this.innerText + ".html");
	xhr.send();
}
function loadMenu(){
	console.log(this.response);
	var menu = document.getElementById("menu");
	var button = menu.lastChild;
	for (var item in this.response){
		var newButton = document.createElement("BUTTON");
		
		newButton.setAttribute("class","menu-button collapsed");
		newButton.setAttribute("type","button");
		newButton.setAttribute("aria-expanded","false");
		newButton.setAttribute("data-toggle","collapse");
		newButton.setAttribute("data-target","#menu");
		newButton.addEventListener("click",importPage)
		newButton.innerText = this.response[item];
		
		menu.appendChild(newButton);
	}
}
function getMenu(){
	var cookies = document.cookie;
	if(cookies.indexOf('sessionid') >= 0){
	var xhr = new XMLHttpRequest();
	xhr.addEventListener("load",loadMenu);
	xhr.responseType="json";
	xhr.open("POST","php/pagelist.php");
	xhr.send("sessionid="+getCookie("sessionid"));
	}
	
}
function main(){
	checkSession();
	getMenu();
	setInterval(listwifi,10*1000);
}
main();
