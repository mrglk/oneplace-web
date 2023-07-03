export function initCurrencySelect() {
    const select = document.querySelector('.js-currency-select');

    if (!select) {
        return;
    }

    select.style.display = 'none';
    const selectHtml = renderSelect(select);

    select.after(selectHtml);

    selectHtml.addEventListener('click', clickElement);


    function clickElement(e) {
        const option = e.target.closest('.js-currency-select-option');
        const select = e.currentTarget;

        const openedSelect = document.querySelector('.currencySelect--active')

        if (openedSelect) {
            openedSelect.classList.remove('currencySelect--active')
        }

        if (option) {
            const currentElement = select.querySelector('.js-currency-select-current');
            const price = document.querySelector('.js-apartment-data-price');

            currentElement.innerText = option.textContent;
            price.innerHTML = option.dataset.price;

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

            return;
        }

        if (openedSelect === select) {
            openedSelect.classList.remove('currencySelect--active')
            return;
        }

        const optionsHtml = document.querySelectorAll('.js-currency-select-option');
        const currentHtml = document.querySelector('.js-currency-select-current');
        optionsHtml.forEach((option) => {
            option.classList.toggle('currencySelect__option--active', option.innerHTML === currentHtml.innerText);
        })
        
        const wrapper = e.target.closest('.js-currency-select-wrapper');
        if (wrapper) {
            select.classList.add('currencySelect--active');
        }

        document.addEventListener('click', documentClick)
    }

    function renderSelect(select) {
        const options = [...select.options].map(option => {
            return { name: option.innerText, price: option.dataset.price }
        });
        const selectWrapper = document.createElement('div');

        selectWrapper.classList.add('currencySelect');

        const optionsHtml = options.map((option, i) => {
            const activeClass = i === 0 ? 'currencySelect__option--active' : '';
            return `<div class="currencySelect__option ${activeClass} js-currency-select-option" data-price="${option.price}">${option.name}</div>`;
        }).join('');

        selectWrapper.innerHTML = `
      <div class="currencySelect__inner js-currency-select-wrapper">
                                   <div class="currencySelect__head">
                                        <div class="currencySelect__currentValue js-currency-select-current">
                                            ${options[0].name}</div>
                                        <div class="currencySelect__button">
                                            <svg class="currencySelect__icon">
                                                <use href="/wp-content/themes/oneplace/spritemap.svg#icon-arrow" />
                                            </svg>
                                        </div>
                                    </div>
                                    <div class="currencySelect__options">
                                        ${optionsHtml}
                                    </div>
                                    </div>
      `;
        return selectWrapper;
    }

    function documentClick(e) {
        if (e.target.closest('.currencySelect')) {
            return
        }

        document.removeEventListener('click', documentClick)

        const select = document.querySelector('.currencySelect--active')

        if (select) {
            select.classList.remove('select--active')
        }
    }

}