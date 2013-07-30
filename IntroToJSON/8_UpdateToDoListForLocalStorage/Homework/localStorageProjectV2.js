//Object constructor for the color object
function UserColor(id, color) {
	this.id = id;
	this.color=color;
}

// array to hold all the individual color objects
// from the user submitted form
var theColors = new Array();

// global variable to keep track of how many colors there 
// are so we can use it as part of the key.
// The key will look like: "color1", "color2", etc.
var maxColorId = 0;

window.onload = init;

function init() {
	var submitButton = document.getElementById("submit");
	submitButton.onclick = getFormData;
	//on page load, run getTheColors() function to fetch all the
	//locally stored color items and add to page
	getTheColors();
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
			//and increment the global counter of how many colors
			//there are by one
			maxColorId++;
			
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
//this function adds ALL the previously stored colors in thecolor array
//to the page when it is first loaded
function addColorsToPage() {
	var ul = document.getElementById("colors");
	//create list fragment
	var listFragment = document.createDocumentFragment();
	//loop thru global [theColors] array elements and create <li> elements for each one
	for (var i = 0; i < theColors.length; i++) {
		var theColorItem = theColors[i];
		var li = document.createElement("li");
		//add list element to document fragment
		listFragment.appendChild(li);
	}
	//now add document fragment to list
	ul.appendChild(listFragment);
} 

//process user input from the form
//by creating color objects for each field
//consisting of a unique colorID and color value
//and then pushing those objects to [theColor] array
function getFormData() {
	//loop thru each form element, if value not null then
	//create a unique ID for the key/value pair,
	//and push that object to [theColors] array
	for (i=1;i<=5; i++)	{
		//create temp variable colorID to iterate thru form fields
		//the form fields are labeled color1, color2, color3, etc
		//we concatenate the global counter of colors (maxColorID)
		//to the word color and then we loop thru all the form fields
		//& create the 'myColorObject' and push that object to [theColors] array
		var colorId = "color" + (maxColorId +1);
		//assign the form field value to temp variable myColor
		var myColor = document.getElementById(colorId).value;
		//check to see if form field value is null, if so return error
		if (checkInputText(myColor, "Please enter a color in field: [i]")) return;
		//if passes validation, define key Id by using length of [theColors] array
		//now we have a key/value pair so go ahead and create an object using constructor
		var myColorObject = new UserColor(colorId,myColor);
		theColors.push(myColorObject);
		console.log(myColorObject);
		//add the colors to the page
		//finally we save the color object to local storage
		//saveMyColorItem(myColorObject);
		//and increment the global counter of how many colors
		//there are by one
		maxColorId++;
	}
	
}
function checkInputText(value, msg) {
	if (value == null || value == "") {
		alert(msg);
		return true;
	}
	return false;
}
//function that takes the myColorObject with a unique id property
//converts to a string and stores in local storage
function saveMyColorItem(myColorObject) {
	//check to make sure browser has localStorage object
	if (localStorage) {
	//if local storage is available, create a key using the string 'color' + (maxsColorID+1)
	//e.g. take the maxColorID, which is the global counter of total colors we have
	//from both local storage and user input and increment by 1
	//then concatenate that number to the text string "color"
	var key = colorId;
	//convert the todoItem object to a string with JSON.stringify() method
	var item = myColor;
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