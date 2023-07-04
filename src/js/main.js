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
};

const previousButton = () => {
  nextBtn.style.visibility = 'visible';

  if (window.innerWidth > 790) {
    // 2 card content / Viewport medium-up
    if (currentCardIndex >= 2) {
      currentCardIndex -= 2;
    }
  } else {
    // 1 card / Viewport mobile
    if (currentCardIndex >= 1) {
      currentCardIndex -= 1;
    }
  }

  // Hide previous button on first slide
  if (currentCardIndex === 0) {
    prevBtn.style.visibility = 'hidden';
  }

  updateCarousel();
};

const nextButton = () => {
  prevBtn.style.visibility = 'visible';

  if (window.innerWidth > 790) {
    // 2 card content / Viewport medium-up
    if (currentCardIndex < cardCount - 2) {
      currentCardIndex += 2;
    }
  } else {
    // 1 card / Viewport mobile
    if (currentCardIndex < cardCount - 1) {
      currentCardIndex += 1;
    }
  }

  // Hide next button on last slide
  if (currentCardIndex >= cardCount - 1) {
    nextBtn.style.visibility = 'hidden';
  }

  updateCarousel();
};

const intialCarouselStyle = () => {
  // Prev btn initial state hidden
  prevBtn.style.visibility = 'hidden';

  if (window.innerWidth > 790) {
    // Viewport medium-up
    if (card.length === 2) {
      nextBtn.style.visibility = 'hidden';
    }
  } else {
    // Viewport mobile
    if (card.length === 1) {
      nextBtn.style.visibility = 'hidden';
    }
  }

  //Add carousel dot button
};

//Event Listeners
document.addEventListener('DOMContentLoaded', intialCarouselStyle);
navBtn.addEventListener('click', navBarExpand);
navItems.forEach((item) => item.addEventListener('click', showSubItems));
searchIcon.addEventListener('click', showSearchBar);
prevBtn.addEventListener('click', previousButton);
nextBtn.addEventListener('click', nextButton);
