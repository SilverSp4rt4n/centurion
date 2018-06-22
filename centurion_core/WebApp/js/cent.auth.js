function login()
{
	console.log("Trying to log in with username " + username.value + " and password " + password.value);
	var xhr = new XMLHttpRequest;
	xhr.responseType = "text";
	xhr.addEventListener("load",function(){
		console.log(this.response);
		var data = this.response.split(":");
		console.log(data);
		if(data[0]=="1"){
		loginstatus.innerText = "Login Successful!";
		document.cookie="sessionid="+data[1];
		location.reload();
		}else{
		loginstatus.innerText = "Invalid username or password";
		}
	});
	xhr.open("POST","php/auth.php");
	xhr.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
	xhr.send("username="+username.value+"&password="+password.value);
}
function logout()
{
	var xhr = new XMLHttpRequest;
	xhr.responseType = "text";
	xhr.addEventListener("load",function(){
		console.log(this.response);
		location.reload();
	});
	xhr.open("GET","php/logout.php");
	xhr.send();
}
