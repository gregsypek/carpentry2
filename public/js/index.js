/*eslint-disable*/
import '@babel/polyfill';
import { login } from './login';
// import { smoothScrolling } from './smoothScrolling';
import { checkFlexGap } from './flexGap';
import obs from './stickyNav';

//DOM ELEMENTS
const loginForm = document.querySelector('.form');

const btnNav = document.querySelector('.btn--mobile-nav');
const header = document.querySelector('.header');

const year = document.querySelector('.year');
const currentYear = new Date().getFullYear();

const allLinks = document.querySelectorAll('a:link');

const sectionHeroEl = document.querySelector('.section-hero');
const sectionStairs = document.querySelector('.stairs__top');

// FUNCTIONS
if (loginForm)
  loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    login(email, password);
  });

//Make mobile navigation works
if (btnNav)
  btnNav.addEventListener('click', function () {
    header.classList.toggle('nav-open');
  });

//Update year in footer
if (year) year.textContent = currentYear;

//Smooth scrolling animation
if (allLinks)
  allLinks.forEach((link) => {
    link.addEventListener('click', (e) => {
      const href = link.getAttribute('href');
      // Scroll back to top
      if (href === '#') {
        e.preventDefault();
        window.scrollTo({
          top: 0,
          behavior: 'smooth',
        });
      }

      // Scroll to other links
      if (href.startsWith('#') && href.length > 1) {
        // e.preventDefault();
        const sectionEl = document.querySelector(href);
        sectionEl.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });

// Sticky navigation
if (sectionHeroEl) obs.observe(sectionHeroEl);
if (sectionStairs) obs.observe(sectionStairs);

//helper
checkFlexGap();
