console.log('we are now in the geolocation.js file');

var map = null;

function findLocation() {
	navigator.geolocation.getCurrentPosition(displayLocation);
	console.log('we say this from the geolocation.js file');
}
function displayLocation(position) {
	var latitude = position.coords.latitude;
	var longitude = position.coords.longitude;
	console.log("Just used Geolocation to get your Lat/Long: " + latitude + ", " + longitude);
	if (!map) {
		console.log('inside !map logic');
		showMap(latitude, longitude);
		}
	addMarker(latitude, longitude);
}

function showMap(lat, long) {
	console.log('inside showMap function');
	var googleLatLong = new google.maps.LatLng(lat, long);
	var mapOptions = {
		zoom: 12,
		center: googleLatLong,
		mapTypeId: google.maps.MapTypeId.ROADMAP
	};
	var mapDiv = document.getElementById("map");
	map = new google.maps.Map(mapDiv, mapOptions);
	map.panTo(googleLatLong);
}

function addMarker(lat, long) {
	var googleLatLong = new google.maps.LatLng(lat, long);
	var markerOptions = {
		position: googleLatLong,
		map: map,
		title: "Where I'm thinking today"
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

//call the function to find the user's location
findLocation();