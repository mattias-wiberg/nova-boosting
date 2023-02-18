import React from "react";
import "../style/css/components/navbutton.scss";

const NavButton = ({ icon, rotate, active }) => {
  return (
    <div className="nav-button">
      <div className="icon" style={{ rotate: rotate }}>
        {icon}
      </div>
    </div>
  );
};

export default NavButton;
