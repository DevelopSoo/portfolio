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
	// // Navbar active
	// const navList = Array.from(navbarMenu.children);
	
	// navList.forEach((li) => {
	// 	li.classList.remove("active")
	// })
	// target.classList.add("active");
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

// loadItems()
const workBtnContainer = document.querySelector(".work__categories");
const projectContainer = document.querySelector(".work__projects")
const projects = document.querySelectorAll(".project");
workBtnContainer.addEventListener("click", (e) => {
	// 숫자 (span) 클릭시 undefined -> 부모의 dataset를 선택할 수 있도록 || 연산자 사용
	const filter = e.target.dataset.filter || e.target.parentNode.dataset.filter;
	if (!filter) {
		return;
	}

	// remove selection 
	const active = document.querySelector(".category__btn.selected");
	console.log(active)
	active.classList.remove("selected");

	const target = e.target.nodeName === "BUTTON" 
		? e.target : e.target.parentNode;
	target.classList.add("selected")
	projectContainer.classList.add("animation-out");
	setTimeout(() => {
		projects.forEach((project) => {
			if (filter === "*" || filter === project.dataset.type) {
				project.classList.remove("invisible");
			} else {
				project.classList.add("invisible");
			}
		})

		projectContainer.classList.remove("animation-out");
	}, 300)
})


function scrollIntoView(selector) {
	const scrollTo = document.querySelector(selector);
	scrollTo.scrollIntoView({behavior: "smooth"});
}
