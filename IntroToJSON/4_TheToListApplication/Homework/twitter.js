// JavaScript Document


//// Define a global variable (an array) to stash away the twitter JSON data /////

var tweetArray = new Array();

window.onload = init;

function init() {
	getTwitterData();
	//displayTwitterData();
}

function getTwitterData() {
	var request = new XMLHttpRequest();
	request.open("GET", "twitter.json");
	request.onreadystatechange = function() {
		if (this.readyState == this.DONE && this.status == 200) {
			if (this.responseText != null) {
				parseTwitterData(this.responseText);
				displayTwitterData(tweetArray);
			}
			else {
				console.log("Error: Data is empty");
			}
		}
	};

/// send request for JSON data to server ///
	request.send();
}

// displayTwitterData(tweetArray);

function parseTwitterData(twitterJSON) {
	if (twitterJSON == null || twitterJSON.trim() == "") {
	return;
	}
	var parsedObjectsArray = JSON.parse(twitterJSON);
	if (parsedObjectsArray.length == 0) {
		console.log("Error: the to-do list array is empty!");
		return;
	}
	for (var i = 0; i < parsedObjectsArray.length; i++) {
		var objectsArrayElement = parsedObjectsArray[i];
		tweetArray.push(objectsArrayElement);
	}
	console.log("Tweet data array: ");
	console.log(tweetArray);
}
// function that takes the twitter data array and displays in unordered list,
// iterating through each of the objects and displaying the elements of each object
function displayTwitterData(tweetArray)	{
	/// create an unordered list element
	var ul = document.getElementById('userList');
	var myArray = tweetArray;
	console.log(myArray);
	for (var i=0; i < tweetArray.length; i++)	{
		var tweetArrayItem = tweetArray[i];
		var li = document.createElement('li');
		li.innerHTML = tweetArrayItem.user.name + ": " + tweetArrayItem.text;
		ul.appendChild(li);
	}
}