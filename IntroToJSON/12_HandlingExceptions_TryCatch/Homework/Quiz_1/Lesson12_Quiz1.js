// Javascript for Lesson 10 Quiz 1



///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//question 1
/*
window.onload = init;

function init() {
    var myInput = prompt("Enter a number: ");
    try {
        var myNum = parseInt(myInput);
        if (isNaN(myNum)) {
            throw new Error("Error: you entered something that isn't a number.");
        }
        else if (myNum == 0) {
            throw new Error("Error: you entered 0, and we're going to divide. You can't divide by 0!");
        }
        else if (myNum > 100 || myNum < -100) {
            throw new Error("Error: sorry, that number is too big or small. Try again. Make sure the number is between -100 and 100.");
        }
        var newValue = 365/myNum;
        alert("The new value is: " + newValue);
    }
    catch (ex) {
        alert(ex.message);
    }
} */

  
//now display answers
//input 1 results in the try clause being successful (it works)
//input 1 = 35

//input 2-4 throw exceptions
//input 2 = abc
//input 3 = 0
//input 4 = 1000

//////////////////////////////////////////////////////////////////////////////////////////////////////
//question 2

/*function init() {
    try {
        undefinedFunction();
    }
    catch(e) {
        alert(e);
    }
}
*/
//this function thows the following error/alert: "ReferenceError: undefinedFunction is not defined"

//////////////////////////////////////////////////////////////////////////////////////////////////////
/*Question 3:
What alerts will you see when you run the following code? Explain why.*/

window.onload = init;

function init() {
    var count = 0;
    try {
        for (var i = 0; i < 10; i++) {
            if (i == 5) {
                throw 5;
            }
            count++;
        }
        alert(count);
    }
    catch (e) {
        alert(e);
    }
    finally {
        alert("we're done!");
    }
} 

// this function thows the following error/alerts: alert 1: "5"   alert 2: "Were done"