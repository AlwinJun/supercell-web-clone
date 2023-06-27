// console.log('test');

// DOM Elements
const navBtn = document.querySelector('.nav-toggle');
const navContent = document.querySelector('.nav-expand');
const navItems = document.querySelectorAll('.nav-item');
const dropdownGrid = document.querySelector('.dropdownGrid');
const searchIcon = document.querySelector('.search');
const searchBar = document.querySelector('.search-bar');

//Get :root styles
const rootStyles = getComputedStyle(document.documentElement);
var inactiveColor = rootStyles.getPropertyValue('--clr-inactive');
var activeInactiveColor = rootStyles.getPropertyValue('--clr-active-inactive');

// Event HAndlers
const resetNavContent = () => {
  navItems.forEach((item) => {
    item.classList.remove('click');
    item.querySelector('h3').style.color = activeInactiveColor;
    item.querySelector('span').classList.remove('rotate');
  });
};

const navBarExpand = () => {
  navBtn.classList.toggle('toggled');
  navContent.classList.toggle('expand');

  resetNavContent();

  navItems.forEach((item) => {
    item.querySelector('h3').style.color = inactiveColor;
  });
};

const showSubItems = (e) => {
  const navItem = e.currentTarget;
  const navItemText = navItem.querySelector('h3');
  const navItemArrowBtn = navItem.querySelector('span');
  const isClicked = navItem.classList.contains('click');

  resetNavContent();

  if (!isClicked) {
    // Toggle 'click' class on the clicked nav item
    navItem.classList.toggle('click');
    navItemText.style.color = 'white';
    navItemArrowBtn.classList.add('rotate');
  }
};

const showSearchBar = () => {
  searchBar.classList.toggle('search');
};

//Event Listeners
navBtn.addEventListener('click', navBarExpand);
navItems.forEach((item) => item.addEventListener('click', showSubItems));
searchIcon.addEventListener('click', showSearchBar);
