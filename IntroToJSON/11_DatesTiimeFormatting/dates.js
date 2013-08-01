// JavaScript Document for dates.html

window.onload = init;

function init() {
	//set variables for the span elements
	var datetime = document.getElementById("datetime");
	var datetime2 = document.getElementById("datetime2");
	var datetime3 = document.getElementById("datetime3");
	var datetime4 = document.getElementById("datetime4");
	
	//create date object
	var now = new Date();
	
	//set the content of the datetime 'span' in the html to that date
	datetime.innerHTML = now.toString();
	
	//set the content of the span to UTC time (coordinated universal time)
	datetime2.innerHTML = now.toUTCString();
	var hoursDiff = (now.getTimezoneOffset()) / 60;
	datetime2.innerHTML += ", " + hoursDiff + " hours difference from me," + " or " + now.getTimezoneOffset() + " minutes difference from me."


}