// JavaScript Document


window.onload = init;

var validOperators = new Array();
var validOperators = ['+','-','/','x','X','*'];

var data = [7,8,9];

function init() {
	//A click handler for handling the submit button.
	var submit = document.getElementById("submit");
	//When the user clicks the button, compute the result of the expression.
    submit.onclick = computeResults;
}

function computeResults() {
    var theResult;
	var operand1 = document.getElementById("operand1").value;
	var operand2 = document.getElementById("operand2").value;
	var operator= document.getElementById("operator").value;
   //If any of the three form inputs are empty, alert the user with a message.
    if (operand1 == null || operand1 == "") {
        alert("Please enter a value");
        return;
    }
    if (operand2 == null || operand2 == "") {
        alert("Please enter a value");
        return;
    }
	if (operator == null || operator == "") {
        alert("Please enter an operator (/ or * or +, etc");
        return;
    }
	//if the operator is not correct, send alert
	//define reg expression to match operator (add, subtract, divide, multiply)
	var re = new RegExp("[\+\-\/x\*]","ig");
	console.log(operator);
	var results = operator.match(re);
	if (results == null)	{
		alert("not correct operator - Please enter an operator (/ or * or +, etc");
		return;
	}

   //If either of the operands is not a valid integer (use isNaN() to determine this), throw an error.
    try {
        if (isNaN(operand1)) {
            throw new Error("Number format error. Please enter a number for operand 1");
        }
        if (isNaN(operand2))	{
			throw new Error("Number format error. Please enter a number for operand 2");
		}
		else {
            runCalculation(operand1,operand2,operator);
        }
    }
    catch (ex) {
        alert(ex.message);
    }
	
}
	function runCalculation(operand1,operand2,operator)	{
		console.log('run calculation');
		var operand1String = operand1;
		var operand1Num = parseInt(operand1String);
		var operand2String = operand2;
		var operand2Num = parseInt(operand2String);
		console.log(operand1String + " " + operand2String);
		console.log(operand1Num + " " + operand2Num);
		if (operator == "/")	{
			 //If the user tries to divide by zero (operand2), throw an error.
			if (operand2 == 0)	{
				throw new Error("You cannot divide by zero. sorry. try again");
			}
			else	{
			theResult2 = operand1Num / operand2Num;
			console.log(theResult2);
			}
		}
		if (operator == "*" | "x" | "X")	{
			theResult2 = operand1Num*operand2Num;
			console.log(theResult2);
		}
		if (operator == "+")	{
			theResult2 = operand1Num+operand2Num;
			console.log(theResult2);
		}
		if (operator == "-")	{
			theResult2 = operand1Num-operand2Num;
			console.log(theResult2);
		}
		displayResult(theResult2);
	}
	function displayResult(theResult2)	{
		console.log('run displayResult');
		var Result = document.getElementById("result");
        Result.innerHTML = theResult2;
	}
	