//Make mobile navigation works

const btnNav = document.querySelector(".btn--mobile-nav");
const header = document.querySelector(".header");

btnNav.addEventListener("click", function () {
	header.classList.toggle("nav-open");
});

//Update yeerain footer
const year = document.querySelector(".year");
const currentYear = new Date().getFullYear();
year.textContent = currentYear;

//Smooth scrolling animation

const allLinks = document.querySelectorAll("a:link");

allLinks.forEach(function (link) {
	link.addEventListener("click", function (e) {
		const href = link.getAttribute("href");

		// Scroll back to top
		if (href === "#") {
			e.preventDefault();

			window.scrollTo({
				top: 0,
				behavior: "smooth",
			});
		}

		// Scroll to other links
		if (href.startsWith("#")) {
			e.preventDefault();

			const sectionEl = document.querySelector(href);
			sectionEl.scrollIntoView({ behavior: "smooth" });
		}
	});
});
