export function initWindowHeight() {

    function setWindowHeight() {
        document.body.style.setProperty('--vh', `${window.innerHeight}px`);
    }

    setWindowHeight();
    addEventListener('resize', setWindowHeight);
}