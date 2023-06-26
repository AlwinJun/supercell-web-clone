// console.log('test');

const navBtn = document.querySelector('.nav-toggle');
const navContent = document.querySelector('.nav-expand');
const navItems = document.querySelectorAll('.nav-items li');
const navItemsArrow = document.querySelectorAll('.nav-items span');
const dropdownGrid = document.querySelector('.dropdownGrid');

//Event Listeners
navBtn.addEventListener('click', navButtonToggle);

// Event HAndlers
function navButtonToggle() {
  navBtn.classList.toggle('toggled');
  navContent.classList.toggle('expand');
}
