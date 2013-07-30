// JavaScript Document

/*
Objective 1:
Write a JavaScript program to set the date to 6:00pm, December 21, 2100 using the Date object's set methods.

When your project is working to your satisfaction, hand in your html and js files.
*/

window.onload = init;

function init() {
	var date = document.getElementById("date");
	var time = document.getElementById("time");
	var aDate = new Date();
	aDate.setFullYear(2100,11,21);
	aDate.setHours(18)
	aDate.setMinutes(00,00);
	time.innerHTML = aDate.toLocaleTimeString();
	date.innerHTML = aDate.toDateString();
}