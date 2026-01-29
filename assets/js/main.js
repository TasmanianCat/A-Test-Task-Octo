import { Carousel } from './carousel.js';

document.addEventListener('DOMContentLoaded', () => {
  const carouselEl = document.querySelector('.section__carousel');
  if (carouselEl) new Carousel(carouselEl);
});
