/* 
this is a js file to use in tandem with the Ls13Quiz1.html file for part 3 of the quiz
where we are testing the 'enableHighAccuracy' positionOption

*/

window.onload = init;

//create global map variable
var map= null;

function init() {
	//create onclick event for submit button, user clicks submit, app runs getLocation()
	var submit = document.getElementById("submit");
	submit.onclick = getLocation;
}
          
function getLocation() {
    var positionOptions = {
            enableHighAccuracy: true
        };
	
	if (navigator.geolocation) {
		//use the high accuracy option here (pass in positionOptions variable)
		navigator.geolocation.getCurrentPosition(getMyLocation, locationError, positionOptions);
    }
    else {
        console.log("Sorry, no Geolocation support!");
    }
}
/*
function getMyLocation(position) {
    var latitude = position.coords.latitude;
    var longitude = position.coords.longitude;
	var accuracy = position.coords.accuracy;
    alert("My position is: " + latitude + ", " + longitude + " and the accuracy is: " + accuracy);
}
*/

//function that obtains location/position of the user
function getMyLocation(position) {
	var latitude = position.coords.latitude;
	var longitude = position.coords.longitude;
	var accuracy = position.coords.accuracy;
	var myMapDiv = document.getElementById("myMap");
	//display the numerical value of the lat, long and accuracy of the user's position
	myMapDiv.innerHTML = "I'm located at " + latitude + ", " + longitude + " and the accuracy is: " + accuracy + "</br>";
	//check to see if the map object has been created yet, if not, we call the google map's api showMap() function
	if (!map) {
	showMap(latitude, longitude);
	}
}

//google maps api function
function showMap(lat, long) {
	var googleLatLong = new google.maps.LatLng(lat, long);
	var mapOptions = {
		zoom: 12,
		center: googleLatLong,
		mapTypeId: google.maps.MapTypeId.ROADMAP
	};
	var mapDiv = document.getElementById("map");
	map = new google.maps.Map(mapDiv, mapOptions);
	console.log(map);
	map.panTo(googleLatLong);
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