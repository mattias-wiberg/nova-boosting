import React from "react";
import "../style/css/components/navbar.scss";
import NavButton from "./NavButton";
import Icon from "../img/icon.png";
import HomeIcon from "@mui/icons-material/Home";
import HourglassEmptyIcon from "@mui/icons-material/HourglassEmpty";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import LoginIcon from "@mui/icons-material/Login";

const Navbar = () => {
  const loggedIn = false;

  return (
    <div className="navbar">
      <div className="head">
        <img src={Icon} alt="" />
        <div className="hline"></div>

        <div className="links">
          <NavButton icon={<HomeIcon fontSize="inherit" />} active={true} />
          <NavButton
            rotate={"-30deg"}
            icon={<HourglassEmptyIcon fontSize="inherit" />}
          />
        </div>
      </div>
      <div className="footer">
        {loggedIn ? (
          <NavButton icon={<AccountCircleIcon fontSize="inherit" />} />
        ) : (
          <NavButton icon={<LoginIcon fontSize="inherit" />} />
        )}
      </div>
    </div>
  );
};

export default Navbar;
