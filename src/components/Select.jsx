import React from "react";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import "../style/css/components/select.scss";

const Select = ({ clickHandler, selection = "Faze Clan", label = "3/4" }) => {
  return (
    <div className="select" onClick={clickHandler}>
      <div className="left">
        <span className="selected">{selection}</span>
      </div>
      <div className="right">
        <span className="label">{label}</span>
        <div className="arrow">
          <ExpandMoreIcon fontSize="inherit" />
        </div>
      </div>
    </div>
  );
};

export default Select;
