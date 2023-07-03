import React, { useEffect, useRef } from 'react';
import { getCurrentLang, langs } from './translation';
import intlTelInput from 'intl-tel-input';

export const QuizForm = ({ formFields, setFormFields, handleSubmit, disabled }) => {
  const lang = getCurrentLang()
  const $ref = useRef(null)

  const handleChange = (e, type) => {
    setFormFields((prev) => ({
      ...prev,
      [type]: e.target.value
    }))
  }

  useEffect(() => {
    const itl = intlTelInput($ref.current, {
      utilsScript: "https://cdn.jsdelivr.net/npm/intl-tel-input@18.1.1/build/js/utils.js",
      autoInsertDialCode: true,
      // autoPlaceholder: 'aggressive',
      separateDialCode: true,
      showFlags: false,
      initialCountry: 'ae'
    });

    window.dataLayer?.push({event: 'quiz-final-form'})

    return () => itl.destroy()
  }, [])
  
  return (
    <div className="QuizForm">
      <div className="QuizForm__top">
        <h2 className="QuizForm__header">
          {langs[lang].formTitle}
        </h2>
        <p className="QuizForm__caption">
          {langs[lang].formDescription}
        </p>
      </div>
      <form action={`${window.ajaxUrl}?action=send_form`} onSubmit={(e) => handleSubmit(e)} className="QuizForm__form">
        <div className="QuizForm__inputs">
          <div className="QuizForm__inputWrapper">
            <input
              className="QuizForm__input"
              data-validation="required"
              type="text"
              name="name"
              value={formFields.name}
              onChange={(e) => handleChange(e, 'name')}
              placeholder={langs[lang].name}
            />
            <div className="QuizForm__error">{langs[lang].formError}</div>
          </div>
          <div className="QuizForm__inputWrapper">
            <input
              ref={$ref}
              className="QuizForm__input"
              data-validation="phone"
              type="text"
              name="tel"
              placeholder={langs[lang].phone}
              value={formFields.phone}
              onChange={(e) => handleChange(e, 'phone')}
            />
          <div className="QuizForm__error">{langs[lang].formError}</div>
          </div>
          <div className="QuizForm__inputWrapper">
            <input
              className="QuizForm__input"
              data-validation="email"
              type="text"
              name="email"
              placeholder={langs[lang].email}
              value={formFields.email}
              onChange={(e) => handleChange(e, 'email')}
            />
            <div className="QuizForm__error">{langs[lang].formError}</div>
          </div>
        </div>
        <div className="QuizForm__bottom">
            <div className="QuizForm__button animatedButton buttonWrapper">
              <input
                disabled={disabled}
                type="submit"
                data-success="Sent"
                className="animatedButton__content button"
                value={langs[lang].formButton}
              />
              <input
               disabled={disabled}
                type="submit"
                data-success="Sent"
                className="animatedButton__contentHovered button"
                value={langs[lang].formButton}
              />
            </div>
          <p className="form__terms">
            {langs[lang].formPress}
            <br />
            <a href="#" className="form__termsLink js-open-modal" data-modal="terms">
              {langs[lang].formTerms}
            </a>
          </p>
        </div>
      </form>
    </div>
  );
};
