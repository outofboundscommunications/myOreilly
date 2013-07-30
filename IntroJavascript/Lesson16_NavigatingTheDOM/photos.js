// JavaScript Document

window.onload = init;

function init() {
                
    var petsSpan = document.getElementById("pets");
    var landscapeSpan = document.getElementById("landscape");
    var oceanSpan = document.getElementById("ocean");
                
    petsSpan.onclick = selectPets;
    landscapeSpan.onclick = selectLandscape;
    oceanSpan.onclick = selectOcean;
    // select all the <a> elements in the DOM and place the collection in variable
	// loop thru this collection of image links <a> and add
	// the addImage() function as click handler to each    
    var links = document.querySelectorAll("a");
    for (var i = 0; i < links.length; i++) {
        links[i].onclick = addImage;
    }
}
                
function selectPets() {
    var ul = document.getElementById("petsList");
    showHide(ul);
}
                
function selectLandscape() {
    var ul = document.getElementById("landscapeList");
    showHide(ul);
}
                
function selectOcean() {
    var ul = document.getElementById("oceanList");
    showHide(ul);
}
                
function showHide(el) {

    // deselect everything but element you want
    var selectedItems = document.querySelectorAll(".show");
    for (var i = 0; i < selectedItems.length; i++) {
        if (selectedItems[i] != el) {
            selectedItems[i].setAttribute("class", "");
        }
    }
                
    var ulClass = el.getAttribute("class");
    if (ulClass == "show") {
        // element class set to show to set to null
        el.setAttribute("class", "");
    }
    else {
        // element class null so you can set to show
        el.setAttribute("class", "show");
    }
}
// define our addImage () event handler, with an element object param.             
function addImage(e) {	
// assign target property of event object to var "a" 
	var a = e.target; 
 // get image url and assign to var 'imagePath'
    var imagePath = a.getAttribute("href");
// create an image var called 'image'
    var image = document.createElement("img");
// define image reference to imagePath found above
    image.setAttribute("src", imagePath); 
	
// now we add that new image element to the DOM
// we add it as a 'child' of the 'image/' <div>
    var div = document.getElementById("image");
        // find old image with document.querySelector() method
		// which in this case only returns only one <img> element 
		 var oldImage = document.querySelector("img");
		 // check and see if there really is an old image
		 // if old image exists, find it's parent element using parentElement property
		 // then we use removeChild() method to remove the child image
		 if (oldImage) {
			 var oldImageParent = oldImage.parentElement;
			 oldImageParent.removeChild(oldImage);
     	} 
		
		div.appendChild(image); // add new image to the div
	    return false; // keeps browser from following image link
}