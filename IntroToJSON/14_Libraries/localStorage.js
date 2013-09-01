// JavaScript Document
console.log('we are now in the localStorage.js file');
function storeSomething(key, item) {
	localStorage.setItem(key, item);
	addFeature("Just stored " + key + ", " + item + " in Local Storage");
}