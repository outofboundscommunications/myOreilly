// To do list application with Search (from the Strings lab)
// You can use this code as your starting point, or continue with
// your own code.
//
function Todo(id, task, who, dueDate, dueDateFromToday) {
    this.id = id;
    this.task = task;
    this.who = who;
    this.dueDate = dueDate;
	this.dueDateFromToday = dueDateFromToday;
    this.done = false;
}

var todos = new Array();

window.onload = init;

function init() {
    var submitButton = document.getElementById("submit");
    submitButton.onclick = getFormData;

    // get the search term and call the click handler
    var searchButton = document.getElementById("searchButton");
    searchButton.onclick = searchTodos;

    getTodoItems();
}

function getTodoItems() {
    if (localStorage) {
        for (var i = 0; i < localStorage.length; i++) {
            var key = localStorage.key(i);
            if (key.substring(0, 4) == "todo") {
                var item = localStorage.getItem(key);
				var todoItem = JSON.parse(item);
				//pass todoItem to function so we calculate diff between current date and due date
				calculateDueDate(todoItem);
				//log to console the value of the difference
				console.log(todoItem.dueDateFromToday);
                todos.push(todoItem);
            }
        }
        //before we add to page, need to calculate time till due date
		//function to calculate due date for each object
		//calculateDueDate();
		//now add the todos to the page
		addTodosToPage();
    }
    else {
        console.log("Error: you don't have localStorage!");
    }
}
//function to calculate difference between current and due date for todo items
function calculateDueDate(todoItem)	{
	//figure out current date and store in variable
	var now = new Date();
	//retrive the due date from the todo Item object
	var dueDateString = todoItem.dueDate;
	//parse the date string into a date using the Date.parse method
	var dueDate = Date.parse(dueDateString);
	//create a new date object from the dueDate (which is parsed into milliseconds)
	var aDueDate = new Date(dueDate);
	console.log('we are in the calcDueDate function, the due date of the item is: ',aDueDate);
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

function addTodoToPage(todoItem) {
    var ul = document.getElementById("todoList");
    var li = createNewTodo(todoItem);
    ul.appendChild(li);
    document.forms[0].reset();
}

function createNewTodo(todoItem) {
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
    
	// later, process date here
	//first we want to test to see if the date is in the correct format

    var id = (new Date()).getTime();
	//need to initialize the value of the dueDateFromToday variable, we use this later to calculate difference
	//from due date and current date
	var dueDateFromToday = 0; 
    var todoItem = new Todo(id, task, who, date, dueDateFromToday);
	//pass todoItem to function so we calculate diff between current date and due date
	calculateDueDate(todoItem);
    todos.push(todoItem);
    addTodoToPage(todoItem);
    saveTodoItem(todoItem);

    // hide search results
    hideSearchResults();
}

function checkInputText(value, msg) {
    if (value == null || value == "") {
        alert(msg);
        return true;
    }
    return false;
}

function saveTodoItem(todoItem) {
    if (localStorage) {
        var key = "todo" + todoItem.id;
        var item = JSON.stringify(todoItem);
        localStorage.setItem(key, item);
    }
    else {
        console.log("Error: you don't have localStorage!");
    }
}

function updateDone(e) {
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
    var ul = document.getElementById("searchResultsList");
    var li = document.createElement("li");
    li.innerHTML =
        todoItem.who + " needs to " + todoItem.task + " by " + todoItem.dueDate;
    ul.appendChild(li);
}

// clear the previous search results by removing all the children of the "searchResultsList" ul element
function clearSearchResultsList() {
    var ul = document.getElementById("searchResultsList");
    while (ul.firstChild) {
        ul.removeChild(ul.firstChild);
    }
}

// This is just a nifty trick to show/hide the search results, so we don't show anything
// unless the user's just searched. Extra credit! :-)
function hideSearchResults() {
    var div = document.getElementById("searchResults");
    div.style.display = "none";
    clearSearchResultsList();
}

function showSearchResults() {
    var div = document.getElementById("searchResults");
    div.style.display = "block";
    document.forms[0].reset();
}  

//functions for processing/validating the dates input by the user 
function processDate(dateTime)	{
	console.log("log the value taken from the form: " + dateTime);
	//split the date, time string into two parts, date and time
	//we are going to validate each component with a match against our RegEx
	console.log("now split the string");
	var results = dateTime.split(" ");
	//assign the date to myDate variable
	var myDate = results[0];
	//assign the time to myTime variable
	var myTime = results[1];
	console.log("log the date component: " + "Date: " + myDate);
	//use regex to see if date is in the format we want
	//create the regular expression object to match the date in this format: YYYY.MM.DD 
	console.log("run the match function using the DateRegEx and log result");
	var myDateRegEx = new RegExp("[1-9][0-9][0-9][0-9]\.[0-9][0-9]\.[0-9][0-9]","ig")
	//var myRegEx = new RegExp("[1-9][0-9][0-9][0-9]\.[0-9][0-9]\.[0-9][0-9]\s[1-12]:[0-59][am|pm]","ig")
	var myDateResults = myDate.match(myDateRegEx);
	//if the length of the array is zero, then the date didnt match
	//and we display an alert
	if (myDateResults == null)	{
		alert("sorry the date is not in the right format!");
	}
	//date format validated, now go on to validating time
	else	{
		console.log('the date looks valid, lets now check the time');
		processTime(myTime);
	}
}
function processTime(myTime)	{
	//use regex to see if time is in the format we want
	//create the regular expression object to match the time in this format: hh.mmam/pm 
	console.log("log the time component: " + "Time: " + myTime);
	var myTimeRegEx = new RegExp("(10|11|12|0?[1-9]):[0-5][0-9](am|pm)", "ig");
	//var myRegEx = new RegExp("[1-9][0-9][0-9][0-9]\.[0-9][0-9]\.[0-9][0-9]\s[1-12]:[0-59][am|pm]","ig")
	console.log("run the match function using the TimeRegEx and log result");
	var myTimeResults = myTime.match(myTimeRegEx);
	console.log(myTimeResults);
	if (myTimeResults == null)	{
		alert("sorry the time is not in the right format!");
	}
	//time format validated, so now both date and time validated, so display results
	else	{
		alert('yes, the date/time is valid!');
	}
}