import 'simplebar';
import 'simplebar/dist/simplebar.css';

import Swiper from "swiper/bundle";
import { openModal } from './initModals';
import SimpleBar from 'simplebar';

const swiperElement = document.querySelector('.js-reviews-slider')
const reviewsLinks = document.querySelectorAll('.js-open-review')
const reviewModalInner = document.querySelector('.js-review-modal-inner')

export function initReviews() {
  if (!swiperElement) {
    return
  }

  breakpoint.addListener(breakpointChecker);
  breakpointChecker();

  new Swiper('.js-reviews-slider', {
    slidesPerView: 'auto',
    loop: true,
    spaceBetween: 20,
    breakpoints: {
      1700: {
        slidesPerView: 'auto',
        spaceBetween: 40,
      },
    },
    speed: 1000,
    simulateTouch: false,
    mousewheel: false,
    pagination: {
      el: ".js-reviews-slider-progress",
      type: "progressbar",
    },

    navigation: {
      nextEl: '.js-reviews-slider-next',
      prevEl: '.js-reviews-slider-prev',
    },
  })

  if (!reviewsLinks) {
    return;
  }

  reviewsLinks.forEach((link) => {
    link.addEventListener('click', function() {
      const id = link.dataset.id;

      if (!ajaxUrl || !id) {
        return
      }

      loadReviewModal(id)
    })
  })
}

export function loadReviewModal(id) {
  fetch(`${ajaxUrl}?action=load_review&id=${id}`)
    .then((response) => response.text())
    .then((response) => {
      reviewModalInner.innerHTML = response
      openModal('review', id)

      const myElement = document.querySelector('.js-review-scroll');

      if (!myElement) {
        return
      }

      new SimpleBar(myElement);
    })
}

function cutText(){
  const reviewsTexts = document.querySelectorAll('.js-reviews-text');
  const limit = 127;

  reviewsTexts.forEach((review) => {
    let newText = review.innerHTML.slice(0, limit).trim();
    review.innerHTML = newText + '...';
  })
}


const breakpoint = window.matchMedia("(max-width: 950px)");

const breakpointChecker = function () {
  if (breakpoint.matches === true) {
    return cutText()
  }
};
