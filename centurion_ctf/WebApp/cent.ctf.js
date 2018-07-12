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
		var item = document.createElement("A");
		item.setAttribute("class","dropdown-item");
		item.setAttribute("onclick","dropSelect('--None--','flagDrop')");
		item.innerText="--None--";
		flagMenu.appendChild(item);
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
function getServices(){
	var xhr = new XMLHttpRequest();
	xhr.addEventListener("load",function(){
		serviceTableBody.innerHTML = "";
		var json_data = JSON.parse(this.response);
		for(var key in json_data){
			//Build new table
			var newRow = document.createElement("TR");
			var Service = document.createElement("TD");
			var Flag = document.createElement("TD");
			var ServiceType = document.createElement("TD");
			var User = document.createElement("TD");
			var Status = document.createElement("TD");
			var Erase = document.createElement("BUTTON");
			Service.innerHTML = key;
			Flag.innerHTML = json_data[key]["Flag"];
			ServiceType.innerHTML = json_data[key]["Service Type"];
			User.innerHTML = json_data[key]["User"];
			Status.innerHTML = json_data[key]["Status"];
			if(json_data[key]["Status"]=="Running" || json_data[key]["Status"]=="Installed."){
				newRow.setAttribute("class","table-success");
			}else if(json_data[key]["Status"]=="Missing Flag"){
				newRow.setAttribute("class","table-warning");
			}else{
				newRow.setAttribute("class","table-danger");
			}
			Erase.setAttribute("class","btn btn-danger");
			Erase.innerHTML = "Erase";
			Erase.setAttribute("onclick","eraseService(\""+key+"\")");
			newRow.appendChild(Service);
			newRow.appendChild(ServiceType);
			newRow.appendChild(Flag);
			newRow.appendChild(User);
			newRow.appendChild(Status);
			newRow.appendChild(Erase);
			serviceTableBody.appendChild(newRow);

		}
	});
	xhr.responseType="text";
	xhr.open("POST","php/CTF.php");
	xhr.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
	xhr.send("mode=getservices");
}
function eraseService(service){
	var xhr = new XMLHttpRequest();
	xhr.addEventListener("load",function(){
		console.log(this.response);
		getServices();
	});
	xhr.responseType="text";
	xhr.open("POST","php/CTF.php");
	xhr.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
	xhr.send("mode=eraseservice&service="+service);
}
function deployLocal(){
	var xhr = new XMLHttpRequest();
	xhr.addEventListener("load",function(){
		console.log(this.response);
		getServices();
	});
	xhr.responseType="text";
	xhr.open("POST","php/CTF.php");
	xhr.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
	var request = "mode=deploylocal&source="+ sourceDrop.innerText + "&flag=" + flagDrop.innerText;
	console.log(request);
	xhr.send(request);
	alert("Local Service " + sourceDrop.innerText + " deployed.");
}
function deployNetwork(){
	var xhr = new XMLHttpRequest();
	xhr.addEventListener("load",function(){
		console.log(this.response);	
		getServices();
	});
	xhr.responseType="text";
	xhr.open("POST","php/CTF.php");
	xhr.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
	var request = "mode=deploynetwork&source="+ sourceDrop.innerText + "&flag=" + flagDrop.innerText;
	console.log(request);
	xhr.send(request);
	alert("Network Service " + sourceDrop.innerText + " deployed.");
}
function deploy(){
	if(serviceDrop.innerText=="Local Service"){
		deployLocal();
	}
	if(serviceDrop.innerText=="Network Service"){
		deployNetwork();
	}
}
setInterval(getServices,5000);
