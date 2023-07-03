export function customSelect() {
  const selectInputs = document.querySelectorAll('.js-select');
  if (!selectInputs) {
    return;
  }

  selectInputs.forEach((select) => {
    initSelect(select);
  });

  function initSelect(selectElement) {
    selectElement.style.display = 'none';

    const options = [...selectElement.options].map(option => option.innerText);
    const label = selectElement.dataset.label;
    const selectHtml = renderSelect(options, label);

    selectElement.after(selectHtml);

    selectHtml.addEventListener('click', clickElement);
  }

  function clickElement(e) {
    const option = e.target.closest('.js-select-option');
    const select = e.currentTarget;

    const openedSelect = document.querySelector('.select--active')

    if (openedSelect) {
      openedSelect.classList.remove('select--active')
    }

    if (option) {
      const currentElement = select.querySelector('.js-select-current');

      currentElement.innerText = option.textContent;

      const selectElement = select.previousElementSibling

      if (selectElement.tagName === 'SELECT') {
        [...selectElement.options].forEach((option) => {
          if (option.innerText === currentElement.innerText) {
            option.selected = 'selected'
          } else {
            option.removeAttribute('selected')
          }
        })
      }

      const optionsElements = document.querySelectorAll('.js-select-option');
      optionsElements.forEach((option) => {
        const current = option.closest('.js-select-wrapper').querySelector('.js-select-current')
        option.classList.toggle('select__option--active', option.innerHTML === current.innerText);
      })

      return;
    }

    if (openedSelect === select) {
      openedSelect.classList.remove('select--active')
      return;
    }

    const wrapper = e.target.closest('.js-select-wrapper');

    if (wrapper) {
      select.classList.add('select--active');
    }

    document.addEventListener('click', documentClick)
  }

  function renderSelect(options, label) {
    const selectWrapper = document.createElement('div');

    selectWrapper.classList.add('select');

    const optionsHtml = options.map((option, i) => {
      const activeClass = i === 0 ? 'select__option--active' : '';
      return `<div class="select__option ${activeClass} js-select-option">${option}</div>`;
    }).join('');

    selectWrapper.innerHTML = `
    <div class="select__inner js-select-wrapper">
    <div class="select__content">
        <div class="select__caption">${label}</div>
        <div class="select__currentValue js-select-current">${options[0]}</div>
    </div>
    <div class="select__options">
        ${optionsHtml}
    </div>
    <svg class="select__arrowIcon">
    <use href="/wp-content/themes/oneplace/spritemap.svg#icon-select-arrow-icon" />
    </svg>
</div> 

</div>
    `;

    return selectWrapper;
  }

  function documentClick(e) {
    if (e.target.closest('.select')) {
      return
    }

    document.removeEventListener('click', documentClick)

    const select = document.querySelector('.select--active')

    if (select) {
      select.classList.remove('select--active')
    }
  }

}