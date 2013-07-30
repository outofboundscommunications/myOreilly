// constructor function to build todo object
function Todo(id, task, who, dueDate) {
	this.id = id;
	this.task = task;
	this.who = who;
	this.dueDate = dueDate;
	this.done = false;
}

// define the array that holds all the todos
var todos = new Array();

// define global variable to hold the current status of a todo object (this.done)
var currentElementStatus = '0';

window.onload = init;

function init() {
	//define click event for form submit button
	var submitButton = document.getElementById("submit");
	submitButton.onclick = getFormData;
	//define click event for search button
	var searchButton = document.getElementById("search");
	searchButton.onclick = searchTodos;
	//on page load, the first thing that happens is we
	//run the getTodoItems() function to fetch all the
	//local storage items and add them to page
	console.log("...calling getTodoItems()");
	// first thing after page loads, we call getTodoItems() function that gets all the todos stored in local
	//storage, loads them in an array, then displays those todos to the page
	getTodoItems();
}

function getTodoItems()	{
	//Fist function called when page loads....
	//We look for all the keys in local storage that
	//match what we want (the key must start with 'todo'.
	//Then take those key/value pairs (stored as JSON strings), parse the strings into objects
	//and store each of the objects (todo items) in the global array of all the todos [todos]
	if (localStorage) {
		for (var i = 0; i < localStorage.length; i++) {
		console.log("... length of local storage array is:" + localStorage.length);
		var key = localStorage.key(i);
			//if the first four characters of the key match 'todo'
			if (key.substring(0, 4) == "todo") {
			//store that key's value into the 'item' temporary variable
			var item = localStorage.getItem(key);
			console.log ("... for key: " + localStorage.key(i) + "the stored JSON item is: " + item);
			//and parse that string back into an object
			var todoItem = JSON.parse(item);
			console.log("...and now we parse that JSON back to an object here: " + 
			todoItem.id, todoItem.dueDate, todoItem.task, todoItem.who, todoItem.done);
			//and push that object into the [todoItem] array
			todos.push(todoItem);
			console.log ("...and push that object into the todos array as element: " + [i]);
			}
		}
		//after the above, we have all the todo items that were locally stored
		//as objects in the [todos] array. So we can now
		//go ahead and add all the todo objects from that array to the page by
		//calling the addTodosToPage() function
		console.log("..done with looking for localStorage items and storing them in array.... now ready to add those todos to the page...");
		console.log("we do that by calling addTodosToPage() ...");
		addTodosToPage();
	}
	else {
		console.log("Error: you don't have localStorage!");
	}
} 
//this function adds ALL the todos stored in the todos array
//to the page when it is first loaded
function addTodosToPage() {
	console.log('...we are in the addTodosToPage() function');
	var ul = document.getElementById("todoList");
	//create a list fragment to append all the li items to
	var listFragment = document.createDocumentFragment();
	console.log("...We just created a list fragment to which we will append all the to do items");
	console.log("now we loop thru each element of the todos array to create list items...");
	console.log('...there are: ' + todos.length + ' items in the array...');
	//loop thru all the elements of the todos array
	for (var i = 0; i < todos.length; i++) {
		var todoItem = todos[i];
		console.log("...for array element, " + [i] + ", the todo object is: "+ 
		todoItem.id, todoItem.dueDate, todoItem.task, todoItem.who, todoItem.done);
		//for each array element, creat a <li> item with 
		//the createNewTodo() function
		console.log("...create a list item with a call the createNewTodo() function");
		var li = createNewTodo(todoItem);
		console.log("...we created it's list item here: " + li.innerHTML);
		//and append that <li> to the fragment
		listFragment.appendChild(li);
		console.log("...and appended it to the listFragment");
	}
	console.log("...done with creating the list items from the array....");
	//now append that list fragment to the unordered list
	console.log("...now we append that list fragment to the DOM so it appears on the page....");
	ul.appendChild(listFragment);
	
} 
//this function adds a SINGLE todo that user adds from the form input
function addTodoToPage(todoItem) {
	console.log("... calling the addTodoToPage() function....This is used for adding individual items from the form to the array and page...");
	var ul = document.getElementById("todoList");
	console.log('.... calling the createNewTodo() function...');
	var li = createNewTodo(todoItem);
	console.log("we created a list item here: " + li);
	ul.appendChild(li);
	console.log("and we append that list item to the DOM so it appears on the page...");
	document.forms[0].reset();
}

// function called by both addTodosToPage and addTodoToPage
// that creates a new todo <li> item, with the status and delete buttons
function createNewTodo(todoItem) {
	//create a new <li> item in the DOM
	console.log('... start of createNewTodo()...');
	var li = document.createElement("li");
	// append the ID from the list object to the list item
	li.setAttribute("id", todoItem.id);
	var spanTodo = document.createElement("span");
	spanTodo.innerHTML =
		todoItem.who + " needs to " + todoItem.task + " by " + todoItem.dueDate;
	//create the status button 
	var spanDone = document.createElement("span");
	console.log('... the status of this todo item is: ' +todoItem.done);
	if (!todoItem.done || todoItem.done=="false") {
		spanDone.setAttribute("class", "notDone");
		spanDone.innerHTML = "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;";
	}
	else /*if (todoItem.done=="true" )*/ {
		spanDone.setAttribute("class", "done");
		spanDone.innerHTML = "&nbsp;&#10004;&nbsp;";
	}
	//create the delete x button
	var spanDelete = document.createElement("span");
	spanDelete.setAttribute("class", "delete");
	spanDelete.innerHTML = "&nbsp;&#10007;&nbsp;";
	
	//set click handler for the delete button 
	spanDelete.onclick = deleteItem;
	
	//set click handler for the status button 
	spanDone.onclick = updateToDoStatus;
	
	//add the three elements to the list item and return the list item
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
	console.log('...the item submitted is: ' + todoItem.task + todoItem.who + todoItem.dueDate + todoItem.done);
	//add object to the [todos] array
	console.log('... pushing the form submitted todo to the array...');
	todos.push(todoItem);
	//and add object to the page
	console.log('... appended item to array...');
	console.log('... add the todo to the page now by calling the addTodoToPage() ...');
	addTodoToPage(todoItem);
	//finally we save the todo object to local storage
	console.log('... calling the saveTodoItem() function...');
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

//This is the event handler for clicking on the delete 'button'
//Upon clicking, the click event data is passed into this parameter including the 
//target element clicked on (in this case the "delete" <span>)
function deleteItem(el) {
	// STEP 1 - first we remove item clicked on from local storage
	// NOTE: when user clicks on the delete button, the event object is passed in as parameter e.
	// We then figure out the element clicked on by using the 
	// target property of the event object and its id (in this case the element is the span)
	var span = el.target;
	// we want to remove the parent list item of the span
	var id = span.parentElement.id;
	console.log("delete an item: " + id);
	// find and remove the item in localStorage
	var key = "todo" + id;
	// then use the .removeItem() method of localStorage to delete
	localStorage.removeItem(key);
	// STEP 2 - now we remove item from the array
	// loop through the array, looking for the Todo object with the id we want to remove
	for (var i = 0; i < todos.length; i++) {
		// when we find the Todo item with the id
		if (todos[i].id == id) {
		// use the array method splice()
		todos.splice(i, 1);
		// we did what we wanted so now exit 
		break;
		}
	}
	// STEP 3 - finally we remove item from the page itself
	// to remove item from page we need to remove that item's <li> item
	// we do that by accessing the parentElement property of the span element (which is the 'target')
	var li = el.target.parentElement;
	var ul = document.getElementById("todoList");
	ul.removeChild(li);
}
// this function updates the page css,switching the todo box to red or green
// with checkbox, switching on or off each time the user clicks
// finally it then calls updateArray that updates thatspecific todo in the array
function updateToDoStatus(el)	{
	//update css on page, switch back and forth each click
	var span = el.target;
	var id = span.parentElement.id;
	console.log('start of updateToDoStatus');
	//update status box on page	
	var spanClass = el.target.getAttribute("class");
	console.log('status before click of the spanClass is: ' + spanClass);
	if (spanClass =="done")	{
		//item's current status is done, so switch to 'not done'
		el.target.setAttribute("class","notDone");
		el.target.innerHTML = "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;";
		currentElementStatus = 'false';
		console.log('now the status is: ' + el.target.getAttribute);
	}
	else if (spanClass =="notDone") 	{
		//item is not done, so make it done
		el.target.setAttribute("class","done");
		el.target.innerHTML = "&nbsp;&#10004;&nbsp;";
		currentElementStatus = 'true';
		console.log('now the status is: ' + el.target.getAttribute);
	}
	console.log('now we call updateLocalStorage');
	updateLocalStorage(id,currentElementStatus);
}

function updateLocalStorage(id,currentElementStatus)	{
	//update status in local storage
	console.log("... we are now updating localstorage function");
	//locate parent element of that list item
	//and store the ID of the parent of the clicked element
	/*var id = myspan.parentElement.id;*/
	 //now concatenate that id value to the word "todo'
	// and store in the variable 'key'
	// now we have a key variable to look for in local storage
	//UPDATE LOCAL STORAGE WITH NEW STATUS
	var key = "todo" + id;
	// NOTE: done is equal to 'true', not done is equal to 'false'
	// Assign the key's value into temporary variable, 'item'
	var item = localStorage.getItem(key);
	console.log('... the values of the key/item pair before the click were: ' + 'key' + key + 'item: ' + item );
	//parse the item's JSON into an object
	var myItemObject = JSON.parse(item);
	console.log(".. the value of the status item in local storage before the click was: " + myItemObject.done);
	var newStatus = currentElementStatus;
	//assign the new status to the todoItem object
	myItemObject.done = newStatus;
	console.log('...the new status of the item is: ' + myItemObject.done);
	//convert the object back to a string and store in local storage
	var myItemJson = JSON.stringify(myItemObject);
	//now we have updated the status of the object
	// save JSON data back to local storage
	if (localStorage)	{
		localStorage.setItem(key,myItemJson);
	}
	else	{
		console.log("error: you dont have local storage!");
	}
	console.log('...okay, we updated the status and stored in local storage... the local storage status is now: ' + localStorage.getItem(key));
	//call the updateArray function to change the status there as well
	console.log('... now we call the updateArray(id) function, passing in the ID and new status');
	updateArray(id,currentElementStatus);
}
// Update status in array
function updateArray(id)	{
	// Find the item in the array by loop through the array, looking for object id
	for (var i = 0; i < todos.length; i++) {
		// look for the object with the ID we want
		if (todos[i].id == id) {
			console.log("...in array function now... the status of the todo element in the array before we update is: " + todos[i].done);
			// go ahead and update the status with the new current status
			todos[i].done = currentElementStatus;
			console.log('okay we now changed the status of the array element to: ' + todos[i].done);
		}
	}
}
// function that does the search on the todo array
// when the user enters query and hits search button

function searchTodos()	{
	var searchString = document.getElementById("searchString").value;
	// clean up string of any blanks
	searchString = searchString.trim();
	// make sure search field is not blank
	if (checkInputText(searchString,"Please enter a search string")) return;
	// set up the regex to use for the search, passing in the user's search string
	// we create a regular expression object using the RegExp() constructor
	// passing in the user's search term for the first argument
	// and using "ig" for the second argument ("i" = ignore case)
	// "g" = 'globally' match every instance in the text
	var re = new RegExp(searchString,"ig");
	console.log(re);
	// search for the string in the array by looping thru the array
	// looking for the string within either the 'task' property or the 'who' propery
	// (remember the array element contains a todo object)
	for (var i= 0; i <todos.length; i++)	{
		// look for the string in the current array element todo object
		// the requirements are to search in both the who property and the task property
		// so we will do that by concatenting those two properties/fields and then
		// searching that combined string as one unit
		var textToSearch = todos[i].who + todos[i].task;
		textToSearch +=textToSearch;
	}
	console.log(textToSearch);
	// now we search the text of the textToSearch using our regex
	// we use the 'match' string method which results in an array
	// which we store in a variable named 'results'
	var results = textToSearch.match(re);
	// now call the function to show the results of the search to the screen
	console.log(results);
	if (results !=null)	{
		showResults(results);
	}
	else	{
		alert('sorry, there are no results!');
	}
			
}
// function to clear the prior search results from screen to make way for new results
function clearResultsList(ul) {
	while (ul.firstChild) {
	ul.removeChild(ul.firstChild);
	}
}
// function to display results of the search, called by searchTodos() function
function showResults(results) {
	var ul = document.getElementById("searchResults");
	clearResultsList(ul);
	var frag = document.createDocumentFragment();
	//check to see if there are any results in the array (if length >0, there are results
		for (var i = 0; i < results.length; i++) {
			var li = document.createElement("li");
			li.innerHTML = results[i];
			frag.appendChild(li);
		}
		ul.appendChild(frag);
	}			