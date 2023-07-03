export function initSmoothScroll() {
  const hashLinks = document.querySelectorAll('a[href^="#"]');

  hashLinks.forEach((link) => {
    link.addEventListener('click', function() {

      document.getElementById(link.href.split('#').pop())?.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    });
  });
}