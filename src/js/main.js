// console.log('test');

// DOM Elements
const navBtn = document.querySelector('.nav-toggle');
const navContent = document.querySelector('.nav-expand');
const navItems = document.querySelectorAll('.nav-item');
const dropdownGrid = document.querySelector('.dropdownGrid');
const searchIcon = document.querySelector('.search');
const carouselContainer = document.querySelector('.carousel-container');
const cards = carouselContainer.querySelectorAll('.card');
const prevBtn = document.querySelector('.carousel-prev');
const nextBtn = document.querySelector('.carousel-next');

//Get  styles property
// :root
const rootStyles = getComputedStyle(document.documentElement);
const inactiveColor = rootStyles.getPropertyValue('--clr-inactive');
const activeInactiveColor = rootStyles.getPropertyValue(
  '--clr-active-inactive'
);
// Cards
const style = window.getComputedStyle(cards[0]);
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
const cardCount = cards.length;
let addCardMargin = parseInt(marginRight);
let currentCardIndex = 0;
let dotButtons;
let currentDotIndex = 0;
const dotContainer = document.querySelector('.dot-container');

const intialCarouselStyle = () => {
  // Prev btn initial state hidden
  prevBtn.style.visibility = 'hidden';

  if (window.innerWidth > 790) {
    // Viewport medium-up
    if (cards.length === 2) {
      nextBtn.style.visibility = 'hidden';
    }
  } else {
    // Viewport mobile
    if (cards.length === 1) {
      nextBtn.style.visibility = 'hidden';
    }
  }

  displayDotButtons()
    .then(dotButtonsSlider)
    .catch((error) => console.log(error));
};

function dotButtonsSlider() {
  // Add event listeners to dot buttons
  dotButtons.forEach((button, index) => {
    button.addEventListener('click', () => {
      currentCardIndex = index * (window.innerWidth > 790 ? 2 : 1);
      currentDotIndex = index;
      if (window.innerWidth > 790 ? 2 : 1)
        updateActiveDotButton(currentDotIndex);
      updateCarousel();
    });
  });
}

function displayDotButtons() {
  return new Promise((resolve, reject) => {
    const buttons = Array.from(cards).map((_, index) => {
      const button = document.createElement('button');
      if (index === 0) {
        button.classList.add('active');
      }

      return button;
    });

    if (window.innerWidth > 790) {
      const buttonHalfLength = Math.ceil(cards.length / 2);
      const desktopDotButton = buttons.slice(0, buttonHalfLength);
      dotContainer.append(...desktopDotButton);
    } else {
      dotContainer.append(...buttons);
    }

    dotButtons = dotContainer.querySelectorAll('button');

    if (dotButtons.length > 0) {
      resolve();
    } else {
      reject('No buttons found');
    }
  });
}

function updateActiveDotButton(currentDotIndex) {
  dotButtons.forEach((btn, index) => {
    if (index === currentDotIndex) {
      btn.classList.add('active');
    } else {
      btn.classList.remove('active');
    }
  });
}

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

  currentDotIndex--;
  updateActiveDotButton(currentDotIndex);
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

  currentDotIndex++;
  updateActiveDotButton(currentDotIndex);

  updateCarousel();
};

//Event Listeners
document.addEventListener('DOMContentLoaded', intialCarouselStyle);
navBtn.addEventListener('click', navBarExpand);
navItems.forEach((item) => item.addEventListener('click', showSubItems));
searchIcon.addEventListener('click', showSearchBar);
prevBtn.addEventListener('click', previousButton);
nextBtn.addEventListener('click', nextButton);
