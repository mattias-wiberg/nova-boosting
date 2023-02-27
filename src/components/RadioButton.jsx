import React from "react";
import "../style/css/components/radiobutton.scss";

const RadioButton = ({ onClick, ticked = false }) => {
  return (
    <div className="radio-button" onClick={() => onClick && onClick(ticked)}>
      <div className={`tick${ticked ? " active-bg" : ""}`}></div>
    </div>
  );
};

export default RadioButton;
