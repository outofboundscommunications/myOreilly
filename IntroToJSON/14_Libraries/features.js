//Modernizr will make sure that init () runs once the page is loaded and the feature test is
//complete, so we don't have to define the window.onload property in features.js anymore
//window.onload = init;
//init() and its findLocation() function will run after all the tests are complete
//and modernzr detects that the window has loaded

console.log('we are now in the features.js file');
function init() {
	console.log('we are now within the init() function and getting ready to call the findLocation() function');
	findLocation();
	storeSomething("favFlavor", "Vanilla Chocolate Chip");
}

function addFeature(featureMessage) {
	var ul = document.getElementById("features");
	var li = document.createElement("li");
	li.innerHTML = featureMessage;
	ul.appendChild(li);
}