export function initContacts() {
    const buttons = document.querySelector('.js-contacts-buttons');
    const dataContainer = document.querySelector('.js-contacts-data');

    if (!buttons) {
        return;
    }

    buttons.addEventListener('click', function(e) {
        const target = e.target.closest('button');
        const type = target.dataset.type;

        if(!type) {
            return;
        }

        target.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "nearest" });

        [...buttons.children].forEach((button) => {
            button.classList.toggle('contacts__button--active', button === target);
        })

        renderCityData(type);
    })

    function renderCityData(type) {
        [...dataContainer.children].forEach((item) => {
            item.classList.toggle('contacts__dataCity--active', item.dataset.type === type)
        })
    }
}