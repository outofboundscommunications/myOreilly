// JavaScript Document

window.onload = init;

function init() {

	addItem("favFlavor", "Vanilla Chocolate Chip");
	addItem("book", "Head First HTML5 Programming");
	addItem("browserWidth", 1280);
	addItem("appleType", "red");
	addItem("isItHot","true");
	showAllPrefs();
}

/// use the .setItem method to store items in local storage ////
function addItem(key, value) {
	// add the key and value to local storage
	localStorage.setItem(key, value);
} 
	
// Print items to the screen, adding the key, value pair to the DOM as a <li> item
function addToList(key, value) {
	var ul = document.getElementById("items");
	var li = document.createElement("li");
	li.innerHTML = "Key: " + key + ", value: " + value;
	"Key: " + key + ", value: " + value;
	ul.appendChild(li);
}
/// Iterate through all the items in local storage ////
/// Retrieve the key/value pairs from the localStorage associative array
function showAllPrefs() {
	for (var i = 0; i < localStorage.length; i++) {
		key = localStorage.key(i);
		value = localStorage[key];
		//value = localStorage.getItem(key);
		addToList(key, value);
	}
}