
var map = null;

console.log('looks like there is geolocation support');

function tryLocation() {
	navigator.geolocation.getCurrentPosition(getLocation);
}

function getLocation(position) {
	var latitude = position.coords.latitude;
	var longitude = position.coords.longitude;
	showMap(latitude, longitude);
	
}

function showMap (latitude, longitude)	{
	console.log('inside showmap');
	console.log(latitude, longitude);
	var div = document.getElementById("map");
	var latSpan = document.createElement("span");
	latSpan.setAttribute("id","latspan");
	latSpan.innerHTML = latitude;
	var longSpan = document.createElement("span");
	longSpan.setAttribute("id","longspan");
	longSpan.innerHTML = longitude;
    div.appendChild(latSpan);
	div.appendChild(longSpan);
	console.log('the latSpan and longSpan are added to DOM');
}

function locationError(error) {
	var errorTypes = {
	0: "Unknown error",
	1: "Permission denied by user",
	2: "Position not available",
	3: "Request timed out"
	};
	var errorMessage = errorTypes[error.code];
	if (error.code == 0 || error.code == 2) {
	errorMessage += " " + error.message;
	}
	console.log(errorMessage);
	alert(errorMessage);
}