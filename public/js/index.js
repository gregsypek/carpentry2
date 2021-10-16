/*eslint-disable*/
import '@babel/polyfill';
import { login, logout } from './login';
import { updateSettings } from './updateSettings';
import { createPrice } from './createPrice';
import { checkFlexGap } from './flexGap';
import obs from './stickyNav';

//DOM ELEMENTS
const loginForm = document.querySelector('.form');
const logOutBtn = document.querySelector('.btn--admin-logout');
const userDataForm = document.querySelector('.form-user-data');
const userPasswordForm = document.querySelector('.form__password ');
const userPriceForm = document.querySelector('.form__price');

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

if (logOutBtn) logOutBtn.addEventListener('click', logout);

if (userDataForm)
  userDataForm.addEventListener('submit', (e) => {
    //  e.preventDefault();
    //  const email = document.getElementById('userEmail').value;
    //  const name = document.getElementById('userName').value;
    //  updateSettings({ name, email }, 'data');
    e.preventDefault();
    const form = new FormData();
    form.append('name', document.getElementById('userName').value);
    form.append('email', document.getElementById('userEmail').value);
    // form.append('photo', document.getElementById('photo').files[0]);
    console.log(form);
    updateSettings(form, 'data');
  });

if (userPasswordForm)
  userPasswordForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    document.querySelector('.btn--save-password').textContent =
      'Aktualizuje...';
    const passwordCurrent = document.getElementById('password-current').value;
    const password = document.getElementById('password').value;
    const passwordConfirm = document.getElementById('password-confirm').value;
    await updateSettings(
      { passwordCurrent, password, passwordConfirm },
      'password'
    );
    document.querySelector('.btn--save-password').textContent = 'Zapisz hasło';
    document.getElementById('password-current').value = '';
    document.getElementById('password').value = '';
    document.getElementById('password-confirm').value = '';
  });

if (userPriceForm)
  userPriceForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const form = new FormData();
    // const priceNumber = parseInt(document.getElementById('price').value);

    form.append('title', document.getElementById('title').value);
    // form.append('price', document.getElementById('price').value);
    form.append('price', parseInt(document.getElementById('price').value));
    form.append(
      'priceIncluded',
      document.getElementById('priceIncluded').value
    );
    form.append('additionals', document.getElementById('additionals').value);
    form.append('imageCover', document.getElementById('imageCover').files[0]);
    // form.append('photo', document.getElementById('photo').files[0]);
    console.log(document.getElementById('imageCover').files);
    console.log(document.getElementById('imageCover').files[0].name);

    console.log(form);
    await createPrice(form);
  });
