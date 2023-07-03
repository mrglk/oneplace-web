const advantagesSlider = document.querySelector('.js-advantages-slider');

export function initAdvantagesSlider() {
  if (!advantagesSlider) {
    return;
  }

  new EasySlider(advantagesSlider)
}

class EasySlider {
  currentSlide = 0;

  constructor(element) {
    this.prevButton = element.querySelector('.js-advantages-slider-prev');
    this.nextButton = element.querySelector('.js-advantages-slider-next');

    this.currentElement = element.querySelector('.js-advantages-slider-current');
    this.totalElement = element.querySelector('.js-advantages-slider-total');

    this.progressElement = element.querySelector('.js-advantages-progress');

    this.imagesWrapper = element.querySelector('.js-advantages-slider-images');
    this.slides = this.imagesWrapper.querySelectorAll('img');
    this.totalCount = this.slides.length;

    this.nextButton.addEventListener('click', () => this.changeSlide(1));
    this.prevButton.addEventListener('click', () => this.changeSlide(-1));

    this.descriptions = element.querySelectorAll('.js-advantages-slider-description');

    this.currentElement.innerText = String(this.currentSlide + 1).padStart(2, '0')
    this.totalElement.innerText = String(this.totalCount).padStart(2, '0')

    this.changeSlide(0)

    this.runInterval(this.currentSlide)
  }

  changeSlide(step) {
    clearTimeout(this.timeout)

    this.progressElement.classList.remove('advantages__progressCircle--active')

    const nextIndex = this.currentSlide + step;
    const newIndex = nextIndex < 0 ? this.totalCount - 1 : nextIndex > this.totalCount - 1 ? 0 : nextIndex

    this.currentSlide = newIndex

    this.slides.forEach((slide, index) => {
      slide.classList.toggle('advantages__circleImg--active', index === newIndex)
      this.descriptions[index]?.classList.toggle('advantages__description--active', index === newIndex)
    })

    this.currentElement.innerText = String(this.currentSlide + 1).padStart(2, '0')

    setTimeout(() => {
    this.progressElement.classList.add('advantages__progressCircle--active')
    }, 50)

    this.runInterval(this.currentSlide)
  }

  runInterval(current) {
    this.timeout = setTimeout(() => {
      if (current !== this.currentSlide) {
        return
      }

      this.changeSlide(1)
      this.runInterval()
    }, 7000)
  }
}
