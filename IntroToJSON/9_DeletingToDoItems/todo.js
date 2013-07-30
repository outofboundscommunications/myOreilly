
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
	//create a new list item in the DOM
	var li = document.createElement("li");
	// append the ID to the list item
	li.setAttribute("id", todoItem.id);
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
	
	//create the delete x button
	var spanDelete = document.createElement("span");
	spanDelete.setAttribute("class", "delete");
	spanDelete.innerHTML = "&nbsp;&#10007;&nbsp;";
	
	//set click handler for the delete button to function deleteItem()
	spanDelete.onclick = deleteItem;
	
	li.appendChild(spanDone);
	li.appendChild(spanTodo);
	li.appendChild(spanDelete);
	
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
	//we will use the time in milliseconds as a unique ID
	var id = (new Date()).getTime();
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

//event handler for clicking on the delete 'button'
//upon clicking, the click event data is passed into this
//parameter including the target element clicked on (in this case the "delete" <span>
function deleteItem(e) {
	// STEP 1 - remove item clicked on from local storage
	// NOTE: when user clicks on the delete button, the event object is passed in as parameter e.
	// We then figure out the element clicked on by using the 
	// target property of the event object and its id (in this case the element is the span)
	var span = e.target;
	// we want to remove the parent list item of the span
	var id = span.parentElement.id;
	console.log("delete an item: " + id);
	// find and remove the item in localStorage
	// set the id of the local storage item to delete to variable 'key'
	var key = "todo" + id;
	// then use the .removeItem() method of localStorage to delete
	// that to do item from local storage
	localStorage.removeItem(key);
	// STEP 2 - remove item from the array
	// find and remove the item in the array
	// loop through the array, looking for the Todo object with the id
	// we want to remove
	for (var i = 0; i < todos.length; i++) {
		// when we find the Todo item with the id
		if (todos[i].id == id) {
		// use the array method splice()
		todos.splice(i, 1);
		// and now exit the array
		break;
		}
	}
	// STEP 3 - remove item from the page
	// to remove item from page we need to remove that item's <li> item
	// we do that by accessing the parentElement property of the span element (which is the 'target')
	var li = e.target.parentElement;
	var ul = document.getElementById("todoList");
	ul.removeChild(li);
}