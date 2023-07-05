// DOM Elements
const navBtn = document.querySelector('.nav-toggle');
const navContent = document.querySelector('.nav-expand');
const navItems = document.querySelectorAll('.nav-item');
const dropdownGrid = document.querySelector('.dropdownGrid');
const searchIcon = document.querySelector('.search');
const searchBar = document.querySelector('.search-bar');
const carouselContainer = document.querySelector('.carousel-container');
const cards = carouselContainer.querySelectorAll('.card');
const prevBtn = document.querySelector('.carousel-prev');
const nextBtn = document.querySelector('.carousel-next');
const dotContainer = document.querySelector('.dot-container');

//Get  styles property
const rootStyles = getComputedStyle(document.documentElement);
const inactiveColor = rootStyles.getPropertyValue('--clr-inactive');
const activeInactiveColor = rootStyles.getPropertyValue(
  '--clr-active-inactive'
);

// Carousel Variables
const cardCount = cards.length;
const style = window.getComputedStyle(cards[0]);
const marginRight = parseInt(style.getPropertyValue('margin-right'));
let currentCardIndex = 0;
let currentDotIndex = 0;
let dotButtons;

// Helper Functions
const resetNavContent = () => {
  navItems.forEach((item) => {
    item.classList.remove('click');
    item.querySelector('h3').style.color = activeInactiveColor;
    item.querySelector('span').classList.remove('rotate');
  });
};

const toggleNavContent = (navItem) => {
  navItem.classList.toggle('click');
  const navItemText = navItem.querySelector('h3');
  const navItemArrowBtn = navItem.querySelector('span');
  const isClicked = navItem.classList.contains('click');

  // Add 'rotate' and 'white' if isClicked is truthy
  navItemText.style.color = isClicked ? 'white' : inactiveColor;
  navItemArrowBtn.classList.add('rotate', isClicked);
};

const updateCarousel = () => {
  const cardWidth = carouselContainer.children[0].offsetWidth; //Get first card witdh
  const translateX = currentCardIndex * (cardWidth + marginRight);
  carouselContainer.style.transform = `translateX(-${translateX}px)`;
};

const updateActiveDotButton = (currentDotIndex) => {
  dotButtons.forEach((btn, index) => {
    btn.classList.toggle('active', index === currentDotIndex);
  });
};

// Event Handlers
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
  resetNavContent();
  toggleNavContent(navItem);
};

const showSearchBar = () => {
  searchBar.classList.toggle('search');
};

const dotButtonsSlider = () => {
  dotButtons.forEach((button, index, arr) => {
    button.addEventListener('click', () => {
      // Calculate the currentCardIndex based on the dot button index and the number of cards to display
      // 2 cards for viewport medium-up and 1 card for mobile view
      currentCardIndex = index * (window.innerWidth > 790 ? 2 : 1);

      //Hide next/prev button when first or last button has been click
      nextBtn.style.visibility =
        index === arr.length - 1 ? 'hidden' : 'visible';
      prevBtn.style.visibility = index > 0 ? 'visible' : 'hidden';

      currentDotIndex = index;
      updateActiveDotButton(currentDotIndex);
      updateCarousel();
    });
  });
};

const displayDotButtons = () => {
  const buttons = Array.from(cards).map((_, index) => {
    const button = document.createElement('button');
    if (index === 0) {
      button.classList.add('active');
    }

    return button;
  });

  if (window.innerWidth > 790) {
    // For viewport medium-up get the half of the cards length and round it up
    // Viewport meduim-up have 2 cards per screen.If the carousel has 9 card content it will  have a 5 slide
    const buttonHalfLength = Math.ceil(cards.length / 2);
    const desktopDotButton = buttons.slice(0, buttonHalfLength);
    dotContainer.append(...desktopDotButton);
  } else {
    dotContainer.append(...buttons);
  }

  dotButtons = dotContainer.querySelectorAll('button');
};

const previousButton = () => {
  nextBtn.style.visibility = 'visible';

  if (window.innerWidth > 790) {
    if (currentCardIndex >= 2) {
      currentCardIndex -= 2;
    }
  } else {
    if (currentCardIndex >= 1) {
      currentCardIndex -= 1;
    }
  }

  // Hide button previous on first slide
  prevBtn.style.visibility = currentCardIndex === 0 ? 'hidden' : 'visible';
  currentDotIndex--;
  updateActiveDotButton(currentDotIndex);
  updateCarousel();
};

const nextButton = () => {
  prevBtn.style.visibility = 'visible';

  if (window.innerWidth > 790) {
    if (currentCardIndex < cardCount - 2) {
      currentCardIndex += 2;
    }
  } else {
    if (currentCardIndex < cardCount - 1) {
      currentCardIndex += 1;
    }
  }

  // Hide next button on last slide
  nextBtn.style.visibility =
    currentCardIndex >= cardCount - 1 ? 'hidden' : 'visible';

  currentDotIndex++;
  updateActiveDotButton(currentDotIndex);
  updateCarousel();
};

const intialCarouselStyle = () => {
  // Prev btn initial state hidden
  prevBtn.style.visibility = 'hidden';

  if (window.innerWidth > 790) {
    // Viewport medium-up {
    nextBtn.style.visibility = cards.length <= 2 ? 'hidden' : 'visible';
  } else {
    // Viewport mobile
    nextBtn.style.visibility = cards.length === 1 ? 'hidden' : 'visible';
  }

  displayDotButtons();
  dotButtonsSlider();
};

//Event Listeners
document.addEventListener('DOMContentLoaded', intialCarouselStyle);
navBtn.addEventListener('click', navBarExpand);
navItems.forEach((item) => item.addEventListener('click', showSubItems));
searchIcon.addEventListener('click', showSearchBar);
prevBtn.addEventListener('click', previousButton);
nextBtn.addEventListener('click', nextButton);
