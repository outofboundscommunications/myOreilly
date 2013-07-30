// JavaScript Document

window.onload = init;

function init() {
	getToDoData();
}

//// Define a global variable (an array) to stash away the JSON data /////

var todos =[];

/// Define a global variable (text data type) to hold the JSON request header information
/// that will be displayed 

var responseHeaderStatus;

//// Function which gets the JSON data and calls the parser function ////
//// the parser function parses the JSON into an array of objects ////

function getToDoData() {
	var request = new XMLHttpRequest();
	request.open("GET", "todoList.json");
	request.onreadystatechange = function() {
		var responseHeaderStatus = this.status;
		if (this.readyState == this.DONE && this.status == 200) {
			if (this.responseText != null) {
				parseTodoItems(this.responseText);
				displayTodoItems(todos,responseHeaderStatus);
			}
		else {
			var divStatus = document.getElementById('status');
			divStatus.innerHTML = ('Sorry, error in JSON request.' + this.status);
		}
	  }
	};
/// send request for JSON data to server ///

	request.send();
	
/// call function that displays both the JSON data and request status ///

	/*displayTodoItems(todos,responseHeaderStatus);*/
}

function parseTodoItems (todoJSON)	{
	if (todoJSON == null || todoJSON.trim() == "") {
		return;
	}
	var todoArray = JSON.parse(todoJSON);
	if (todoArray.length == 0) {
		console.log("Error: the to-do list array is empty!");
		return;
	}
	for (var i = 0; i < todoArray.length; i++) {
		var todoItem = todoArray[i];
		todos.push(todoItem);
	}
	console.log(todos);
}
// function that takes the following input: (1) todo array and (2) JSON request status and displays in unordered list,
// iterating through each of the objects and displaying the elements of each object

function displayTodoItems (todos,responseStatus)	{

/// create an unordered list element
	var ul = document.getElementById('todoList');
/// fetch the status div and display the elements of each todo list object in list 
	var divStatus = document.getElementById('status');
	for (var i=0; i < todos.length; i++)	{
		var todoItem = todos[i];
		var li = document.createElement('li');
		li.innerHTML = todoItem.who + " needs to " + todoItem.task + " by " + todoItem.dueDate;
		ul.appendChild(li);
	}
	
/// display status of the JSON request
	divStatus.innerHTML = "The status of the JSON request was: " + responseStatus;
}