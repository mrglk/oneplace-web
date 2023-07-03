import { Body } from "./classes/Body";
import { loadProjectModal } from './apartmentsModal';
import { loadReviewModal } from './reviews';
import { loadNewsModal } from './news';
import { loadQuiz } from './quiz';

export function initModals() {
  const modalsContainer = document.querySelector(".js-modals");

  if (!modalsContainer) {
    return;
  }

  if (window.location.hash.includes('modal')) {
    if (window.location.hash.includes('apartmentData')) {
      const id = window.location.hash.split('-').pop()
      id && loadProjectModal(id)
    } else if (window.location.hash.includes('review')) {
      const id = window.location.hash.split('-').pop()
      id && loadReviewModal(id)
    }  if (window.location.hash.includes('article')) {
      const id = window.location.hash.split('-').pop()
      id && loadNewsModal(id)
    }  if (window.location.hash.includes('quiz')) {
      loadQuiz()
    } else {
      openModal(window.location.hash.slice(7))
    }
  }

  window.addEventListener('hashchange', function(e) {
    if (e.oldURL.includes('modal')) {
      closeModals()
    }

    if (e.newURL.includes('modal')) {
      const [modalId, param] = e.newURL.split('modal-').pop().split('-')

      openModal(modalId, param)
    } else {
      window.currentApartment =  ''
      window.currentType =  ''
    }
  })

  document.addEventListener('mousedown', function(e) {
    if (e.target.closest('.js-close-modals')) {
      window.history.back();
      return;
    }

    const linkElement = e.target.closest('.js-open-modal');

    if (!linkElement) {
      return
    }

    e.preventDefault();

    const modalId = (
      linkElement.dataset.modal || linkElement.getAttribute("href")
    )
      .split("#")
      .pop();

    openModal(modalId);
  })

  modalsContainer.addEventListener("mousedown", function (e) {
    if (e.target.classList?.contains("js-modals")) {
      window.history.back();
    }
  });
}

export function openModal(modalId, param) {
  closeModals();

  Body.fixBody();

  const modalsContainer = document.querySelector(".js-modals");
  const modal = document.getElementById(modalId);

  if (!modal) {
    return;
  }

  window.location.hash = 'modal-' + modalId + (param ? `-${param}` : '');

  modal.classList.add("modals__item--active");
  modalsContainer.classList.add("modals--active");
}

export function closeModals() {
  const burgerMenu = document.querySelector('.js-burger-menu');

  if (!Body.isFixed()) {
    return
  }

  if(!burgerMenu.classList.contains('burgerMenu--active')) {
    Body.releaseBody();
  }

  const modalsContainer = document.querySelector(".js-modals");

  modalsContainer.classList.remove("modals--active");
  [...modalsContainer.children].forEach((modal) => {
    modal.classList.remove("modals__item--active");
  });
}
