import './styles/style.css';

import { displayElements } from './data.ts';

// DOM Elements
const navBtn = document.querySelector('.nav-toggle') as HTMLDivElement;
const navContent = document.querySelector('.nav-expand') as HTMLDivElement;
const navItems = document.querySelectorAll('.nav-item') as NodeListOf<HTMLUListElement>;
// const dropdownGrid = document.querySelector('.dropdownGrid');
const searchIcon = document.querySelector('.search') as HTMLDivElement;
const searchBar = document.querySelector('.search-bar') as HTMLDivElement;
const carouselContainer = document.querySelector('.carousel-container') as HTMLDivElement;
const prevBtn = document.querySelector('.carousel-prev') as HTMLDivElement;
const nextBtn = document.querySelector('.carousel-next') as HTMLDivElement;
const dotContainer = document.querySelector('.dot-container') as HTMLDivElement;

// Get styles property
const rootStyles = getComputedStyle(document.documentElement);
const inactiveColor: string = rootStyles.getPropertyValue('--clr-inactive');
const activeInactiveColor: string = rootStyles.getPropertyValue('--clr-active-inactive');

// Carousel Variables
let cards: NodeListOf<HTMLDivElement>;
let cardCount: number;
let marginRight: number;
let currentCardIndex: number = 0;
let currentDotIndex: number = 0;
let dotButtons: NodeListOf<HTMLButtonElement>;

// Helper Functions
const resetNavContent = (): void => {
  navItems.forEach((item: HTMLUListElement): void => {
    item.classList.remove('click');
    item.querySelector('h3')!.style.color = activeInactiveColor;
    item.querySelector('span')!.classList.remove('rotate');
  });
};

const toggleNavContent = (navItem: HTMLUListElement): void => {
  navItem.classList.toggle('click');
  const navItemText = navItem.querySelector('h3') as HTMLHeadingElement;
  const navItemArrowBtn = navItem.querySelector('span') as HTMLSpanElement;
  const isClicked: boolean = navItem.classList.contains('click');

  // Add 'rotate' and 'white' if isClicked is truthy
  navItemText.style.color = isClicked ? 'white' : inactiveColor;
  navItemArrowBtn.classList.toggle('rotate', isClicked);
};

const handleViewportResize = (): void => {
  if (window.innerWidth > 790) {
    nextBtn.style.visibility = cardCount <= 2 ? 'hidden' : 'visible';
  } else {
    nextBtn.style.visibility = cardCount <= 1 ? 'hidden' : 'visible';
  }

  // Update dot buttons and carousel based on viewport width
  dotContainer.innerHTML = ''; // Clear existing dot buttons to avoid dot concatonation
  displayDotButtons();
  dotButtonsSlider();
  updateCarousel();
};

const updateCarousel = (): void => {
  const cardWidth: number = (carouselContainer.children[0] as HTMLDivElement).offsetWidth; //Get first card witdh
  const translateX: number = currentCardIndex * (cardWidth + marginRight);
  carouselContainer.style.transform = `translateX(-${translateX}px)`;
  updateActiveDotButton(currentDotIndex); //Retain the active class of button on when the resize happens
};

const updateActiveDotButton = (currentDotIndex: number): void => {
  dotButtons.forEach((btn, index) => {
    btn.classList.toggle('active', index === currentDotIndex);
  });
};

// Event Handlers
const navBarExpand = (): void => {
  navBtn.classList.toggle('toggled');
  navContent.classList.toggle('expand');
  resetNavContent();

  navItems.forEach((item) => {
    item.querySelector('h3')!.style.color = inactiveColor;
  });
};

const showSubItems = (e: Event): void => {
  const navItem = e.currentTarget as HTMLUListElement;
  resetNavContent();
  toggleNavContent(navItem);
};

const showSearchBar = (): void => {
  searchBar.classList.toggle('search');
};

const dotButtonsSlider = (): void => {
  dotButtons.forEach((button, index, arr) => {
    button.addEventListener('click', () => {
      // Calculate the currentCardIndex based on the dot button index and the number of cards to display
      // 2 cards for viewport medium-up and 1 card for mobile view
      currentCardIndex = index * (window.innerWidth > 790 ? 2 : 1);

      //Hide next/prev button when first or last button has been click
      nextBtn.style.visibility = index === arr.length - 1 ? 'hidden' : 'visible';
      prevBtn.style.visibility = index > 0 ? 'visible' : 'hidden';
      currentDotIndex = index;
      updateActiveDotButton(currentDotIndex);
      updateCarousel();
    });
  });
};

const displayDotButtons = (): void => {
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
    const buttonHalfLength: number = Math.ceil(cards.length / 2);
    const desktopDotButton: HTMLButtonElement[] = buttons.slice(0, buttonHalfLength);
    dotContainer.append(...desktopDotButton);
  } else {
    dotContainer.append(...buttons);
  }

  dotButtons = dotContainer.querySelectorAll('button') as NodeListOf<HTMLButtonElement>;
};

const previousButton = (): void => {
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

const nextButton = (): void => {
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
  nextBtn.style.visibility = currentCardIndex >= cardCount - 1 ? 'hidden' : 'visible';
  currentDotIndex++;
  updateActiveDotButton(currentDotIndex);
  updateCarousel();
};

const initialCarouselStyle = (): void => {
  prevBtn.style.visibility = 'hidden';

  if (window.innerWidth > 790) {
    nextBtn.style.visibility = cardCount <= 2 ? 'hidden' : 'visible';
  } else {
    nextBtn.style.visibility = cardCount === 1 ? 'hidden' : 'visible';
  }

  displayDotButtons();
  dotButtonsSlider();

  handleViewportResize();
};

// Wait for the news and carouselContent to be fetched and rendered before referencing the '.card' class and getting the styles
const displayComponentsData = async () => {
  await displayElements; // Wait for the data to be  rendered

  // Get the '.card' elements and their count
  cards = document.querySelectorAll('.card') as NodeListOf<HTMLDivElement>;
  cardCount = cards.length;

  // Get the style of the first card and extract the right margin value
  const style = window.getComputedStyle(cards[0]);
  marginRight = parseInt(style.getPropertyValue('margin-right'));

  initialCarouselStyle();
};

// Event Listeners
document.addEventListener('DOMContentLoaded', displayComponentsData);
window.addEventListener('resize', handleViewportResize);
navBtn.addEventListener('click', navBarExpand);
navItems.forEach((item) => item.addEventListener('click', showSubItems));
searchIcon.addEventListener('click', showSearchBar);
prevBtn.addEventListener('click', previousButton);
nextBtn.addEventListener('click', nextButton);

