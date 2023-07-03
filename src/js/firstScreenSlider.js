import Swiper from "swiper/bundle";

const firstSlider = document.querySelector('.js-first-slider');

export function initFirstScreenSlider() {
    if (!firstSlider) {
        return;
      }
    
      new EasySlider(firstSlider)
}

class EasySlider {
    currentSlide = 0;
  
    constructor(element) {
      this.prevButton = element.querySelector('.js-first-slider-prev');
      this.nextButton = element.querySelector('.js-first-slider-next');
  
      this.imagesWrapper = element.querySelector('.js-first-slider-images');
      this.slides = this.imagesWrapper.querySelectorAll('.firstScreen__imgWrapper');
      this.totalCount = this.slides.length;
  
      this.nextButton.addEventListener('click', () => this.changeSlide(1));
      this.prevButton.addEventListener('click', () => this.changeSlide(-1));
  
      this.text = element.querySelectorAll('.js-first-slider-text');
  
      this.changeSlide(0)
    }

    changeSlide(step) {
        const nextIndex = this.currentSlide + step;
        const newIndex = nextIndex < 0 ? this.totalCount - 1 : nextIndex > this.totalCount - 1 ? 0 : nextIndex
    
        this.currentSlide = newIndex
    
        this.slides.forEach((slide, index) => {
          slide.classList.toggle('firstScreen__imgWrapper--active', index === newIndex)
          this.text[index]?.classList.toggle('firstScreen__top--active', index === newIndex)
        })
      }
}