// main.js
import { Carousel } from './carousel.js';

document.addEventListener('DOMContentLoaded', () => {
  const carousels = document.querySelectorAll('.section__carousel');

  carousels.forEach((carousel) => {
    new Carousel(carousel);
  });
});
