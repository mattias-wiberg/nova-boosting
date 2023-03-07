import React from "react";
import "../style/css/components/navbutton.scss";

const NavButton = ({ icon, rotate, onClick, active = false }) => {
  return (
    <div className={`nav-button ${active && "active"}`} onClick={onClick}>
      <div className="icon" style={{ rotate: rotate }}>
        {icon}
      </div>
    </div>
  );
};

export default NavButton;
