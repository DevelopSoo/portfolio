'use strict'

// Navbar
const navbar = document.querySelector("#navbar");
const navbarHeight = navbar.getBoundingClientRect().height;
document.addEventListener("scroll", () => {
	if (window.scrollY > navbarHeight) {
		navbar.classList.add("navbar--dark");
	} else {
		navbar.classList.remove("navbar--dark");
	}
})

// Handle scrolling
const navbarMenu = document.querySelector(".navbar__menu");
navbarMenu.addEventListener("click", (e) => {
	const target = e.target;
	const link = target.dataset.link;
	if (!link) {
		return;
	}
	scrollIntoView(link);
})

// Handle Scrolling to Contact me
const contactBtn = document.querySelector(".home__contact");
contactBtn.addEventListener("click", () => {
	scrollIntoView("#contact")
})


// home fade in when scrolling
const home = document.querySelector(".home__container");
const homeHeight = home.getBoundingClientRect().height;
document.addEventListener("scroll", () => {
	home.style.opacity = 1 - window.scrollY / homeHeight
})

// scroll To the Top
const arrowUp = document.querySelector(".arrow-up");
document.addEventListener("scroll", () => {
	if (window.scrollY > homeHeight / 2) {
		// arrowUp.style.display = "block";
		arrowUp.classList.add("visible");
	} else {
		// arrowUp.style.display = "none";
		arrowUp.classList.remove("visible");
	}
})

arrowUp.addEventListener("click", () => {
	// window.scrollTo({top: 0, left: 0, behavior: "smooth"});
	scrollIntoView("#home")
})


function scrollIntoView(selector) {
	const scrollTo = document.querySelector(selector);
	scrollTo.scrollIntoView({behavior: "smooth"});
}
