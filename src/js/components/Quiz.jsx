import React, { useState } from 'react';
import { Step } from "./Step.jsx";
import { steps } from "./stepsData.js";
import { QuizForm } from "./QuizForm.jsx";

import Validator from "../classes/Validator";

const ACTION_URL = '/wp-admin/admin-ajax.php?action=send_form&type=quiz'

const stepsArray = steps.map(step => [step.options.items[0].value])

export const Quiz = ({ onClose, onSuccess }) => {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState(stepsArray);
  const [formFields, setFormFields] = useState({
    name: '',
    phone: '',
    email: '',
  });
  const [formSent, setFormSent] = useState(false);
  const [disabled, setDisabled] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (formSent) {
      return;
    }

    const form = e.currentTarget;
    const validator = new Validator(form);
    const formData = new FormData(form);
    const isFormValid = validator.validate();

    steps.forEach((step, i) => {
      formData.set(step.name, answers[i])
    })

    const phoneCode = form.querySelector('.iti')?.innerText

    if (phoneCode) {
      formData.set('tel', `${phoneCode} ${formData.get('tel')}`)
    }

    if (!isFormValid) {
      return;
    }

    fetch(ACTION_URL, {
      method: 'POST',
      body: formData,
    })
      .then((response) => response.json())
      .then((response) => {
        setFormFields({ name: '', phone: '', email: '' });
        form.reset();
        setFormSent(false);
        setDisabled(false);
        onSuccess();
      }).catch(() => {
        setFormSent(false);
        setDisabled(false);
    });
  };

  return (
    <div className="Quiz">
      <button className="Quiz__closeButton closeButton" onTouchStart={onClose} onMouseDown={onClose}></button>
      <div className="Quiz__inner">
        {step <= steps.length - 1 ? (
          <Step
            title={steps[step].title}
            options={steps[step].options}
            setAnswers={setAnswers}
            setStep={setStep}
            currentStep={step}
            answers={answers}
          />
        ) : (
          <QuizForm
            formFields={formFields}
            setFormFields={setFormFields}
            error={false}
            handleSubmit={handleSubmit}
            disabled={disabled}
          />
        )}
      </div>
    </div>
  );
};
