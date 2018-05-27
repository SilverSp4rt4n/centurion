function loadMenu(){
	console.log(this.response);
	var menu = document.getElementById("menu");
	var button = menu.lastChild;
	//console.log(button);
	for (var item in this.response){
		var newButton = document.createElement("BUTTON");
		newButton.setAttribute("class","menu-button collapsed");
		newButton.setAttribute("type","button");
		newButton.setAttribute("aria-expanded","false");
		newButton.setAttribute("data-toggle","collapse");
		newButton.setAttribute("data-target","#menu");
		newButton.innerText = this.response[item];
		console.log(newButton);
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
getMenu();
