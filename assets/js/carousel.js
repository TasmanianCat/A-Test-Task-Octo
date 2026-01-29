// carousel.js
export class Carousel {
  constructor(root) {
    this.root = root;
    this.track = root.querySelector('.section__carousel-track');
    this.items = Array.from(root.querySelectorAll('.section__carousel-item'));
    this.viewport = root.querySelector('.section__carousel-viewport');
    this.prevBtn = root.querySelector('.section__carousel-btn--prev');
    this.nextBtn = root.querySelector('.section__carousel-btn--next');

    // state
    this.currentIndex = 0;

    // touch state
    this.isDragging = false;
    this.startX = 0;
    this.prevTranslate = 0;
    this.currentTranslate = 0;

    this.attachEvents();
    this.update();
  }

  /* -------------------- EVENTS -------------------- */

  attachEvents() {
    this.prevBtn?.addEventListener('click', () => {
      this.currentIndex--;
      this.update();
    });

    this.nextBtn?.addEventListener('click', () => {
      this.currentIndex++;
      this.update();
    });

    window.addEventListener('resize', () => this.update());

    // touch events
    this.viewport.addEventListener('touchstart', this.onTouchStart, {
      passive: true,
    });
    this.viewport.addEventListener('touchmove', this.onTouchMove, {
      passive: false,
    });
    this.viewport.addEventListener('touchend', this.onTouchEnd);
  }

  /* -------------------- CORE LOGIC -------------------- */

  update() {
    if (!this.items.length) return;

    const { step, maxOffset } = this.getMetrics();

    // clamp index
    this.currentIndex = Math.max(0, this.currentIndex);

    let offset = this.currentIndex * step;

    // prevent empty space
    if (offset > maxOffset) {
      offset = maxOffset;
      this.currentIndex = Math.floor(maxOffset / step);
    }

    this.track.style.transition = 'transform 0.3s ease';
    this.track.style.transform = `translateX(-${offset}px)`;

    // buttons state
    if (this.prevBtn) this.prevBtn.disabled = offset === 0;
    if (this.nextBtn) this.nextBtn.disabled = offset >= maxOffset;
  }

  /* -------------------- TOUCH -------------------- */

  onTouchStart = (e) => {
    this.isDragging = true;
    this.startX = e.touches[0].clientX;
    this.prevTranslate = this.getCurrentTranslate();
    this.track.style.transition = 'none';
  };

  onTouchMove = (e) => {
    if (!this.isDragging) return;

    const currentX = e.touches[0].clientX;
    const delta = currentX - this.startX;

    const { maxOffset } = this.getMetrics();

    let nextTranslate = this.prevTranslate - delta;
    nextTranslate = Math.max(0, Math.min(nextTranslate, maxOffset));

    this.currentTranslate = nextTranslate;
    this.track.style.transform = `translateX(-${nextTranslate}px)`;

    e.preventDefault();
  };

  onTouchEnd = () => {
    if (!this.isDragging) return;
    this.isDragging = false;

    const { step } = this.getMetrics();

    // snap to nearest item
    this.currentIndex = Math.round(this.currentTranslate / step);

    this.update();
  };

  /* -------------------- HELPERS -------------------- */

  getMetrics() {
    const styles = getComputedStyle(this.track);
    const gap = parseInt(styles.gap, 10) || 0;
    const itemWidth = this.items[0].offsetWidth;
    const step = itemWidth + gap;

    const viewportWidth = this.viewport.offsetWidth;
    const trackWidth =
      this.items.length * itemWidth + (this.items.length - 1) * gap;

    const maxOffset = Math.max(0, trackWidth - viewportWidth);

    return { step, maxOffset };
  }

  getCurrentTranslate() {
    const transform = getComputedStyle(this.track).transform;
    if (transform === 'none') return 0;
    const matrix = new DOMMatrixReadOnly(transform);
    return Math.abs(matrix.m41);
  }
}
