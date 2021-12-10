const buttons = document.getElementsByClassName('faq-top');

//Get the button:
const mybutton = document.getElementById("myBtn");

window.onscroll = function() {navbarScroll()};

function navbarScroll() {
    if (document.body.scrollTop > 80 || document.documentElement.scrollTop > 80) {
        document.getElementById("nav-bar").style.fontSize = ".9rem";
        document.getElementById('nav-bar').style.backgroundColor = 'rgb(38, 46, 60)';
        document.getElementById('nav-bar').style.color = 'white';
        document.getElementById('nav-bar').style.padding = '10px';
        document.getElementById('join').classList.remove('btncolor');
        document.getElementById('join').classList.add('btnscroll');
    } else {
        document.getElementById('nav-bar').style.backgroundColor = 'transparent';
        document.getElementById("nav-bar").style.fontSize = "1rem";
        document.getElementById('nav-bar').style.color = 'white';
        document.getElementById('nav-bar').style.padding = '15px';
        document.getElementById('nav-bar').style.paddingRight = '100px';
        document.getElementById('join').classList.remove('btnscroll');
        document.getElementById('join').classList.add('btncolor');
    }
	if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
		mybutton.style.display = "block";
	  } else {
		mybutton.style.display = "none";
	  }
	}
	
	// When the user clicks on the button, scroll to the top of the document
	function topFunction() {
	  document.body.scrollTop = 0; // For Safari
	  document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
	}
	
	
	for (let i = 0; i < buttons.length; i++) {
		buttons[i].addEventListener('click', function() {
			this.classList.toggle("active");
			this.classList.toggle("activeline");
			let answers = this.nextElementSibling;
			if (answers.style.display === "block") {
				answers.style.display = "none";
				answers.classList.toggle("active");
			} else {
				answers.style.display = "block";
				answers.classList.toggle("active");
			}
		});
  }





// cache the navigation links 
var $navigationLinks = document.querySelectorAll('nav > ul > li > a');

// cache (in reversed order) the sections
var $sections = document.getElementsByTagName('section');


// map each section id to their corresponding navigation link
var sectionIdTonavigationLink = {
};
for (var i = $sections.length-1; i >= 0; i--) {
	var id = $sections[i].id;
	sectionIdTonavigationLink[id] = document.querySelectorAll('nav > ul > li > a[href=\\#' + id + ']') || null;
}


// throttle function, enforces a minimum time interval
function throttle(fn, interval) {
	var lastCall, timeoutId;
	return function () {
		var now = new Date().getTime();
		if (lastCall && now < (lastCall + interval) ) {
			// if we are inside the interval we wait
			clearTimeout(timeoutId);
			timeoutId = setTimeout(function () {
				lastCall = now;
				fn.call();
			}, interval - (now - lastCall) );
		} else {
			// otherwise, we directly call the function 
			lastCall = now;
			fn.call();
		}
	};
}

function getOffset( el ) {
	var _x = 0;
	var _y = 0;
	while( el && !isNaN( el.offsetLeft ) && !isNaN( el.offsetTop ) ) {
		_x += el.offsetLeft - el.scrollLeft;
		_y += el.offsetTop - el.scrollTop;
		el = el.offsetParent;
	}
	return { top: _y, left: _x };
}

function highlightNavigation() {
	// get the current vertical position of the scroll bar
	var scrollPosition = window.pageYOffset || document.documentElement.scrollTop;

	// iterate the sections
	for (var i = $sections.length-1; i >= 0; i--) {
		var currentSection = $sections[i];
		// get the position of the section
		var sectionTop = getOffset(currentSection).top;

	   // if the user has scrolled over the top of the section  
		if (scrollPosition >= sectionTop - 250) {
			// get the section id
			var id = currentSection.id;
			// get the corresponding navigation link
			var $navigationLink = sectionIdTonavigationLink[id];
			// if the link is not active
			if (typeof $navigationLink[0] !== 'undefined') {
				if (!$navigationLink[0].classList.contains('active')) {
					// remove .active class from all the links
					for (i = 0; i < $navigationLinks.length; i++) {
						$navigationLinks[i].className = $navigationLinks[i].className.replace(/ active/, '');
					}
					// add .active class to the current link
					$navigationLink[0].className += (' active');
				}
			} else {
					// remove .active class from all the links
					for (i = 0; i < $navigationLinks.length; i++) {
						$navigationLinks[i].className = $navigationLinks[i].className.replace(/ active/, '');
					}
			}	
			// we have found our section, so we return false to exit the each loop
			return false;
		}
	}
}

window.addEventListener('scroll',throttle(highlightNavigation,150));