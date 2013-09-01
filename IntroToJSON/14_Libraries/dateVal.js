//trying to figure out how to make this exception function work...

var aDateString = "abcdefg";
//try to parse myDateString into a date, if you can, then string is valid date format
//assign the date to a myDateMillis variable (millis = milliseconds)
var aDateMillis = Date.parse(aDateString);
console.log("log the date component in milliseconds: " + "Date: " + aDateMillis);

try {
		//if aDateMillis is not a date or it is less than zero, throw exception
		if ( (isNaN(aDateMillis)) || (aDateMillis <0 )  ){
			throw new Error("Date format error. Please enter the date in the format MM/DD/YYYY");
		}
		else {
			//date is valid format so convert the date in milliseconds to a real date object
			aDate = new Date(aDateMillis);
			console.log(aDate);
		}
		}
catch (ex) {
	alert(ex.message);
}
	
/*	
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
	}*/