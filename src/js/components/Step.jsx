import React, { useCallback, useEffect } from 'react';
import { Option } from './Option.jsx';
import { Navigation } from './Navigation.jsx';
import { getCurrentLang, langs } from './translation';

export const Step = ({ title, options, setAnswers, setStep, currentStep, answers }) => {
  const lang = getCurrentLang();

  const handleRadioSelect = (value) => {
    setAnswers((prevResult) => {
      const newValue = [...prevResult];

      newValue[currentStep] = [value];

      return newValue;
    });
  };

  const handleCheckboxSelect = (value) => {
    setAnswers((prevResult) => {
      const newValue = prevResult.map((a) => [...a]);

      if (prevResult[currentStep].includes(value)) {
        newValue[currentStep] = newValue[currentStep].filter((item) => item !== value);
      } else {
        newValue[currentStep].push(value);
      }

      return newValue;
    });
  };

  return (
    <div className="Step">
      <div className="Step__left">
        <div className="Step__content">
          <div className="Step__leftTop">
            <h2 className="Step__title">
              {title}
            </h2>
            <div className="Step__caption"> {options.type === 'checkbox' && langs[lang].choose}</div>

          </div>
          <div className={options.items.length <= 3 ? 'Step__options' : 'Step__options Step__options--row'}>
            {options.items.map((option, i) => (
              <Option key={option.id} index={i} data={option} type={options.type} handleChange={options.type === 'radio' ? handleRadioSelect : handleCheckboxSelect} answers={answers}
                      currentStep={currentStep} />
            ))}
          </div>
        </div>
        <div className="Step__navigation">
          <Navigation currentStep={currentStep} setStep={setStep} />
        </div>
      </div>
      <div className="Step__imgWrapper">
        <img className="Step__img" alt="Dubai" src="/wp-content/themes/oneplace/img/quiz-img.jpg"></img>
      </div>
    </div>
  );
};