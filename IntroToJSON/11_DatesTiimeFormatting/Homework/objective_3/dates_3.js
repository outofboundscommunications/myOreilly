// JavaScript Document

/*
Write a JavaScript program that splits a date string into the date part and the time part, but only if it matches the format YYYY.MM.DD hh:mmam/pm. For example: 2012.07.20 5:00pm. Make sure you can handle the following cases:

2012.07.20 5:00pm
2012.07.20 10:00pm
2012.10.01 5:00am
2012.12.05 10:00am
Create a Regular Expression to match the string. Your output should read (for example):

Date: 2012.12.05, Time: 10:00am          
Your program can display the output in the console.

*/

window.onload = init;

function init() {
	var searchButton = document.getElementById("submit");
	searchButton.onclick = processDateTime;
	}

function processDateTime(){
	//grab the date/time the user entered
	var dateTime = document.getElementById("aDate").value;
	//make sure they entered something
	if (dateTime == null || dateTime == "") {
		alert("Please enter a string to search for");
		return;
	}
	else	{
	//go ahead and process the entry
		processDate(dateTime);
	}
	
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
}