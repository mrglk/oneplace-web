import React from "react";
// import ReactDOM from "react-dom/client";
import { createRoot } from 'react-dom/client';
import { openModal, closeModals } from "./initModals.js";
import { Quiz } from "./components/Quiz.jsx";

const rootWrap = document.getElementById("quiz");

function initQuiz() {
  let wasInit = false;

  if (!rootWrap) {
    return;
  }
  
    const openQuizModal = () => {
      if (wasInit) {
        openModal('quiz');

        return
      }

      loadQuiz();

      wasInit = true;
    }
  const quizButtons = document.querySelectorAll('.js-open-quiz-modal');
  quizButtons.forEach((button) => {
    button.addEventListener('click', openQuizModal)
  })
}

export function loadQuiz() {
  openModal('quiz');

  const handleClose = () => {
    window.history.back();
  }

  const handleSent = () => {
    handleClose();
    window.location.href = '/thanks'
  }

  const root = createRoot(rootWrap);

  root.render(
    <React.StrictMode>
      <Quiz openModal={openModal} onClose={handleClose} onSuccess={handleSent}/>
    </React.StrictMode>
  );

}

export { initQuiz };
