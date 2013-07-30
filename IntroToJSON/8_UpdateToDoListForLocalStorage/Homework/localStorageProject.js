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
	//locally stored color items and add to page
	getTheColors();
	addColorsToPage();
}

function getTheColors()	{
	//look for all the keys in the key/value pairs in local storage that
	//match what we want (the key must start with 'Color').
	//Once we find those matching pairs, parse the strings into objects
	//and store them in the global colors array [theColors]
	if (localStorage) {
		for (var i = 0; i < localStorage.length; i++) {
		//iterate thru each name/value pair in local storage
		//looking for the key we want
		var key = localStorage.key(i);
			//if the first five characters of the key match 'Color'
			if (key.substring(0, 5) == "Color") {
			//then go ahead and save the corresponding value in temp variable
			var theColor = localStorage.getItem(key);
			//and then push that value into [theColors] array
			theColors.push(theColor);
			}
		}
		//After the above, we have loaded all the local storage values we want into [theColors] global array
		//So now we go ahead and call the function that will add those array elements to the page
		addColorsToPage();
	}
	else {
		console.log("Error: you don't have localStorage!");
	}
} 
//this function adds ALL the todos stored in the todos array
//to the page when it is first loaded
function addColorsToPage() {
	var ul = document.getElementById("colors");
	//create list fragment
	var listFragment = document.createDocumentFragment();
	//loop thru array elements and create <li> elements for each one
	for (var i = 0; i < theColors.length; i++) {
		var theColorsItem = theColors[i];
		var li = createNewColorsItem(theColorsItem);
		listFragment.appendChild(li);
	}
	ul.appendChild(listFragment);
} 

function createNewColorsItem(theColorsItem) {
	var li = document.createElement("li");
	li.innerHTML =
		theColorsItem.color1 + "," + theColorsItem.color2 + "," + theColorsItem.color3 + ","+ theColorsItem.color4+ ","+ theColorsItem.color5;
	return li;
}
//process user input from form
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
	var colorId = "color"+(maxColorId+1);
	//create a temporary array to hold all these variables
	var myColors = new UserColor(colorId,color1,color2,color3,color4,color5);
		theColors.push(myColors);
		console.log(myColors);
		//add the colors to the page
		//finally we save the color object to local storage
		//saveMyColorItem(myColorObject);
		//and increment the global counter of how many colors
		//there are by one
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
function saveMyColorItem(todoItem) {
	//check to make sure browser has localStorage object
	if (localStorage) {
	//if so, create a key using the string 'todo' + id of the todo item
	var key = "color" + todoItem.id;
	//convert the todoItem object to a string with JSON.stringify() method
	var item = JSON.stringify(todoItem);
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