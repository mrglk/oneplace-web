import 'simplebar';
import 'simplebar/dist/simplebar.css';
import SimpleBar from 'simplebar';

export function initPolicyScroll() {
    const myElement = document.querySelector('.js-policy-scroll');

    if (!myElement) {
      return
    }

    new SimpleBar(myElement);
}