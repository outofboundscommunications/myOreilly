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

var currentStatus = 0;

/*// constructor function to build search result object
// when a user searches the todos, if there are any 'hits'
// they are stored in this Searchresult object, placed in the
// [searchResults] array and then displayed to the user
function Searchresult(propertyField, numHits)	{
	// this property contains what Todo property contained 'hits' or matches
	// for this project, the value stored here will either be todos.task or todos.who
	this.propertyField;
	// this property contains the number of 'hits' or matches found for the propertyField
	this.numHits;
}

// define array to hold the results of a user's search (the Searchresult objects defined above)
var searchResults = new Array();*/

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
	console.log("19...calling getTodoItems()");
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
		console.log("31... length of local storage array is:" + localStorage.length);
		var key = localStorage.key(i);
			//if the first four characters of the key match 'todo'
			if (key.substring(0, 4) == "todo") {
			//store that key's value into the 'item' temporary variable
			var item = localStorage.getItem(key);
			console.log ("37... for key: " + localStorage.key(i) + "the stored JSON item is: " + item);
			//and parse that string back into an object
			var todoItem = JSON.parse(item);
			console.log("40...and now we parse that JSON back to an object here: " + 
			todoItem.id, todoItem.dueDate, todoItem.task, todoItem.who, todoItem.done);
			//and push that object into the [todoItem] array
			todos.push(todoItem);
			console.log ("44...and push that object into the todos array as element: " + [i]);
			}
		}
		//after the above, we have all the todo items that were locally stored
		//as objects in the [todos] array. So we can now
		//go ahead and add all the todo objects from that array to the page by
		//calling the addTodosToPage() function
		console.log("51...done with looking for localStorage items and storing them in array.... now ready to add those todos to the page...");
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
	console.log('62...we are in the addTodosToPage() function');
	var ul = document.getElementById("todoList");
	//create a list fragment to append all the li items to
	var listFragment = document.createDocumentFragment();
	console.log("66...We just created a list fragment to which we will append all the to do items");
	console.log("now we loop thru each element of the todos array to create list items...");
	console.log('68...there are: ' + todos.length + ' items in the array...');
	//loop thru all the elements of the todos array
	for (var i = 0; i < todos.length; i++) {
		var todoItem = todos[i];
		console.log("72...for array element, " + [i] + ", the todo object is: "+ 
		todoItem.id, todoItem.dueDate, todoItem.task, todoItem.who, todoItem.done);
		//for each array element, creat a <li> item with 
		//the createNewTodo() function
		console.log("76...create a list item with a call the createNewTodo() function");
		var li = createNewTodo(todoItem);
		console.log("78...we created it's list item here: " + li.innerHTML);
		//and append that <li> to the fragment
		listFragment.appendChild(li);
		console.log("81...and appended it to the listFragment");
	}
	console.log("83...done with creating the list items from the array....");
	//now append that list fragment to the unordered list
	console.log("85...now we append that list fragment to the DOM so it appears on the page....");
	ul.appendChild(listFragment);
	
} 
//this function adds a SINGLE todo that user adds from the form input
function addTodoToPage(todoItem) {
	console.log("line 89... calling the addTodoToPage() function....This is used for adding individual items from the form to the array and page...");
	var ul = document.getElementById("todoList");
	console.log('line 91.... calling the createNewTodo() function...');
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
	console.log('105... start of createNewTodo()...');
	var li = document.createElement("li");
	// append the ID from the list object to the list item
	li.setAttribute("id", todoItem.id);
	var spanTodo = document.createElement("span");
	spanTodo.innerHTML =
		todoItem.who + " needs to " + todoItem.task + " by " + todoItem.dueDate;
	//create the status button 
	var spanDone = document.createElement("span");
	console.log('114... the status of this todo item is: ' +todoItem.done);
	if (!todoItem.done || todoItem.done=="false") {
		spanDone.setAttribute("class", "notDone");
		spanDone.innerHTML = "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;";
	}
	else if (todoItem.done=="true" ) {
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
	spanDone.onclick = updateDone;
	
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
	console.log('153...the item submitted is: ' + todoItem.task + todoItem.who + todoItem.dueDate + todoItem.done);
	//add object to the [todos] array
	console.log('155... pushing the form submitted todo to the array...');
	todos.push(todoItem);
	//and add object to the page
	console.log('158... appended item to array...');
	console.log('159... add the todo to the page now by calling the addTodoToPage() ...');
	addTodoToPage(todoItem);
	//finally we save the todo object to local storage
	console.log('157... calling the saveTodoItem() function...');
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
// this function updates the local storage, array and page 
function updateLocalStorage(el)	{
	//store the element clicked on in variable = myspan
	var myspan = el.target;
	console.log("254... we are within the update status function");
	//locate parent element of that list item
	//and store the ID of the parent of the clicked element
	var id = myspan.parentElement.id;
	 //now concatenate that id value to the word "todo'
	// and store in the variable 'key'
	// now we have a key variable to look for in local storage
	//UPDATE LOCAL STORAGE WITH NEW STATUS
	var key = "todo" + id;
	// NOTE: done is equal to 'true', not done is equal to 'false'
	// Assign the key's value into temporary variable, 'item'
	var item = localStorage.getItem(key);
	console.log('266... the key/item pair to update is: ' + 'key' + key + 'item: ' + item );
	//parse the item's JSON into an object
	var myItemObject = JSON.parse(item);
	//console.log('245... now parse the JSON item...the parsed local item string is: ' + myItemObject.done);
	var currentStatus = myItemObject.done;
	console.log("271.. the prior (before click) status of the item in local storage is: " + currentStatus);
	// if the status stored in local storage is false (notdone), then set it to true (done)
	if (currentStatus=="false")	{
		//set new status to true
		var newItemStatus = "true";
		//assign the new status to the todoItem object
		myItemObject.done = newItemStatus;
		console.log('278...the new status of the item is: ' + myItemObject.done);
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
		console.log('288...okay, we updated the status... the local storage status is now: ' + localStorage.getItem(key));
	}
		//otherwise if the status stored in local storage is true (done), then set it to false (notdone)
	else 	{
		//set new item status to false
		var newItemStatus = "false";
		//assign the new status to the todoItem object
		myItemObject.done = newItemStatus;
		console.log('297...the new status of the item is: ' + myItemObject.done);
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
	console.log('308...okay, we updated the status of the item in local storage... the local storage status is now: ' + localStorage.getItem(key));
	}
	//call the updateArray function to change the status there as well
	console.log('311... now we call the updateArray(id) function');
	updateArray(id);
}
// This function updates the array with the changed status of the todo item
function updateArray(id)	{
	// STEP 2 - UPDATE THE STATUS OF THE ITEM IN THE ARRAY
	// Find the item in the array by loop through the array, looking for object id
	for (var i = 0; i < todos.length; i++) {
		// look for the object with the ID we want
		if (todos[i].id == id) {
			currentStatus = todos[i].done;
			console.log("322...in array function now... the status of the todo element in the array before we update is: " + currentStatus);
			if (currentStatus == "true")	{
				// current status is true so set to false (not done)
				todos[i].done = "false";
			}
			else if (currentStatus =="false")	{
				// current status is false so set to true (done)
				todos[i].done = "true";
			}
		// we are done so exit the function
		console.log("332... the status of the todo element in the array after we updated is now: " + todos[i].done);
		//break;
		updatePage(currentStatus);
		}
	}
}
// This function updates the page with the changed status of the todo item
// It simply toggles that class back and forth as user clicks, switching between
// 'done' class (green with checkmark) to 'not done' (reddish box with no checkmark)
function updatePage(el)	{
	var spanClass = el.target.getAttribute("class");
	console.log('342... now we are in the updatePage(el) function...');
	console.log('current status of the spanClass is: ' + el.target.innerHTML);
	if (spanClass =="done")	{
		//item's current status is done, so switch to 'not done'
		el.target.setAttribute("class","notDone");
		el.target.innerHTML = "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;";
	}
	else if (spanClass =="notDone") 	{
		//item is not done, so make it done
		el.target.setAttribute("class","done");
		el.target.innerHTML = "&nbsp;&#10004;&nbsp;";
	}
}	
// Parent updateDone function that calls all the child functions
// when the user clicks on the update status button (checkmark)
function updateDone(el) {
	// To update the todo item's status on the page we just need to change the style of the span
	//UPDATE TODO STATUS IN LOCAL STORAGE
	console.log('358... we are in the updateDone(el) function...the user has clicked on the item to change status');
	console.log('first thing... we call the updateLocalStorage subfunction...');
	updateLocalStorage(el);
	/*//UPDATE THE STATUS OF THE ITEM IN THE ARRAY
	console.log('second thing... we call the updateArray subfunction...');
	updateArray;
	// UPDATE THE TODO ITEM STATUS ON THE PAGE
	console.log('third and lastly... we call the updatePage subfunction...');
	updatePage(el);*/
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
	// search for the string in the array by looping thru the array
	// looking for the string within either the 'task' property or the 'who' propery
	// (remember the array element contains a todo object)
	for (var i= 0; i <todos.length; i++)	{
		// look for the string in the current array element todo object
		// the requirements are to search in both the who property and the task property
		// so we will do that by concatenting those two properties/fields and then
		// searching that combined string as one unit
		var textToSearch = todos[i].who + todos[i].task;
		// now we search the text of the textToSearch using our regex
		// we use the 'match' string method which results in an array
		// which we store in a variable named 'results'
		var results = textToSearch.match(re);
		// now call the function to show the results of the search to the screen
		console.log("line 397 " + results);
		showResults(results);
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
	if (results.length != null)	{
		for (var i = 0; i < results.length; i++) {
			var li = document.createElement("li");
			li.innerHTML = results[i];
			frag.appendChild(li);
		}
		ul.appendChild(frag);
	}
	else	{
		// array was length = 0, so no results found from search
		alert("sorry, no results found!");
	}			

}