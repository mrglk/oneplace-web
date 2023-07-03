import Swiper from 'swiper/bundle';

const slider = document.querySelector('.js-project-slider');
const projectsFilter = document.querySelector('.js-project-filter');
const projectSliderItems = [...slider?.firstElementChild.children || []];

let swiper;

export function initProjectsSlider() {
  if (!slider) {
    return;
  }

  swiper = runSwiper('apartment');

  projectsFilter.addEventListener('click', function(e) {
    const target = e.target.closest('button');
    const type = target.dataset.type;

    if (!type) {
      return;
    }

    target.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "nearest" });

    [...projectsFilter.children].forEach((item) => {
      item.classList.toggle('filterButton--active', item === target);
    });

    swiper.destroy(true, true);

    swiper = runSwiper(type);
  });
}

function runSwiper(type) {
  if (!slider) {
    return;
  }

  slider.firstElementChild.innerHTML = projectSliderItems.filter((slide) => slide.dataset.type === type || type === 'all').map(item => item.outerHTML).join('')

  return new Swiper('.js-project-slider', {
    slidesPerView: 'auto',
    loop: true,
    spaceBetween: 15,
    breakpoints: {
      951: {
        slidesPerView: 'auto',
        spaceBetween: 20,
      },
    },

    navigation: {
      nextEl: '.js-project-slider-next',
      prevEl: '.js-project-slider-prev',
    },
  });
}