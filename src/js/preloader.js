import { getCookie, setCookie } from "./utils/helpers";
import { Body } from "./classes/Body";
import { initTextEffect } from "./textEffect";
import { initImageEffect } from "./imageEffect";

const preloader = document.querySelector(".js-preloader");

export function initPreloader() {
  if (!preloader) {
    initEffects()
    return;
  }

  if (getCookie("preloader_has_shown")) {
    preloader.classList.add("preloader--nope");
    initEffects()
    return;
  }

  Body.fixBody();
  runPreloader();

  // @todo расскоментировать когда прелоадер будет нужен на проде
  setCookie("preloader_has_shown", "true", 5);
}

function runPreloader() {
    setTimeout(() => {
        preloader.classList.add("preloader--hidden");
        Body.releaseBody();
        initEffects()
    }, 1000)
};

function initEffects() {
  initTextEffect()
  initImageEffect()
}