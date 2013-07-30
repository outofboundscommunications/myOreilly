/* The position.coords object that you use to access the latitude and longitude in your success 
callback handler function has another property, accuracy, that provides an estimate of the accuracy of the 
location reported by Geolocation, in meters.
Update the code below to add accuracy to your alert when you display the location retrieved using Geolocation.
*/

window.onload = init;

function init() {
	var submit = document.getElementById("submit");
	submit.onclick = getLocation;
}
//click event for when the user clicks on the submit button on form
//checks to see if user input a value and if so, creates a thought object

function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(getMyLocation, locationError);
    }
    else {
        console.log("Sorry, no Geolocation support!");
    }
}
function getMyLocation(position) {
    var latitude = position.coords.latitude;
    var longitude = position.coords.longitude;
	//here we add in the new property to get the accuracy measurement from
	//the position.coords object
	var accuracy = position.coords.accuracy;
    alert("My position is: " + latitude + ", " + longitude + " and the accuracy is: " + accuracy);
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