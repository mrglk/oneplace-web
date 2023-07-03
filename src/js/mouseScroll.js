export function initMouseScroll() {
    const button = document.querySelector('.js-leaf-button');
    const projectsSection = document.getElementById('projects');

    if (!button) {
        return;
    }

    button.addEventListener('click', function() {
        window.scrollTo({
            top: projectsSection.offsetTop,
            left: 0,
            behavior: "smooth",
          });
    })
}