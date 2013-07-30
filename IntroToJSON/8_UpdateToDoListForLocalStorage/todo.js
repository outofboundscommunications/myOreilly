
// constructor function to build todo object
function Todo(id, task, who, dueDate) {
	this.id = id;
	this.task = task;
	this.who = who;
	this.dueDate = dueDate;
	this.done = false;
}
var todos = new Array();

window.onload = init;

function init() {
	var submitButton = document.getElementById("submit");
	submitButton.onclick = getFormData;
	//on page load, run getTodoItems() function to fetch all the
	//local storage items and add to page
	getTodoItems();
}

function getTodoItems()	{
	//look for all the keys in the key/value pairs in local storage that
	//match what we want (the key must start with 'todo'.
	//Once we find those matching pairs, parse the strings into objects
	//and store them in the global array of all the todos [todoArray]
	if (localStorage) {
		for (var i = 0; i < localStorage.length; i++) {
		var key = localStorage.key(i);
			//if the first four characters of the key match 'todo'
			//then go ahead and parse that particular todo item into object
			if (key.substring(0, 4) == "todo") {
			//store that key's value into temporary variable, item
			var item = localStorage.getItem(key);
			//and parse that string back into an object
			var todoItem = JSON.parse(item);
			//and push that object into the [todoItem] array
			todos.push(todoItem);
			}
		}
		//after the above, go ahead and add all the todo items from [todoArray] to the page
		addTodosToPage();
	}
	else {
		console.log("Error: you don't have localStorage!");
	}
} 
//this function adds ALL the todos stored in the todos array
//to the page when it is first loaded
function addTodosToPage() {
	var ul = document.getElementById("todoList");
	var listFragment = document.createDocumentFragment();
	for (var i = 0; i < todos.length; i++) {
		var todoItem = todos[i];
		var li = createNewTodo(todoItem);
		listFragment.appendChild(li);
	}
	ul.appendChild(listFragment);
} 
//this function adds a SINGLE todo that user adds
//from the form input
function addTodoToPage(todoItem) {
	var ul = document.getElementById("todoList");
	var li = createNewTodo(todoItem);
	ul.appendChild(li);
	document.forms[0].reset();
}

function createNewTodo(todoItem) {
	var li = document.createElement("li");
	var spanTodo = document.createElement("span");
	spanTodo.innerHTML =
		todoItem.who + " needs to " + todoItem.task + " by " + todoItem.dueDate;
	var spanDone = document.createElement("span");
	if (!todoItem.done) {
		spanDone.setAttribute("class", "notDone");
		spanDone.innerHTML = "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;";
	}
	else {
		spanDone.setAttribute("class", "done");
		spanDone.innerHTML = "&nbsp;&#10004;&nbsp;";
	}
	li.appendChild(spanDone);
	li.appendChild(spanTodo);
	return li;
}
function getFormData() {
	var task = document.getElementById("task").value;
	if (checkInputText(task, "Please enter a task")) return;
	var who = document.getElementById("who").value;
	if (checkInputText(who, "Please enter a person to do the task")) return;
	var date = document.getElementById("dueDate").value;
	if (checkInputText(date, "Please enter a due date")) return;
	//for local storage, we need to create a unique identifer for each todo object
	//we use the length of the todos array as a unique identifier!
	var id = todos.length;
	//create the new todo object
	var todoItem = new Todo(id, task, who, date);
	//add object to the [todos] array
	todos.push(todoItem);
	//and add object to the page
	addTodoToPage(todoItem);
	//finally we save the todo object to local storage
	saveTodoItem(todoItem);
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
function saveTodoItem(todoItem) {
	//check to make sure browser has localStorage object
	if (localStorage) {
	//if so, create a key using the string 'todo' + id of the todo item
	var key = "todo" + todoItem.id;
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