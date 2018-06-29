function test(){
	console.log("Hello, World!");
}
function dropSelect(selection,id){
	document.getElementById(id).innerText=selection;
}
function getSourceList(){
	var xhr = new XMLHttpRequest();
	xhr.addEventListener("load",function(){
		sourceMenu.innerHTML = "";
		for(var file in this.response){
			var item = document.createElement("A");
			item.setAttribute("class","dropdown-item");
			item.setAttribute("onclick","dropSelect('"+this.response[file]+"','sourceDrop')");
			item.innerText=this.response[file];
			sourceMenu.appendChild(item);
		}
	});
	xhr.responseType="json";
	xhr.open("POST","php/CTF.php");
	xhr.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
	xhr.send("mode=list");
}
function getFlagList(){
	var xhr = new XMLHttpRequest();
	xhr.addEventListener("load",function(){
		flagMenu.innerHTML = "";
		for(var file in this.response){
			var item = document.createElement("A");
			item.setAttribute("class","dropdown-item");
			item.setAttribute("onclick","dropSelect('"+this.response[file]+"','flagDrop')");
			item.innerText=this.response[file];
			flagMenu.appendChild(item);
		}
	});
	xhr.responseType="json";
	xhr.open("POST","php/CTF.php");
	xhr.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
	xhr.send("mode=flaglist");
}
