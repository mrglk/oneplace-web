const founderImageSlides = document.querySelectorAll('.js-founders-img-slide')
const founderContentSlides = document.querySelectorAll('.js-founders-content-slide')
const founderButtons = document.querySelectorAll('.js-founders-button')
const founderSlidesNext = document.querySelector('.js-founders-slider-next')
const founderSlidesPrev = document.querySelector('.js-founders-slider-prev')
const progress = document.querySelector('.js-founder-progress');

export function initFoundersSlider() {
  let index = 0;

  if (founderImageSlides.length === 0 || !founderContentSlides) {
    return
  }

  const numberOfSlides = founderImageSlides.length;
  progress.style.width = 100 / numberOfSlides + '%';


  founderButtons.forEach((button, i) => {
    button.addEventListener('click', function() {
      setSlide(i)
    })
  })

  founderSlidesPrev.addEventListener('click', function() {
    changeSlide(-1)
  })

  founderSlidesNext.addEventListener('click', function() {
    changeSlide(1)
  })

  function changeSlide(step) {
    index = index + step

    if (index < 0) {
      index = founderImageSlides.length - 1
    }

    if (index >= founderImageSlides.length) {
      index = 0
    }

    setSlide(index)
  }

  function setSlide(index) {
    for (let i = 0; i < founderImageSlides.length; i++) {
      founderImageSlides[i].classList.toggle('founders__img--active', index === i)
      founderContentSlides[i].classList.toggle('founders__textContent--active', index === i)
      founderButtons[i].classList.toggle('founders__founderButton--active', index === i)
    }

    progress.style.width = (index + 1) / numberOfSlides * 100  + '%';
  }
}

