export class Carousel {
  constructor(root) {
    this.root = root;
    this.track = root.querySelector('.section__carousel-track');
    this.items = Array.from(root.querySelectorAll('.section__carousel-item'));
    this.prevBtn = root.querySelector('.section__carousel-btn--prev');
    this.nextBtn = root.querySelector('.section__carousel-btn--next');
    this.viewport = root.querySelector('.section__carousel-viewport');

    this.currentIndex = 0;
    this.cardsPerView = 1;

    this.update(); // initial setup
    this.attachEvents();
  }

  attachEvents() {
    this.prevBtn.addEventListener('click', () => {
      this.currentIndex--;
      this.update();
    });

    this.nextBtn.addEventListener('click', () => {
      this.currentIndex++;
      this.update();
    });

    window.addEventListener('resize', () => {
      this.update();
    });
  }

  update() {
    if (!this.items.length) return;

    const styles = getComputedStyle(this.track);
    const gap = parseInt(styles.gap) || 0;

    const viewportWidth = this.viewport.offsetWidth;
    const itemWidth = this.items[0].offsetWidth;

    const step = itemWidth + gap;

    // total width of all items INCLUDING gaps
    const trackWidth =
      this.items.length * itemWidth + (this.items.length - 1) * gap;

    // max allowed translateX (prevents empty space)
    const maxOffset = Math.max(0, trackWidth - viewportWidth);

    // clamp index by pixel math
    this.currentIndex = Math.max(0, this.currentIndex);

    let offset = this.currentIndex * step;

    // prevent overscrolling
    if (offset > maxOffset) {
      offset = maxOffset;
      this.currentIndex = Math.floor(maxOffset / step);
    }

    this.track.style.transform = `translateX(-${offset}px)`;

    // buttons
    this.prevBtn.disabled = offset === 0;
    this.nextBtn.disabled = offset >= maxOffset;
  }
}
