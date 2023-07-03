import Swiper from "swiper/bundle";
import { openModal } from './initModals';
import { initCurrencySelect } from "./currencySelect";

const apartmentsSlider = document.querySelector('.js-project-slider');
const apartmentsModalInner = document.querySelector('.js-apartment-modal-inner');

export function initApartmentsModal() {
  if(!apartmentsSlider) {
    return;
  }
  apartmentsSlider.addEventListener('click', function(e) {
    const link = e.target.closest('.js-open-apartment-modal')

    if (!link) {
      return
    }

    const id = link.dataset.id;

    if (!ajaxUrl || !id) {
      return
    }

    loadProjectModal(id)
  })
}

export function loadProjectModal(id) {
  fetch(`${ajaxUrl}?action=load_project&id=${id}`)
    .then((response) => response.text())
    .then((response) => {
      apartmentsModalInner.innerHTML = response

      const title = document.querySelector('.js-apartment-data-title');
      const type = document.querySelector('.js-apartment-data-type');

      if (title) {
        window.currentApartment =  title.innerHTML
      }

      if (type) {
        window.currentType =  type.innerHTML
      }

      const thumbsSlider = new Swiper('.js-apartment-data-thumbs', {
        loop: true,
        slidesPerView: 'auto',
        on: {
          slideChange: () => {}
        },
        watchSlidesProgress: true,
      })

      const mainSlider = new Swiper('.js-apartment-data-slider', {
        effect: 'fade',
        loop: true,
        fadeEffect: {
          crossFade: true
        },
        slidesPerView: 1,
        autoHeight: true,
        on: {
          slideChange: () => {}
        },
        thumbs: {
          swiper: thumbsSlider
        },
        navigation: {
          nextEl: '.js-apartment-next',
          prevEl: '.js-apartment-prev',
        },
      })

      initCurrencySelect();
      openModal('apartmentData', id);

      const closeButton = document.querySelector('.js-close-apartment-modal');

      function closeApartmentModal() {
        window.history.back();
        thumbsSlider?.destroy(true, true);
        mainSlider?.destroy(true, true);

        closeButton.removeEventListener('click', closeApartmentModal)
      }

      closeButton.addEventListener('click', closeApartmentModal)
    })
}