import { openModal } from './initModals';

const newsLinks = document.querySelectorAll('.js-open-news');
const showMoreButton = document.querySelector('.js-show-more');
const newsList = document.querySelector('.js-news-list');
const newsModalInner = document.querySelector('.js-news-modal-inner');

export function initNews() {
  if (!newsModalInner) {
    return
  }

  newsLinks.forEach((link) => {
    link.addEventListener('click', function() {
      const id = link.dataset.id;

      if (!ajaxUrl || !id) {
        return
      }

      loadNewsModal(id)
    })
  })

  if (!showMoreButton) {
    return;
  }

  showMoreButton.addEventListener('click', function() {
    showMoreButton.remove()
    newsList.classList.add('news__list--full')
  });
}

export function loadNewsModal(id) {
  fetch(`${ajaxUrl}?action=load_news&id=${id}`)
    .then((response) => response.text())
    .then((response) => {
      newsModalInner.innerHTML = response
      openModal('article', id)
    })
}