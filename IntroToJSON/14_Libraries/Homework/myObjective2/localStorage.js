// JavaScript Document
//function to fetch todo items from local storage

function getTodoItems() {
    console.log('we are in the getTodoItems() function');
	if (localStorage) {
        for (var i = 0; i < localStorage.length; i++) {
            var key = localStorage.key(i);
            if (key.substring(0, 4) == "todo") {
                var item = localStorage.getItem(key);
				var todoItem = JSON.parse(item);
				//pass todoItem to function so we calculate diff between current date and due date
				calculateDueDate(todoItem);
				//log to console the value of the difference
				//push the todo Item to the array
                todos.push(todoItem);
            }
        }
		//now add the todos to the page
		addTodosToPage();
    }
    else {
        console.log("Error: you don't have localStorage!");
    }
}

//function to save todo items from local storage
function saveTodoItem(todoItem) {
    if (localStorage) {
        var key = "todo" + todoItem.id;
        var item = JSON.stringify(todoItem);
		console.log('we are in the saveTodoItem function...' + ' the todoItem to save is: ' + todoItem);
        localStorage.setItem(key, item);
    }
    else {
        console.log("Error: you don't have localStorage!");
    }
}
//now call the function

//getTodoItems();