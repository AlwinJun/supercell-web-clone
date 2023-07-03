// console.log('test');

// DOM Elements
const navBtn = document.querySelector('.nav-toggle');
const navContent = document.querySelector('.nav-expand');
const navItems = document.querySelectorAll('.nav-item');
const dropdownGrid = document.querySelector('.dropdownGrid');
const searchIcon = document.querySelector('.search');
const carouselContainer = document.querySelector('.carousel-container');
const card = carouselContainer.querySelectorAll('.card');
const prevBtn = document.querySelector('.carousel-prev');
const nextBtn = document.querySelector('.carousel-next');

//Get  styles property
// :root
const rootStyles = getComputedStyle(document.documentElement);
const inactiveColor = rootStyles.getPropertyValue('--clr-inactive');
const activeInactiveColor = rootStyles.getPropertyValue(
  '--clr-active-inactive'
);
// Card
const style = window.getComputedStyle(card[0]);
const marginRight = style.getPropertyValue('margin-right');

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

// Carousel
const cardCount = card.length;

let addCardMargin = parseInt(marginRight);
let currentCardIndex = 0;

const updateCarousel = () => {
  const cardWidth = carouselContainer.children[0].offsetWidth;
  const translateX = currentCardIndex * (cardWidth + addCardMargin);
  carouselContainer.style.transform = `translateX(-${translateX}px)`;

  console.log(translateX);
};

const previousButton = () => {
  if (window.innerWidth > 790) {
    // 2 card content
    if (currentCardIndex > 1) {
      currentCardIndex -= 2;
      updateCarousel();
    }
  } else {
    // 1 card/Mobile View
    if (currentCardIndex > 0) {
      currentCardIndex -= 1;
      updateCarousel();
    }
  }
};

const nextButton = () => {
  if (window.innerWidth > 790) {
    // 2 card content
    if (currentCardIndex < cardCount - 2) {
      currentCardIndex += 2;
      updateCarousel();
    }
  } else {
    // 1 card/Mobile View
    if (currentCardIndex < cardCount - 1) {
      currentCardIndex += 1;
      updateCarousel();
    }
  }
};

const intialCarouselStyle = () => {
  // button prev display none
  //Add carousel dot button
};

//Event Listeners
document.addEventListener('DOMContentLoaded', intialCarouselStyle);
navBtn.addEventListener('click', navBarExpand);
navItems.forEach((item) => item.addEventListener('click', showSubItems));
searchIcon.addEventListener('click', showSearchBar);
prevBtn.addEventListener('click', previousButton);
nextBtn.addEventListener('click', nextButton);
