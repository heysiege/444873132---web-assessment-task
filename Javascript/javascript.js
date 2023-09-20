// including a HTML snippet function - copied from w3 schools
function includeHTML() {
    var z, i, elmnt, file, xhttp;
    /* Loop through a collection of all HTML elements: */
    z = document.getElementsByTagName("*");
    for (i = 0; i < z.length; i++) {
        elmnt = z[i];
        /*search for elements with a certain atrribute:*/
        file = elmnt.getAttribute("w3-include-html");
        if (file) {
        /* Make an HTTP request using the attribute value as the file name: */
        xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function() {
            if (this.readyState == 4) {
            if (this.status == 200) {elmnt.innerHTML = this.responseText;}
            if (this.status == 404) {elmnt.innerHTML = "Page not found.";}
            /* Remove the attribute, and call this function once more: */
            elmnt.removeAttribute("w3-include-html");
            includeHTML();
            }
        }
        xhttp.open("GET", file, true);
        xhttp.send();
        /* Exit the function: */
        return;
        }
    }
}


// javascript for puzzle pages - opening and closing the questions to see the answer
document.addEventListener('DOMContentLoaded', function () {
    const questionContainer = document.querySelector('.question-container');

    // when the container (parent div) is clicked, find the specific element that was clicked
    questionContainer.addEventListener('click', function (event) {
        const clickedElement = event.target;
        
        // if the specific element that was clicked was a question, then find the answer and toggle showing or hiding the parent
        if (clickedElement.classList.contains('question')) {
            const element = clickedElement.closest('.element');
            const answer = element.querySelector('.answer');
            answer.style.display = answer.style.display === 'none' ? 'block' : 'none';
        }
        // if the element clicked was the icon, the also find the answer and toggle showing or hiding the parent
        else if (clickedElement.classList.contains('fa-angle-down')) {
            const element = clickedElement.closest('.element');
            const answer = element.querySelector('.answer');
            answer.style.display = answer.style.display === 'none' ? 'block' : 'none';
        }
    });
});


// function for the navigation bar, to make it responsive
// function is called when the menu icon is clicked
function openNavLinks() {
    const subscribeButton = document.getElementById("navSubscribeButton");
    const navBar = document.getElementById("header");
    const navPuzzlesButton = document.getElementById("navPuzzles");
    const navPuzzlesOptions = document.getElementById("navPuzzlesOptions");
    const hamburgerIcon = document.getElementById("hamburgerIcon");
    const gap = document.getElementById("gap");

    // if the navigation bar does not have the 'resize' class, then add it
    if (navBar.className === "navigationBar") {
        navBar.className += " resize";
        navPuzzlesButton.className += " resize";
        navPuzzlesOptions.className += " resize";
        subscribeButton.className += " resize";
        gap.className += " resize";
        // center the icon
        hamburgerIcon.style.width = "100%";
    }
    // if the navigation bar does  have the 'resize' class, then remove it
    else {
        navBar.className = "navigationBar";
        navPuzzlesButton.className = "navPuzzles";
        navPuzzlesOptions.className = "navPuzzlesOptions";
        subscribeButton.className = "navSubscribeButton";
        gap.className = "gap";
        // move the icon back to the left
        hamburgerIcon.style.width = "";
    }
}


// function for searching on the page for a blog article based on the title, captions, or keywords
function blogSearch() {
    let search = document.getElementById("searchBar").value;
    let text = document.querySelectorAll('.text');

    // loop through each character in the user's search
    for (var i = 0; i < text.length; i++) {
        // if the text in a post card contains the user's search then show it
        if(text[i].textContent.toLowerCase().includes(search.toLowerCase())) {
            text[i].parentNode.style.display = "";
        } 
        // if the text in a post card doesn't contain the user's search then hide it
        else {
            text[i].parentNode.style.display = "none";
        }
    }
}


// function for enter button being used as the search button
// suitable for touch screen and non-touch screen
function pressEnterSearch(event) {
    if (event.keyCode === 13) {
        document.getElementById("searchButton").click();
    } 
    // if the input is empty, click the search button to reset the search
    else if (document.getElementById("searchBar").value.trim() === '') {
        document.getElementById("searchButton").click();
    }
}


// function for enter button being used as the subscribe button
// suitable for touch screen and non-touch screen
function pressEnterSubscribe(event) {
    if (event.keyCode === 13) {
        document.getElementById("newsletterSubscribeButton").click();
    } 
}


// function for the newsletter signup
function subscribeNewsletter() {
    const form = document.getElementById("detailsForm");
    const name = document.getElementById("nameInput").value;
    const email = document.getElementById("emailAddress");
    const completeMessage = document.getElementById("completeMessage");
    const nameMessage = document.getElementById("name");
    const errorMessage = document.getElementById("errorMessage");

    // if the name is blank, show an error message
    if (name === "") {
        completeMessage.style.display = "none";
        errorMessage.style.display = "block";
        errorMessage.textContent = "Please enter your name."    
        return;
    }
    // if the email is blank, show an error message
    else if (email.value === "") {
        completeMessage.style.display = "none";
        errorMessage.style.display = "block";
        errorMessage.textContent = "Please enter a valid email address."  
        return;  
    }
    // check to see if the email is correct from the email input, and if it isn't, show an error message
    else if(!email.checkValidity()) {
        completeMessage.style.display = "none";
        errorMessage.style.display = "block";
        errorMessage.textContent = "Please enter a valid email address."
        return;
    }
    // if the above are all filled out and correct, show a completion message with the user's name
    else {
        nameMessage.textContent = name;
        completeMessage.style.display = "block";
        errorMessage.style.display = "none";
        form.reset();
    }
}


// sticky header on scroll
window.onscroll = function() {stickyScroll()};

const header = document.getElementById("header");
const sticky = header.offsetTop;

// when the window's scroll reaches the position of the header, make it stick. other wise, make it scroll normally
function stickyScroll() {
  if (window.scrollY > sticky) {
    header.classList.add("stick");
  } 
  else {
    header.classList.remove("stick");
  }
}


// subscribe button for the popup display on home page
function popupSub() {
    const popupWindow = document.getElementById("newsletterPopup");
    const popupEmail = document.getElementById("popupEmail");
    const valid = document.getElementById("valid");
    const overlay = document.getElementById("backgroundOverlay");

    if (popupEmail.value === "") {
        valid.style.display = "block";
    }
    else if(!popupEmail.checkValidity()) {
        valid.style.display = "block";
    }
    else {
        valid.style.display = "none";
        popupWindow.style.display = "none";
        overlay.style.opacity = "0";
        overlay.style.zIndex = "-1";
    }
}

// hiding the pop up display and the overlay
function cross() {
    const popupWindow = document.getElementById("newsletterPopup");
    const overlay = document.getElementById("backgroundOverlay");

    popupWindow.style.display = "none";
    overlay.style.opacity = "0";
    overlay.style.zIndex = "-1";
}

