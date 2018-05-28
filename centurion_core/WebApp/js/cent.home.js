function displayPage(){
	var container = document.getElementById("pageContainer");
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
	var xhr = new XMLHttpRequest();
	xhr.addEventListener("load",loadMenu);
	xhr.responseType="json";
	xhr.open("GET","php/pagelist.php");
	xhr.send();
	
}
function main(){
	getMenu();
	var xhr = new XMLHttpRequest();
	xhr.addEventListener("load",function() {
		var container = document.getElementById("pageContainer");
		container.innerHTML = this.response;
	});
	xhr.responseType="text";
	xhr.open("GET","Home.html");
	xhr.send();
	setInterval(listwifi,10*1000);
}
main();
