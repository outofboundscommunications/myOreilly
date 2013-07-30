//create a Todo object constructor
//so we can use it to make objects from the user form data
function Todo(task, who, dueDate) {
	this.task = task;
	this.who = who;
	this.dueDate = dueDate;
	this.done = false;
}
// an array of all the todos
var todos = new Array();

window.onload = init;

function init() {
// set up click handler for 'submit' button on form
	var submitButton = document.getElementById("submit");
	submitButton.onclick = getFormData;
// on window load, run the getTodoData()
	getTodoData(); 
}

function getTodoData() {
	var request = new XMLHttpRequest();
	request.open("GET", "todoList.json");
	request.onreadystatechange = function() {
		// test to make sure request okay
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
	// and store the parsed objects the globally defined [todos] array
	for (var i = 0; i < todoArray.length; i++) {
		var todoItem = todoArray[i];
		todos.push(todoItem);
	}
}
///////////////////////// function to process new task items entered on form by user 
function getFormData() {
	var task = document.getElementById("task").value;
	// check to make sure the form field has value
	if (checkInputText(task, "Please enter a task")) return;
	var who = document.getElementById("who").value;
	// check to make sure the form field has value
	if (checkInputText(who, "Please enter a person to do the task")) return;
	var date = document.getElementById("dueDate").value;
	// check to make sure the form field has value
	if (checkInputText(date, "Please enter a due date")) return;
 	//log task to console
	console.log("New task: " + task + ", for: " + who + ", by: " + date);
	// take user form input for the new to do and create a new todo object using constructor function
	var todoItem = new Todo(task, who, date);
	// then add that new todo object to the [todos] array
	todos.push(todoItem);
	// and finally, display that new to do item from form to the web page
	addTodoToPage(todoItem);
	// call function that calls the php script to save the to-do item to JSON file
	saveTodoData();
}

//form error checking function
function checkInputText(value, msg) {
	if (value == null || value == "") {
		alert(msg);
		return true;
	}
	return false;
}
//function to display todo elements FROM JSON DATA
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
//function to display user input todo elements FROM FORM 
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
	// define the XMLHttp request for sending data
	var request = new XMLHttpRequest();
  // create the url for the request, encode the characters so URL wont be messed up
  // append the data we want to send to the end of the url using the ?data= name/value pair
  // We encode the todo JSON string using the built-in JavaScript function, encodeURI(), which takes a string 
  // and turns it into a form suitable for sending as part of a URL with a GET request
	var URL = "save.php?data=" + encodeURI(todoJSON);
	// send the request to the server to send data using GET
	request.open("GET", URL);
	request.setRequestHeader("Content-Type","text/plain;charset=UTF-8");
	request.send();
}