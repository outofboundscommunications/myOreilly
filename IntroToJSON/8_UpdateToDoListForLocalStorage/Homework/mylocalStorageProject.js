//Object constructor for the color object
//each time a user submits the form, all those five
//color values from the form are stored in this object
//with a unique Id created from incrementing the maxColorId counter
function UserColor(colorId, color1,color2,color3,color4,color5) {
	this.colorId=colorId;
	this.color1=color1;
	this.color2=color2;
	this.color3=color3;
	this.color4=color4;
	this.color5=color5;
}
// this is an array to hold all the individual UserColor objects defined above
//each time the form is submitted a color object is created
//and stored in this array (as well as local storage)
var theColors = new Array();

// global variable to keep track of how many colors there 
// are so we can use it as part of the colorId key.
// The key will look like: colorId = maxColorId+1
var maxColorId = 0;

window.onload = init;

function init() {
	var submitButton = document.getElementById("submit");
	submitButton.onclick = getFormData;
	//on page load, run getTheColors() function to fetch all the
	//local storage items and add to page
	getTheColors();
}

function getTheColors()	{
	//look for all the keys in the key/value pairs in local storage that
	//match what we want (the key must start with 'color'.
	//Once we find those matching pairs, parse the strings into objects
	//and store them in the global array of all the colors
	if (localStorage) {
		for (var i = 0; i < localStorage.length; i++) {
		var key = localStorage.key(i);
			//if the first four characters of the key match 'todo'
			//then go ahead and parse that particular todo item into object
			if (key.substring(0, 5) == "color") {
			//store that key's value into temporary variable, item
			var item = localStorage.getItem(key);
			//and parse that string back into an object
			var colorItem = JSON.parse(item);
			//and push that object into the [todoItem] array
			theColors.push(colorItem);
			//increment the colors counter by 1
			maxColorId++;
			}
		}
		//after the above, go ahead and add all the color items from [colorsArray] to the page
		addColorsToPage();
	}
	else {
		console.log("Error: you don't have localStorage!");
	}
} 
//this function adds ALL the colors stored in the colors array
//to the page when it is first loaded
function addColorsToPage() {
	var ul = document.getElementById("colors");
	var listFragment = document.createDocumentFragment();
	for (var i = 0; i < theColors.length; i++) {
		var colorItem = theColors[i];
		var li = createNewColorList(colorItem);
		listFragment.appendChild(li);
	}
	ul.appendChild(listFragment);
} 

function addColorToPage(myColors) {
	var ul = document.getElementById("colors");
	var li = createNewColorList(myColors);
	ul.appendChild(li);
} 

function createNewColorList(colorItem) {
	var li = document.createElement("li");
	li.innerHTML =
		colorItem.color1 + " needs to " + colorItem.color2 + colorItem.color3 + colorItem.color4 + colorItem.color5;
	return li;
}
function getFormData() {
	//assign each of the five field values to corresponding variable
	var color1 = document.getElementById("color1").value;
	if (checkInputText(color1, "Please enter a 1st color")) return;
	var color2 = document.getElementById("color2").value;
	if (checkInputText(color2, "Please enter a 2nd color")) return;
	var color3 = document.getElementById("color1").value;
	if (checkInputText(color3, "Please enter a 3rd color")) return;
	var color4 = document.getElementById("color4").value;
	if (checkInputText(color4, "Please enter a forth color")) return;
	var color5 = document.getElementById("color5").value;
	if (checkInputText(color5, "Please enter a 5th color")) return;
	//create a unique ID for this color object
	var colorId = "color"+ maxColorId;
	//create a new color Object
	var myColors = new UserColor(colorId,color1,color2,color3,color4,color5);
	theColors.push(myColors);
	//add the color item to page
	addColorToPage(myColors);
	//finally we save the todo object to local storage
	saveColorItem(myColors);
	maxColorId++;
}
function checkInputText(value, msg) {
	if (value == null || value == "") {
	alert(msg);
	return true;
	}
	return false;
}
//function that takes the todoItem object with a unique id property
//converts to a string and stores in local storage
function saveColorItem(myColors) {
	//check to make sure browser has localStorage object
	if (localStorage) {
	//if so, create a key using the string 'color' + the next increment of the maxColorId counter
	var key = "color" + (maxColorId);
	//convert the todoItem object to a string with JSON.stringify() method
	var item = JSON.stringify(myColors);
	//now we have a key, value pair where the key is the unique ID
	//and the value is the todo item string created from the todoItem object
	//so we can now store this key/value pair in local storage
	//use the .setItem() method of the localStorage object to do that
	localStorage.setItem(key, item);
	}
	//if they dont have local storage, throw an error
	else {
		console.log("Error: you don't have localStorage!");
	}
}