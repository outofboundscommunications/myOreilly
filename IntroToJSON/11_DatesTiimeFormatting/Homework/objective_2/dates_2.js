// JavaScript Document

window.onload = init;

function init() {
	//select the DOM element where we want to display result
	var datetime = document.getElementById("datetime");
	//we need to find how many days there are in the 21st century
	//to do that we get the difference between the last day and first day of the century
	//and then convert that number into days using .math functions to format the number correctly
	
	//first create the future date object
	var futureDate = new Date();
	futureDate.setFullYear(2100);
	futureDate.setMonth(0,1)
	futureDate.setHours(00);
	futureDate.setMinutes(0);
	futureDate.setSeconds(0);
	
	//create the intial date object, first day of 21st century
	var initialDate = new Date();
	initialDate.setFullYear(2000);
	initialDate.setMonth(0,1)
	initialDate.setHours(00);
	initialDate.setMinutes(0);
	initialDate.setSeconds(0);
	
	//calculate difference between two date objects, default units are in milliseconds
	var diff = futureDate.getTime() - initialDate.getTime();
	//convert the milliseconds to days
	var days = Math.round(diff / 1000 / 60 / 60 / 24);
	console.log(days);
	//display result on html page
	datetime.innerHTML = days;
	
}