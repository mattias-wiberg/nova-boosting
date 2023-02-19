import React, { useState } from "react";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import "../style/css/components/select.scss";

const Select = ({ clickHandler, selection, label, className, expanded }) => {
  const handleClick = (e) => {
    e.preventDefault();
    clickHandler();
  };

  return (
    <div className={`select ${className}`} onClick={handleClick}>
      <div className="left">
        <span className="selected">{selection}</span>
      </div>
      <div className="right">
        {label && <span className="label">{label}</span>}
        <div className="arrow">
          {expanded ? (
            <ExpandLessIcon fontSize="inherit" />
          ) : (
            <ExpandMoreIcon fontSize="inherit" />
          )}
        </div>
      </div>
    </div>
  );
};

export default Select;
