// To do list application with Search (from the Strings lab)
// You can use this code as your starting point, or continue with
// your own code.

function Todo(id, task, who, dueDate, dueDateFromToday,userLat,userLong) {
    this.id = id;
    this.task = task;
    this.who = who;
    this.dueDate = dueDate;
	this.dueDateFromToday = dueDateFromToday;
    this.done = false;
	this.latitude = latitude;
	this.longitude = longitude;
}

var todos = new Array();

//declare global variables so we can get and operate on the user's location 
var latitude;
var longitude;


function init() {
   //this init() function is not called until all the modernizr tests are done (see todos.html)
    var submitButton = document.getElementById("submit");
    submitButton.onclick = getFormData;

    // get the search term and call the click handler
    var searchButton = document.getElementById("searchButton");
    searchButton.onclick = searchTodos;

	//all the tests are done by modernizr, lets find the location of the user
	//if the modernizr test resulted in 'nogeolocation.js' being loaded, all that happens is a log to console about no support for geo
	//if the modernizr test resulted in 'geolocation.js' being loaded, then the location of the user is stored in the todo object
}

//function to calculate difference between current and due date for todo items
function calculateDueDate(todoItem)	{
	console.log('we are in the calculateDueDate(todoItem) function');
	//figure out current date and store in variable
	var now = new Date();
	//retrive the due date from the todo Item object
	var dueDateString = todoItem.dueDate;
	//parse the date string into a date using the Date.parse method
	var dueDate = Date.parse(dueDateString);
	//create a new date object from the dueDate (which is parsed into milliseconds)
	var aDueDate = new Date(dueDate);
	console.log('the due date of the item is: ',aDueDate);
	//calculate how many days till overdue
	var diff = aDueDate - now;
	//convert to days
	var diffDays = Math.floor(diff / 1000 / 60 / 60 / 24); 
	console.log('the current date is: ' + now.toLocaleString());
	console.log('the days until this item is due is: ' + diffDays);
	//store prior due date from today in temp
	var initialDueDateFromToday = todoItem.dueDateFromToday;
	//store current due date from today in temp
	var currentDueDateFromToday = diffDays;
	//update todoItem's element with current due date from today and return
	todoItem.dueDateFromToday = currentDueDateFromToday;
	return todoItem;
		
}

//this is used for adding the todos that are stored in local storage from prior user input
function addTodosToPage() {
    console.log('we are in the addTodostoPage() function');
	var ul = document.getElementById("todoList");
    var listFragment = document.createDocumentFragment();
    for (var i = 0; i < todos.length; i++) {
        var todoItem = todos[i];
        var li = createNewTodo(todoItem);
        listFragment.appendChild(li);
    }
    ul.appendChild(listFragment);
}

//this is used for adding individual todos that the user inputs via the form (after initial page load and stored todos are added)
function addTodoToPage(todoItem) {
    console.log('we are in the addTodotoPage() function');
	var ul = document.getElementById("todoList");
    var li = createNewTodo(todoItem);
    ul.appendChild(li);
    document.forms[0].reset();
}

function createNewTodo(todoItem) {
    console.log('we are in the createNewTodo() function');
	var li = document.createElement("li");
    li.setAttribute("id", todoItem.id);
	var dueDateFromTodayText = "";
	if (todoItem.dueDateFromToday > 0 )	{
			dueDateFromTodayText = " (" + todoItem.dueDateFromToday+" days)";
		}
	else	{
		dueDateFromTodayText = " (OVERDUE by " + todoItem.dueDateFromToday+" days)";
		}
    var spanTodo = document.createElement("span");
    spanTodo.innerHTML =
        todoItem.who + " needs to " + todoItem.task + " by " + todoItem.dueDate + dueDateFromTodayText;
    var spanDone = document.createElement("span");
    if (!todoItem.done) {
        spanDone.setAttribute("class", "notDone");
        spanDone.innerHTML = "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;";
    }
    else {
        spanDone.setAttribute("class", "done");
        spanDone.innerHTML = "&nbsp;&#10004;&nbsp;";
    }

    // add the click handler to update the done state
    spanDone.onclick = updateDone;

    // add the delete link
    var spanDelete = document.createElement("span");
    spanDelete.setAttribute("class", "delete");
    spanDelete.innerHTML = "&nbsp;&#10007;&nbsp;";
    // add the click handler to delete
    spanDelete.onclick = deleteItem;
	
	// add map coordinates where user is/was when todo created
	var spanMap = document.createElement("span");
	spanMap.innerHTML = "(" + "38.41096, -122.84505" +") ";
	
	//now attach all those elements to the list item
    li.appendChild(spanDone);
	li.appendChild(spanMap);
    li.appendChild(spanTodo);
    li.appendChild(spanDelete);

    return li;
}

function getFormData() {
    console.log('we are in the getFormData() function');
	var task = document.getElementById("task").value;
    if (checkInputText(task, "Please enter a task")) return;

    var who = document.getElementById("who").value;
    if (checkInputText(who, "Please enter a person to do the task")) return;

    var date = document.getElementById("dueDate").value;
    if (checkInputText(date, "Please enter a due date")) return;
	
	//split thedateString into a date and string components and grab the date so we can validate it
	var results = date.split(" ");
	var aDateString = results[0];
	//try to parse myDateString into a date, if you can, then string is valid date format
	//assign the date to a myDateMillis variable (millis = milliseconds)
	var aDateMillis = Date.parse(aDateString);
	console.log("log the date component in milliseconds: " + "Date: " + aDateMillis);
	
	try {
		//if aDateMillis is not a date or it is less than zero, throw exception
		if ( (isNaN(aDateMillis)) || (aDateMillis <0 )  ){
			throw new Error("Date format error. Please enter the date in the format MM/DD/YYYY");
			return;
		}
		else {
			//date is valid format so convert the date in milliseconds to a real date object
			aDate = new Date(aDateMillis);
			console.log(aDate);
			var id = (new Date()).getTime();
			//need to initialize the value of the dueDateFromToday variable, we use this later to calculate difference
			//from due date and current date
			var dueDateFromToday = 0; 
			//get current location of the user
			tryLocation();
			console.log('latitude is: ' + latitude + 'longitude is: ' + longitude);
			var todoItem = new Todo(id, task, who, date, dueDateFromToday,latitude,longitude);
			//pass todoItem to function so we calculate diff between current date and due date
			calculateDueDate(todoItem);
			todos.push(todoItem);
			addTodoToPage(todoItem);
			saveTodoItem(todoItem);
		
			// hide search results
			hideSearchResults();
		}
		}
	catch (ex) {
		alert(ex.message);
	}
	
}

function checkInputText(value, msg) {
    if (value == null || value == "") {
        alert(msg);
        return true;
    }
    return false;
}

function updateDone(e) {
    console.log('we are in the updateDone(e) function');
	var span = e.target;
    var id = span.parentElement.id;
    var item;
    for (var i = 0; i < todos.length; i++) {
        if (todos[i].id == id) {
            item = todos[i];
            break;
        }
    }
    if (item.done == false) {
        item.done = true;
        span.setAttribute("class", "done");
        span.innerHTML = "&nbsp;&#10004;&nbsp;";
    }
    else if (item.done == true) {
        item.done = false;
        span.setAttribute("class", "notDone");
        span.innerHTML = "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;";
    }
    var itemJson = JSON.stringify(item);
    var key = "todo" + id;
    localStorage.setItem(key, itemJson);
}

function deleteItem(e) {
    console.log('we are in the deleteItem(e) function');
	var span = e.target;
    var id = span.parentElement.id;

    // find and remove the item in localStorage
    var key = "todo" + id;
    localStorage.removeItem(key);

    // find and remove the item in the array
    for (var i = 0; i < todos.length; i++) {
        if (todos[i].id == id) {
            todos.splice(i, 1);
            break;
        }
    }

    // find and remove the item in the page
    var li = e.target.parentElement;
    var ul = document.getElementById("todoList");
    ul.removeChild(li);

    // hide search results
    hideSearchResults();
}

// Search
function searchTodos() {
    console.log('we are in the searchTodos() function');
	// new search, so clear previous results
    clearSearchResultsList();
    // get the text to search for
    var searchTerm = document.getElementById("searchTerm").value;
    var count = 0;
    // check all the todos in the list
    for (var i = 0; i < todos.length; i++) {
        var todoItem = todos[i];
        // make a regular expression to match the search term, regardless of case
        var re = new RegExp(searchTerm, "i");
        // try matching the expression with the task and the who from the to do item
        // in this case, we don't need the match results array; we just need to know
        // it exists for this to do item. If there is no match results, then the 
        // result of match is null, so the "if" test will fail.
        if (todoItem.task.match(re) || todoItem.who.match(re)) {
            // if we find a match, add the to do item to the search results
            addSearchResultToPage(todoItem);
            // keep a count of the number of items we match
            count++;
        }
    }
    // if we don't match any items, display "no results" in the search results list
    if (count == 0) {
        var ul = document.getElementById("searchResultsList");
        var li = document.createElement("li");
        li.innerHTML = "No results!";
        ul.appendChild(li);
    }
    // show the search results
    showSearchResults();
}

// add a search result to the search results list in the page
function addSearchResultToPage(todoItem) {
    console.log('we are in the addSearchResultsToPage(todoItem) function');
	var ul = document.getElementById("searchResultsList");
    var li = document.createElement("li");
    li.innerHTML =
        todoItem.who + " needs to " + todoItem.task + " by " + todoItem.dueDate;
    ul.appendChild(li);
}

// clear the previous search results by removing all the children of the "searchResultsList" ul element
function clearSearchResultsList() {
    console.log('we are in the clearSearchResultsList function');
	var ul = document.getElementById("searchResultsList");
    while (ul.firstChild) {
        ul.removeChild(ul.firstChild);
    }
}

// This is just a nifty trick to show/hide the search results, so we don't show anything
// unless the user's just searched. Extra credit! :-)
function hideSearchResults() {
    console.log('we are in the hideSearchResults function');
	var div = document.getElementById("searchResults");
    div.style.display = "none";
    clearSearchResultsList();
}

function showSearchResults() {
    console.log('we are in the showSearchResults function');
	var div = document.getElementById("searchResults");
    div.style.display = "block";
    document.forms[0].reset();
}  

