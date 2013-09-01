
var map = null;

console.log('looks like there is geolocation support');

function tryLocation() {
	navigator.geolocation.getCurrentPosition(getLocation);
}

//function called by init to get user's location
function getLocation(position) {
	var latitude = position.coords.latitude;
	var longitude = position.coords.longitude;
	//call the function that inserts the user's location into the html in hidden text at top of page
	//we need this hidden lat and long so we can then attach the user's location to any form submittals they do
	showUserLocation(latitude, longitude);
	
}
//function to insert the user's current location into the top of the page (into the div id='map' container)
//this lat and long is then used by the getFormData() for the latitude and longitude attributes of the submitted todo
function showUserLocation (latitude, longitude)	{
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

/////////////////////////////////functions to display map when user does a search ///////////////////////

function showMap(lat, long) {
	var googleLatLong = new google.maps.LatLng(lat, long);
	var mapOptions = {
		zoom: 12,
		center: googleLatLong,
		mapTypeId: google.maps.MapTypeId.ROADMAP
	};
	var mapDiv = document.getElementById("myMap");
	map = new google.maps.Map(mapDiv, mapOptions);
	map.panTo(googleLatLong);
}

function addMarker(lat, long) {
	var googleLatLong = new google.maps.LatLng(lat, long);
	var markerOptions = {
		position: googleLatLong,
		map: map,
		title: "To do list created here"
	}
	var marker = new google.maps.Marker(markerOptions);
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