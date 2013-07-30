//create an array to hold all the todo items
//so we can display later
var todos = new Array();

window.onload = init;

function init() {
	getTodoData();
}

function getTodoData() {
	//create XHR request object
	var request = new XMLHttpRequest();
	request.open("GET", "todo.json");
	request.onreadystatechange = function() {
		// if everything is okay with XHR object, process
		if (this.readyState == this.DONE && this.status == 200) {
			//if the XHR object is not empty
			if (this.responseText != null) {
				//go ahead and parse the object
				parseTodoItems(this.responseText);
				//and then add those html objects to the page
				addTodosToPage();
			}
		else {
			console.log("Error: Data is empty");
			}
		}
	};
	request.send();
}
// pass in the response.Text object into a variable called 'todoJSON'
// and parse into html usable objects
function parseTodoItems(todoJSON) {
	// if response.Text object is empty, exit routine
	if (todoJSON == null || todoJSON.trim() == "") {
		return;
	}
	//parse the JSON string into objects
	var todoArray = JSON.parse(todoJSON);
	if (todoArray.length == 0) {
		console.log("Error: the to-do list array is empty!");
		return;
	}
	//now iterate thru all the objects in the array
	for (var i = 0; i < todoArray.length; i++) {
		//create a temporary variable to hold each item in the array
		var todoItem = todoArray[i];
		//and push each object into the end of the [todos] array
		todos.push(todoItem);
	}

}

function addTodosToPage() {
	var ul = document.getElementById("todoList");
	for (var i = 0; i < todos.length; i++) {
		//create a temporary variable to hold each item in the array
		var todoItem = todos[i];
		console.log(todos[i]);
		//create an <li> element for each item
		var li = document.createElement("li");
		//set the HTML contents of that <li> element to the string of data from the todoItem object
		li.innerHTML =
		todoItem.who + " needs to " + todoItem.task + " by " + todoItem.dueDate;
		//and finally add that completed <li> element to the DOM within the <ul> list
		ul.appendChild(li);
	}
}