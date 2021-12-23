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
	navbarMenu.classList.remove("open")
	scrollIntoView(link);
	selectNavItem(target)
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


// Navbar toggle
// const navbarMenu = document.querySelector(".navbar__menu");
const navbarToggleBtn = document.querySelector(".navbar__toggle-btn");
navbarToggleBtn.addEventListener("click", () => {
	navbarMenu.classList.toggle("open");
	// if (navbarMenu.style.display === "none") {
	// 	navbarMenu.style.display = "block";
	// 	navbarMenu.style.backgroundColor = "black";
	// } else {
	// 	navbarMenu.style.display = "none"
	// }
	
})


// 1. 모든 섹션 요소들을 가져온다
// 2. IntersectionObserver를 이용하여 모든 섹션들을 관찰한다
// 3. 보여지는 섹션에 해당하는 메뉴 아이템을 활성화시킨다

const sectionsId = [
	'#home',
	'#about',
	'#skills',
	'#work',
	'#testimonials',
	'#contact'
];
const sections = sectionsId.map(id => document.querySelector(id))
const navItems = sectionsId.map(id => 
	document.querySelector(`[data-link='${id}']`)
);

const observerOptions = {
	root: null,
	rootMargin: '0px',
	threshold: 0.3
};

let selectedNavIndex = 0;
let selectedNavItem = navItems[0]
function selectNavItem(selected) {
	selectedNavItem.classList.remove("active")
	selectedNavItem = selected;
	selectedNavItem.classList.add("active")
}

function scrollIntoView(selector) {
	const scrollTo = document.querySelector(selector);
	scrollTo.scrollIntoView({behavior: "smooth"});
	selectNavItem(navItems[sectionsId.indexOf(selector)])
}

const observerCallback = (entries, observer) => {
	entries.forEach(entry => {
		if (!entry.isIntersecting && entry.intersectionRatio > 0) {
			const index = sectionsId.indexOf(`#${entry.target.id}`);
			// 스크롤을 아래로 내려가서, 화면이 올라갈 때
			if (entry.boundingClientRect.y < 0) {
				selectedNavIndex = index + 1;
			} else {
				selectedNavIndex = index - 1;
			}
		}
	})
}

const observer = new IntersectionObserver(observerCallback, observerOptions)
sections.forEach(section => observer.observe(section))

window.addEventListener("wheel", () => {	
	if (window.scrollY === 0) {
		selectedNavIndex = 0;
	} else if (Math.round(window.scrollY + window.innerHeight) >= document.body.clientHeight) {
		selectedNavIndex = navItems.length - 1
	}
	selectNavItem(navItems[selectedNavIndex])
})