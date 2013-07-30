// JavaScript Document

window.onload = init;

function init() {
	var searchButton = document.getElementById("searchButton");
	searchButton.onclick = searchText;
	}

function searchText() {
	var searchTerm = document.getElementById("searchTerm").value;
	var textToSearch = document.getElementById("textToSearch").value;
	searchTerm = searchTerm.trim();
	textToSearch = textToSearch.trim();
	if (searchTerm == null || searchTerm == "") {
		alert("Please enter a string to search for");
		return;
	}
	if (textToSearch == null || textToSearch == "") {
		alert("Please enter some text to search");
		return;
	}
	
// METHOD #1 TO SEARCH FOR STRING - use indexOf() method
	//Use position variable to keep track of the position where we find each
	//instance of searchTerm. As long as pos is >=0, we know we have found
	//another instance of the searchTerm
	//Use count to count the # instances we find the searchTerm
	/*
	
	var pos = 0;
	var count = 0;
	while (pos >= 0)	{
		//use the second optional argument of the indexOf() method to indicate
		//where to start the search
		pos = textToSearch.toUpperCase().indexOf(searchTerm.toUpperCase(), pos);
		console.log("position before: ", pos);
        if (pos >= 0) {
            count++;
            pos++;
        }
    }
    alert("Found " + count + " instances of " + searchTerm);*/
	
	
// METHOD #2 TO SEARCH FOR STRING - use split() method
	//use split() method to split the text into individual words that we then
	//store in an array
	//split the textToSearch into words at each instance of a space (" ") and store
	//the results in an array named "results" 	
	
	/*
	var results = textToSearch.split(" ");
	console.log(results);
    var count = 0;
	//loop thru the array
    for (var i = 0; i < results.length; i++) {
        //if the current value of the element (word) in the array equals the search term
		//we are looking for
		if (searchTerm.toUpperCase() == results[i].toUpperCase()) {
            //then increment the counter by one and keep going
			count++;
        }
    }
    alert("Found " + count + " instances of " + searchTerm + " out of a total of " + results.length + " words!");
	
	*/
// METHOD #3 TO SEARCH FOR STRING - use RegEx and match() method
	//create a regular expression object using the RegEx() constructor
	//pass in the search term and the second argument "ig"
	//"i" = ignore case and "g" = 'globally' match every instance
	var re = new RegExp(searchTerm, "ig");
	//to match the searchTerm (pattern) to some text, we use the match() method
	//we pass the pattern we want to search for in the variable re
    var results = textToSearch.match(re);
    if (results == null) {
        alert("No match found");
    }
    else {
       // alert("Found " + results.length + " instances of " + searchTerm);
        // Show the matches in the page
        showResults(results);
    }

}  
	function clearResultsList(ul) {
		while (ul.firstChild) {
			ul.removeChild(ul.firstChild);
		}
	}

	//function to take the [results] array and displays the results on the page
	function showResults(results) {
		var ul = document.getElementById("matchResultsList");
		clearResultsList(ul);
		var frag = document.createDocumentFragment();
		for (var i = 0; i < results.length; i++) {
			var li = document.createElement("li");
			li.innerHTML = results[i];
			frag.appendChild(li);
		}
		ul.appendChild(frag);
	}   
		