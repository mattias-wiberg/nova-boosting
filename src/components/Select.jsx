import React from "react";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import "../style/css/components/select.scss";

const Select = ({ clickHandler, selection, label }) => {
  return (
    <div className="select" onClick={clickHandler}>
      <div className="left">
        <span className="selected">{selection}</span>
      </div>
      <div className="right">
        {label && <span className="label">{label}</span>}
        <div className="arrow">
          <ExpandMoreIcon fontSize="inherit" />
        </div>
      </div>
    </div>
  );
};

export default Select;
