function shutdown(){
	var xhr = new XMLHttpRequest;
	xhr.responseType = "text";
	xhr.addEventListener("load",function(){
		console.log(this.response);
	});
	xhr.open("POST","php/system.php");
	xhr.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
	xhr.send("mode=shutdown");
	if(document.getElementById("PowerStatus")!=null){
		PowerStatus.setAttribute("class","alert alert-info alert-dismissible fade show");
		PowerStatus.innerHTML += "<button type='button' class='close' data-dismiss='alert'>&times;</button>";
		PowerStatus.innerHTML += "<strong>Shutdown Initiated</strong>";
	}
}
function reboot(){
	var xhr = new XMLHttpRequest;
	xhr.responseType = "text";
	xhr.addEventListener("load",function(){
		console.log(this.response);
	});
	xhr.open("POST","php/system.php");
	xhr.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
	xhr.send("mode=reboot");
	if(document.getElementById("PowerStatus")!=null){
		PowerStatus.setAttribute("class","alert alert-info alert-dismissible fade show");
		PowerStatus.innerHTML += "<button type='button' class='close' data-dismiss='alert'>&times;</button>";
		PowerStatus.innerHTML += "<strong>Reboot Initiated</strong>";
	}
}
function diskUsage(){
	var xhr = new XMLHttpRequest;
	xhr.responseType = "text";
	xhr.addEventListener("load",function(){
		var data = this.response.split(" ");
		console.log(data[0]);
		console.log(data[1]);
		console.log(data[2]);
		if(document.getElementById("DiskBar")!=null){
			var progress = document.createElement("DIV");
			progress.setAttribute("style","width:" + data[2]);
			progress.innerHTML = "Used: " + data[2];
			if(parseInt(data[2]) < 25){
				progress.setAttribute("class","progress-bar bg-success");
			}else if (parseInt(data[2]) > 75){
				progress.setAttribute("class","progress-bar bg-warning");
			}else if (parseInt(data[2]) > 90){
				progress.setAttribute("class","progress-bar bg-danger");
			}else{
				progress.setAttribute("class","progress-bar");
			}
			DiskBar.appendChild(progress);
		}
	});
	xhr.open("POST","php/system.php");
	xhr.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
	xhr.send("mode=usage");
}