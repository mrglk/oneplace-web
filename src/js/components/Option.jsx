import React from "react";
import { isTouch } from '../utils/helpers';

export const Option = ({ data, type, handleChange, answers, currentStep, index }) => {
  const { id, value, name, checked } = data;
  return (
    <div className="Option">
        <input
          // autoFocus={index === 0}
          type={type}
          name={name}
          className="Option__input"
          id={id}
          value={value}
          checked={Boolean(answers[currentStep]?.includes(value))}
          onChange={() => {}}
          // defaultChecked={Boolean(answers[currentStep]?.includes(value))}
        />
        <label onMouseDown={() => {!isTouch() && handleChange(value) }} onTouchStart={() => {isTouch() && handleChange(value)}} className="Option__label"> {value} </label>
    </div>
  );
};
