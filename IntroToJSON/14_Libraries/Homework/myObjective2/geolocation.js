
var map = null;

function returnLocation(lat,long)	{
	console.log('starting inside returnLocation()');
	findLocation;
	return lat,long;
}

console.log('looks like there is geolocation support');

function findLocation() {
	navigator.geolocation.getCurrentPosition(getLocation);
}

function getLocation(position) {
	var latitude = position.coords.latitude;
	var longitude = position.coords.longitude;
	
}

