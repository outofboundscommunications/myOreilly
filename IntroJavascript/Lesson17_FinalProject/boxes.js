// JavaScript Document for Lesson17_Final_Boxes Project

///////////////////////////////////////////////////////////////////////////////////////
// this app has a form that prompts you for three things: name of the boxes, a color and the number
// of boxes you want to generate
// the boxes are implemented as <div> elements, with the color as the div background
// and the name as the content of the box.
// Their positions are randomly set inside the the part of the page
// where they are added.
// When you click on one of the boxes, you see information about the box:
// its ID, name, color, and position (x,y).
// There is also a clear button that clears the screen of all the boxes so
// you can start over.

///////////////////////////////////////////////////////////////////////////////////////

///// DEFINITIONS ///////////////////////////////////////////////////////////////

// DEFINE GLOBAL VARIABLE THAT TRACKS NUMBER OF BOXES GENERATED /////////////////
// and then used to define unique id for each box //////////////////////////
var myCounter = 0;

// CREATE BOX OBJECT TO STORE VALUES OF BOX PARAMETERS////////////////////////////
// Create a constructor function named Box to create box objects for each box that's generated. 
// The Box object will hold each property of a box, including its id, name, color, and x and y positions. 
// Note that the id of each box must be unique, but the name isn't (you'll have multiple boxes with the same name).
function Box(id, name, color, x, y) {
	this.id = id;
	this.name = name;
	this.color = color;
	this.x = x;
	this.y = y;
  }

// DEFINE AN ARRAY TO STORE THE BOX OBJECTS /////////////////////////////
var boxes = [];

window.onload = init;

function init() {
//set up Click Handler for Generate button
	var generateButton = document.getElementById("generateButton");		
	generateButton.onclick = getFormInput;	
// set up Click Hanlder for Clear button	
	var clearButton = document.getElementById("clearButton");
	clearButton.onclick = clearBoxes;				
}

// STEP 1: GRAB THE VALUES FROM THE FORM  ///////////////////////////////
function getFormInput()	{
// define a temporary array to hold the form values which are then passed to box function
	var formArray = [];
// get the form named "data" from the DOM and store
	var theForm = document.forms.data;
// get the value in the name text field and store
	var nameInput = theForm.elements.name.value;
// get the value of the color drop down selection and store
	var colorInput = theForm.elements.color.value;
// get the value of radio button selection and store
// NOTE: have to use the function getRadioValue() to find the radio value
	for (var i=0; i < document.forms.data.amount.length; i++)	{
		if (document.forms.data.amount[i].checked)	{
			var numberofBoxesInput = document.forms.data.amount[i].value;
			}
		}
	
//STEP 2: VALIDATE THE FORM INPUT //////////////////////////////////////
	if (nameInput == null || nameInput == '')	{
		alert("Please enter a name for your Amazing Box!");
		return;
		  }
	if (colorInput == null || colorInput == '')	{
		alert("Please choose a color for your Amazing Box!");
		return;
		  }
	if (numberofBoxesInput == null || numberofBoxesInput == '')	{
		alert("Please select the number of boxes you want to create for your Amazing Box!");
		return;
		  }
	else 	{
// STEP 3: STORE FORM INPUT INTO TEMPORARY ARRAY ('formArray') ////////
	  formArray = [nameInput,colorInput,numberofBoxesInput];
// pass the Form array values +  global counter variable current value to the createBoxes(formArray,MyCounter) function
	  createBoxes(formArray,myCounter);
// now we reset the form for the next data entry
	  theForm.reset();  
	 
		}

// STEP 4: CREATE THE BOXES FUNCTION ////////////////////////////////////////////////////////////

function createBoxes(formArray,myCounter)	{
// assign the 0,1,2 array elements to their corresponding variables here
	var boxName = formArray[0];
	var boxColor = formArray[1];
	var numBoxes = formArray[2];
// create the box object
	for (i=0; i < numBoxes; i++)	{
		var boxId = myCounter+100;	
		var sceneDiv = document.getElementById("scene");
		var x = Math.floor(Math.random() * (sceneDiv.offsetWidth-101));
		var y = Math.floor(Math.random() * (sceneDiv.offsetHeight-101));
		var myBox = new Box(boxId,boxName,boxColor,x,y);
		myCounter +=1;
		boxes.push(myBox);
		}
	}
// now we have the boxes array all filled up with the box objects so
// lets pass that array to the drawBoxes(boxesArray) function and
// display all those boxes to the screen

// STEP 5: DISPLAY BOXES TO SCREEN ////////////////////////////////////////////////////////////////
	drawBoxes(boxes);
}

//////// FUNCTION TO DISPLAY THE BOXES TO SCREEN ///////////////
function drawBoxes(boxesArray)	{
	var scene = document.getElementById('scene');
	for (i=0; i < boxesArray.length; i++)	{
		var myDiv = document.createElement('div');
		myDiv.setAttribute('id',boxesArray[i].id);
		myDiv.style.backgroundColor = boxesArray[i].color;
		myDiv.setAttribute('class','box');
		myDiv.style.left = boxesArray[i].x +'px';
		myDiv.style.top = boxesArray[i].y + 'px';
		myDiv.innerHTML = boxesArray[i].name;
		myDiv.onclick = displayBoxContents;
		scene.appendChild(myDiv);
	}
	
}

////////////////// 	CLICK HANDLER FOR 'CLEAR' BUTTON /////////////////////
////////////////// when user clicks on 'clear' button, boxes deleted and box array cleared

/// locate all the div's with class = 'box', then find parent of each and remove child

function clearBoxes()	{
	var boxDiv = document.querySelectorAll("div.box");
	for (var i = 0; i < boxDiv.length; i++)	{
		//console.log(boxDiv[i]);
		var boxDivChild = boxDiv[i];
		var boxDivParent = boxDivChild.parentElement;
		boxDivParent.removeChild(boxDivChild);
		}
//// now we need to reset the array, remove all the boxes 
	resetArray(boxes);
}
//// function called above to clear the array
function resetArray(boxesArray) 	{
	boxesArray.length=0;
}
	
/////////// CLICK HANDLER FOR BOX WHEN CLICKED ON TO VIEW ///////


function displayBoxContents (myElement)	{
	var boxToDisplay = myElement.target;
	console.log(boxToDisplay);
	alert('the box id is: '+ boxToDisplay.id +'\nthe box background color is: '+ boxToDisplay.style.backgroundColor +'\nthe box top and left metrics are: '+ boxToDisplay.style.top + ' and ' + boxToDisplay.style.left);
		
}
	
