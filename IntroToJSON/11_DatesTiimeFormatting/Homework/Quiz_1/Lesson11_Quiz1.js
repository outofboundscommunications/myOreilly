// Javascript for Lesson 10 Quiz 1


window.onload = init;

function init()	{
	// function to show the results for each question
	function showResults(answer,Id)	{
	  	var ul = document.getElementById(Id);
	  	var li = document.createElement("li");
	  	li.innerHTML = answer;
	  	ul.appendChild(li);
	}
		
	var now = new Date(); 
	var someTime = (24 * 60 * 60 * 1000) * 7; 
	var anotherDate = new Date(now.getTime() - someTime);
	console.log('someTime = ' + someTime);
	console.log('now.getTime() = ' + now.getTime());
	var questionOneAnswer = document.getElementById("questionOneAnswer");
	showResults(anotherDate,"questionOneAnswer");  
	
	
}