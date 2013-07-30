window.onload = init;

//create global map variable
var map= null;

//object constructor for a thought
function Thought(id, text) {
	this.id = id;
	this.text = text;
}
function init() {
	var submit = document.getElementById("submit");
	submit.onclick = getThought;
}
//click event for when the user clicks on the submit button on form
//checks to see if user input a value and if so, creates a thought object
function getThought() {
	var aThought = document.getElementById("aThought").value;
	//is user didn't input value, then throw alert and return
	if (aThought == null || aThought == "") {
		alert("Please enter a thought with at least one word");
	return;
	}
	//Create new thought object
	//first create unique object id using time in milliseconds
	var id = (new Date()).getTime();
	//and then use the constructor function to create a new thought object
	//passing in the thought ID and the thought text from the form
	var thought = new Thought(id, aThought);
		// next, we get the location of the user
		// check and make sure the browser has the geolocation object
		if (navigator.geolocation) {
			//if so, go ahead and fetch the user's location using the geolocation object and it's
			//associated getCurrentPosition() method, passing as arguments both the getLocation() callback function
			//and a second callback function, locationError()
			navigator.geolocation.getCurrentPosition(getLocation, locationError);
		}
			//if no geolocation capability in browser, then throw alert and exit
		else {
			console.log("Sorry, no Geolocation support!");
			return;
		}
	//now we call the addThoughtToPage()function to display thought to page
	//passing in the thought object as an argument

	addThoughtToPage(thought);
}
//this is the function that displays the thought object to the page
function addThoughtToPage(thought) {
	var ul = document.getElementById("thoughts");
	var li = document.createElement("li");
	li.setAttribute("id", thought.id);
	var spanText = document.createElement("span");
	spanText.setAttribute("class", "thoughtText");
	spanText.innerHTML = thought.text;
	li.appendChild(spanText);
	ul.appendChild(li);
}
//function that obtains location/position of the user
function getLocation(position) {
	var latitude = position.coords.latitude;
	var longitude = position.coords.longitude;
	var myMapDiv = document.getElementById("myMap");
	myMapDiv.innerHTML = "I'm thinking at " + latitude + ", " + longitude;
	//check to see if the map object has been created yet, if not, we call
	//the showMap() function
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
//function that helps with errors during the getLocation function call
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