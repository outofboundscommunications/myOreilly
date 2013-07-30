// JavaScript Document

window.onload = init;

/* the top menu has three links, built from using an unordered list, styled to display vertically with three list items */    
/* each of the three top menu items is <span> item with a span ID */   
/* init() stores these three top nav (e.g. span) items in variables then sets up click events when someone clicks on the span ID */

/* -----------------------this block of code below is about click events & SETTING an elements value 
using the setAttribue() method */

function init() {
    var petsSpan = document.getElementById("pets");		// store Pets <li> item in petsSpan
    var landscapeSpan = document.getElementById("landscape");	// store Landscape <li> item in landscapeSpan
    var oceanSpan = document.getElementById("ocean");	// store ocean <li> item in oceanSpan
                
    petsSpan.onclick = selectPets;						// calls selectPets method upon clicking on <span id="pets">)
    landscapeSpan.onclick = selectLandscape;			// calls selectLandscape method upon clicking on <span id="landscape'>
    oceanSpan.onclick = selectOcean;					// calls selectOcean method upon clicking on <span id="ocean">
}
                
function selectPets() {									// when the 'Pets' menu/span item is clicked
    var ul = document.getElementById("petsList");		// store the child <ul> list (the pets subnav) in var ul
    //ul.setAttribute("class", "show");					//and set the <ul> class attribute value to "show", making the sub nav pets list visible
														//just like you had written: <ul id="petsList" class="show"> */
	showHide(ul);	
}
                
function selectLandscape() {
    var ul = document.getElementById("landscapeList");
    //ul.setAttribute("class", "show");
	showHide(ul);
}
                
function selectOcean() {
    var ul = document.getElementById("oceanList");
    //ul.setAttribute("class", "show");
	showHide(ul);
}

/* -----------------------end of this block of code above about using the setAttribute() method --------------- */


// -----------------------------------------------------------------------------------------------------------------
// -----------------------------------------------------------------------------------------------------------------


/* -----------------------this block of code below is about GETTING an elements value using the getAttribute() method.
It also illlustates use of the document.querySelectorAll() and setAttribute() methods to set the class of multiple elements.
To determine if the nav element is already set to 'show', if so we set to null. Doing this provides us the open/close functionality of
the top menu. If we didnt use this, the menus, post click, would stay 'stuck' open.
This showHide(el) function is now the clickEvent for each of the menu items. we pass in the element value (el) 
(one of the three <ul> menu items (Pets, Landscape or Ocean).
When you click on menu item, the showHide(el) function checks to see if that menu item is already showing or not.
If showing, we set to not showing (null), which gives us the hiding action. Click again and the function now sees
that the menu item is hidden so now it sets it to "show". -------------------------------------------------------------*/


function showHide(el) {								/* this function is called by each of the click events to implement the open/close menu 
													functionality we want. 
													code block #1 resets all the menu elements, except for the one we want,
													to null or hidden. So when you click on a menu item, that code sets all the other
													menu lists to hidden (if they aren't already). Now you can run the code block #2.
													Code block #2 then 'toggles' the nav element we clicked on to either show or hidden
													*/
   // code block #1 --------------------
      												
  var selectedItems = document.querySelectorAll(".show");	//the querySelectorAll() finds all the elements set to "show"
    for (var i = 0; i < selectedItems.length; i++) {			//loop thru all items in collection
        if (selectedItems[i] != el) {							//remove the 'show' class from all elements except one
            selectedItems[i].setAttribute("class", "");			//we clicked on
        }
    }
	
	// -------------------------------------															
	
	// code block #2 --------------------
	var ulClass = el.getAttribute("class");	//get the current value of the class attribute using the getAttribute() method
    if (ulClass == "show") {				//check to see if the ulClass variable contains the "show" string
        									// class attribute is set to "show", so we need to set to null (hidden from viewer)
        el.setAttribute("class", "");
    }
    else {
        									// class attribute is not set, so we set to "show" (now the submenu 'opens up'
        el.setAttribute("class", "show");
    }
	// ------------------------------------
}       


/* -----------------------end of the  block of code above about using the getAttribute() method --------------- */