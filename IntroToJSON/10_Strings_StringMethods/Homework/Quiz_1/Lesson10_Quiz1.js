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
	
	/*Question 1:
	Combine the statements in green into one statement using chaining:
	
	var sentence = "I scream, you scream, we all scream for ice cream";
	var upper = sentence.toUpperCase();
	var sub = upper.substring(3, 10);
	var length = sub.length;
	*/
		
	var sentence = "I scream, you scream, we all scream for ice cream";
	var myChainLength = sentence.toUpperCase().substring(3,10).length;
	var answer1 = ("when we chain all three functions into one, the length of the substring (3,10) is: " + myChainLength);
	var question1Answer = document.getElementById("questionOneAnswer");
	showResults(answer1,"questionOneAnswer");  
	
	/*Question 2:
	How would you get the last 9 characters of any string that is at least 9 characters long? Like this one:
	
	var sentence = "I scream, you scream, we all scream for ice cream";    
	Note that you won't know in advance what the strings are!*/
	  
	  var textToSearch = "How would you get the last 9 characters of any string that is at least 9 characters long";
	  var stringLength = textToSearch.length;
	  console.log(stringLength);
	  // we want to get the last nine characters of the string
	  // so all we do is start at the end of the string and
	  // grab the preceding nine characters
	  var firstCharacterInString = stringLength-9;
	  console.log(firstCharacterInString);
	  var ourString = textToSearch.substring(firstCharacterInString,stringLength);
	  var answer2 = ("the last nine characters of the string are: " + ourString);
	  var question2Answer = document.getElementById("questionTwoAnswer");
	  showResults(answer2, "questionTwoAnswer");
	  
	  
	  /*Question 3:
	Given this code: Would you be able to find the word "right" if you wrote this loop?*/
	// the answer is no because the loop adds the character ';' to the word right (right;) so
	// it doesnt trigger the alert

	  var sentence = "I am quite sure I'm right; check with the Wikipedia to make sure.";
	  var words = sentence.split(" ");    
	  for (var i = 0; i < words.length; i++) {
		  console.log(words[i]);
		  if (words[i] == "right") {
			  alert("You found it!");
		  }
	  }   
	  
	  var answer3 = ("Would you be able to find the word 'right' if you wrote this loop? ");
	  var question3Answer = document.getElementById("questionThreeAnswer");
	  answer3 = "the answer is no because the loop adds the character ';' to the word right (right;) so it doesnt trigger the alert";
	  showResults(answer3, "questionThreeAnswer");
	  
	  /*Question 4:
		What regular expression would you write to match all phone numbers in the format: 310-555-1212 
		(but, of course, matching any phone number, not just this one)?*/
	  var myRegEx = "[0-9]{3}\-[0-9]{3}\-[0-9]{4}";
	  textToSearch = "913-220-0280";
	  var re = new RegExp(myRegEx);
	  var results = textToSearch.match(re);
	  console.log(results);
	  var answer4 = ("What regular expression would you write to match all phone numbers in the format: 310-555-1212 ?");
	  var question3Answer = document.getElementById("questionFourAnswer");
	  answer3 = "[0-9]{3}\-[0-9]{3}\-[0-9]{4}";
	  showResults(answer3, "questionFourAnswer");
}