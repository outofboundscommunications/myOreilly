// JavaScript Document
/*	var myDate = "2012-03-22";
	var myDateRegEx = new RegExp("/\d{4}-\d{2}-\d{2}/g");
	var myDateResults = myDate.match(myDateRegEx);
	//if the length of the array is zero, then the date didnt match
	//and we display an alert
	if (!myDateResults)	{
		alert("sorry the date is not in the right format!");
	}
	//date format validated, now go on to validating time
	else	{
		console.log('the date looks valid, lets now check the time');
		//processTime(myTime);
	}*/
	
	
	var myDate = "2012-03-22";
	var myDateResults = myDate.match(/\d{4}-\d{2}-\d{2}/g);
	//if the length of the array is zero, then the date didnt match
	//and we display an alert
	if (!myDateResults)	{
		alert("sorry the date is not in the right format!");
	}
	//date format validated, now go on to validating time
	else	{
		console.log('the date looks valid, lets now check the time');
		//processTime(myTime);
	}