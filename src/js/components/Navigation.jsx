import React, { useState } from 'react';
import { steps } from './stepsData.js';
import { getCurrentLang, langs } from './translation';
import { isTouch } from '../utils/helpers';

export const Navigation = ({ currentStep, setStep }) => {
  const lang = getCurrentLang();

  const [clicked, setClicked] = useState(false);

  const handlePrev = (e) => {
    if (currentStep === 0) {
      return;
    }
    setStep(step => step - 1);

    e.preventDefault()
    e.nativeEvent.stopImmediatePropagation()
  };

  const handleNext = (e) => {
    setStep(step => step + 1);
    e.preventDefault()
    e.nativeEvent.stopImmediatePropagation()
    // return false
  };

  return (
    <div className="Navigation">
      <div className="Navigation__progress">
        <div className="Navigation__progressCounter">{currentStep + 1} {langs[lang].of} {steps.length}</div>
        <div className="Navigation__progressBar">
          <div className="Navigation__progressFiller" style={{ width: `${100 / steps.length * (currentStep + 1)}%` }}></div>
        </div>
      </div>
      <div className="Navigation__buttons">
        <button className="Navigation__prevButton arrowButton"
                onClick={handlePrev}
                onTouchEnd={handlePrev}
        >
          <svg className="arrowButton__icon arrowButton__icon--bigger arrowButton__icon--back">
            <use href="/wp-content/themes/oneplace/spritemap.svg#icon-arrow-bigger" />
          </svg>
        </button>
        <div className="Navigation__button animatedButton buttonWrapper"
             onClick={handleNext}
             onTouchEnd={handleNext}
        >
          <button className="animatedButton__content button" data-modal="#">
            {langs[lang].next}
          </button>
          <button className="animatedButton__contentHovered button" data-modal="#">
            {langs[lang].next}
          </button>
        </div>
      </div>
    </div>
  );
};
