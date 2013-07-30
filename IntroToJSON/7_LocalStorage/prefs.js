// JavaScript Document

// localStorage methods in use here:
	// setItem()
	// removeItem()
	// getItem()
	// key()

window.onload = init;

function init() {
	
	addItem("favGenre", "fiction");
	addItem("favFlavor", "Vanilla Chocolate Chip");
	addItem("book", "Head First HTML5 Programming");
	addItem("browserWidth", 1280);
	addItem("appleType", "red");
	addItem("favTea", "English Breakfast");
	getItem("browserWidth");
	removeItem("appleType");
	showAllPrefs();
}


/// example of using the .setItem method to store items in local storage ////
function addItem(key, value) {
	// add the key and value to local storage
	localStorage.setItem(key, value);
	// then call another function to add it to the page
	//addToList(key, value);
} 

/// example of using the .removeItem method to remove items from local storage ////
function removeItem(key) {
	localStorage.removeItem(key);
}
	
/// example of using the .getItem method to retrieve items from local storage ////
function getItem(key) {
	var value = localStorage.getItem(key);
	alert("Item: " + key + ": " + value + "(" + (typeof value) + ")");
} 

// example of how to print items to the screen, adding the key, value pair to the DOM as a <li> item
function addToList(key, value) {
	var ul = document.getElementById("items");
	var li = document.createElement("li");
	li.innerHTML = "Key: " + key + ", value: " + value;
	"Key: " + key + ", value: " + value;
	ul.appendChild(li);
}
/// example of how to iterate through all the items in local storage ////
function showAllPrefs() {
	var myLength = localStorage.length;
	console.log(myLength);
	for (var i = 0; i < localStorage.length; i++) {
		key = localStorage.key(i);
		value = localStorage.getItem(key);
		addToList(key, value);
	}
}