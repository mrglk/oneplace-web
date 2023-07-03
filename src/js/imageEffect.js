const images = document.querySelectorAll('.js-image') || [];
const imagesComtainers = document.querySelectorAll('.js-image-wrapper') || [];

export function initImageEffect() {

    const options = {
        root: null,
        threshold: 0.5,
    };

    const observer = new IntersectionObserver((items) => {
        items.forEach(({
            target,
            isIntersecting
        }) => {
            if (!isIntersecting) {
                return;
            }

            const className = target.dataset.class;

            if (!className) {
                return;
            }

            target.classList.add(className);
            observer.unobserve(target);
        });
    }, options);

    [...images, ...imagesComtainers].forEach((image) => {
        observer.observe(image);
    });
}