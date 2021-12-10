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

function scrollIntoView(selector) {
	const scrollTo = document.querySelector(selector);
	scrollTo.scrollIntoView({behavior: "smooth"});
}