import Validator from './classes/Validator';
import { openModal } from './initModals';
import 'intl-tel-input/build/css/intlTelInput.css';
import intlTelInput from 'intl-tel-input';

let formSent = false;

export function initForms() {
  const forms = document.querySelectorAll('form');

  const phoneInputs = document.querySelectorAll('input[data-validation="phone"]');
  phoneInputs.forEach((input) => {
    intlTelInput(input, {
      utilsScript: "https://cdn.jsdelivr.net/npm/intl-tel-input@18.1.1/build/js/utils.js",
      autoInsertDialCode: true,
      // autoPlaceholder: 'aggressive',
      separateDialCode: true,
      showFlags: false,
      initialCountry: 'ae'
    });
  })

  forms.forEach((form) => {
    form.addEventListener('submit', submitForm)
  })
}

function submitForm(e) {
  e.preventDefault()

  if (formSent) {
    return;
  }

  const form = e.currentTarget

  const phoneCode = form.querySelector('.iti')?.innerText

  const validator = new Validator(form);
  const formData = new FormData(form);

  const formPurpose = document.querySelector('.js-select-purpose')?.value || ''
  const formType = document.querySelector('.js-select-type')?.value || ''
  const formDistrict = document.querySelector('.js-select-district')?.value || ''

  formData.set('main_purpose', formPurpose)
  formData.set('main_type', formType)
  formData.set('main_district', formDistrict)

  if (phoneCode) {
    formData.set('tel', `${phoneCode} ${formData.get('tel')}`)
  }

  if (window.currentApartment) {
    formData.set('selected-apartment', window.currentApartment)
  }

  if (window.currentType) {
    formData.set('selected-type', window.currentType)
  }

  const url = form.getAttribute("action");
  const isFormValid = validator.validate();

  const button = form.querySelector('input[type="submit"]');

  if (!url || !isFormValid) {
    return;
  }

  if (button) {
    button.setAttribute('disabled', 'disabled')
  }

  formSent = true;

  fetch(url, {
    method: 'POST',
    body: formData,
  })
    .then((response) => response.json())
    .then((response) => {
      form.reset();
      button.removeAttribute('disabled');
      // button.value = button.dataset.success || 'Sent';

      window.location.href = '/thanks'
      // openModal('thanks');
    });
}

export function resetForm(form) {
  form.reset();
  const validator = new Validator(form);
  // validator.clearErrors();
}
