console.log('we are now in the nolocalStorage.js file');
//function to fetch todo items from local storage
//but since the user doesnt have this functionality, we have to alert them instead
function getTodoItems() {
	alert("Error: you don't have localStorage so we can fetch any of your prior todo items!");
    }

//function to save todo items from local storage
function saveTodoItem(todoItem) {
	alert('Error: You dont have local storage so we cant save your todo items');
    }
//now call the function

getTodoItems();