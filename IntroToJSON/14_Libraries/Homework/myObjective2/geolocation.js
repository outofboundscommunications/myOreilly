
var map = null;

console.log('looks like there is geolocation support');

function tryLocation() {
	navigator.geolocation.getCurrentPosition(getLocation);
}

function getLocation(position) {
	var latitude = position.coords.latitude;
	var longitude = position.coords.longitude;
	
}

