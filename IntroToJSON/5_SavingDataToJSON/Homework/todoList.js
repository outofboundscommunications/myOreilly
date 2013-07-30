
// constructor function to build todo objects 
// from user data from form

function Todo(task, who, dueDate) {
	this.task = task;
	this.who = who;
	this.dueDate = dueDate;
	this.done = false;
}

// an array of all the todos

var todos = new Array();

/// Define a global variable (text data type) to hold the JSON request header information
/// that will be displayed 

var responseHeaderStatus;

window.onload = init;

function init() {
// set up click handler for 'submit' button on form

	var submitButton = document.getElementById("submit");
	submitButton.onclick = getFormData;
	
// on window load, run the getTodoData()

	getTodoData(); 
	
}

/////////////////////// FUNCTIONS THAT RETRIEVE, DISPLAY EXISTING ////////
/////////////////////// EXTERNAL JSON DATA FILE //////////////////////////

function getTodoData() {
// request JSON data (todoList.json - dont confuse with other json file - todo.json)

	var request = new XMLHttpRequest();
	request.open("GET", "todoList.json");
	request.onreadystatechange = function() {
// test to make sure request is done and status from server is okay
	  if (this.readyState == this.DONE && this.status == 200) {
		  if (this.responseText != null) {
// if okay, parse the JSON text into objects and store in array
			  parseTodoItems(this.responseText);
// and add those todo objects to the page
			  addTodosToPage();
		  }
		  else {
			  console.log("Error: Data is empty");
		  }
	  }
	};
// make the XMLHttpRequest() to the server for the todoList.json data
	request.send();
}

//////////////////////// function to parse the JSON data 

function parseTodoItems(todoJSON) {
	if (todoJSON == null || todoJSON.trim() == "") {
		return;
	}
// if JSON data okay, parse the text into Objects

	var todoArray = JSON.parse(todoJSON);
	if (todoArray.length == 0) {
		console.log("Error: the to-do list array is empty!");
		return;
	}
// and store the parsed objects into a todoArray

	for (var i = 0; i < todoArray.length; i++) {
		var todoItem = todoArray[i];
		todos.push(todoItem);
	}
}
///////////////////////// function to display todo elements FROM JSON DATA to the web page

function addTodosToPage() {
	var ul = document.getElementById("todoList");
	for (var i = 0; i < todos.length; i++) {
		var todoItem = todos[i];
		var li = document.createElement("li");
		li.innerHTML =
			todoItem.who + " needs to " + todoItem.task + " by " + todoItem.dueDate;
		ul.appendChild(li);
	}
}

/////////////////////// FUNCTIONS THAT PROCESS NEW FORM DATA ITEMS ////////
/////////////////////// AND WRITE TO EXTERNAL JSON DATA FILE //////////////

function getFormData() {
	
// check to make sure the form fields have values

	var task = document.getElementById("task").value;
	if (checkInputText(task, "Please enter a task")) return;
	var who = document.getElementById("who").value;
	if (checkInputText(who, "Please enter a person to do the task")) return;
	var date = document.getElementById("dueDate").value;
	if (checkInputText(date, "Please enter a due date")) return;

// and now create a new todo object using constructor function

	var todoItem = new Todo(task, who, date);
	
// and add that new todo object to the todoItem array

	todos.push(todoItem);

// and finally, display that new to do item from form to the web page

	addTodoToPage(todoItem);

// call function that calls the php script to save the to-do item to JSON file

	saveTodoData();
}

///////////////////////// form error checking function called by getFormData()

function checkInputText(value, msg) {
	if (value == null || value == "") {
		alert(msg);
		return true;
	}
	return false;
}

///////////////////////// function to display todo elements FROM FORM to the web page
///////////////////////// adds single to-do items entered from form
///////////////////////// this is NOT same as the addToDosToPage() function above
///////////////////////// that adds to-do items from the parsed JSON data file

function addTodoToPage(todoItem) {
	var ul = document.getElementById("todoList");
	var li = document.createElement("li");
	li.innerHTML =
	todoItem.who + " needs to " + todoItem.task + " by " + todoItem.dueDate;
	ul.appendChild(li);
	document.forms[0].reset();
}

////////////////////////// function that creates/uses a XMLHttpRequest() to call the php script (save.php)
////////////////////////// that stores the to-do list item from the form into another JSON data file (todo.json)

function saveTodoData() {
// convert the (global variable) todos array to a JSON string
	var todoJSON = JSON.stringify(todos);
// define the url for the GET request
	var URL = "save.php?data=" + encodeURI(todoJSON);
	var status = document.getElementById('status');
	var request = new XMLHttpRequest();
	request.open("GET", URL);
	request.setRequestHeader("Content-Type","text/plain;charset=UTF-8");
	request.onreadystatechange = function()	{
		if (this.readyState == 4)	{
			if (this.status == 200)	{
			console.log('everything went well... the status was: ' + this.status + "," + this.statusText);
			status.innerHTML = 'everything went well... the status was: ' + this.status + "," + this.statusText;
			}
			else	{
				console.log('not so well... the status was: ' + this.status + "," + this.statusText);
				status.innerHTML = "everything didn't go so well... the status was: " + this.status + "," + this.statusText;
			}
		}
		
	}
	request.send();

}
