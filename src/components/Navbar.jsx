import React, { useContext } from "react";
import "../style/css/components/navbar.scss";
import NavButton from "./NavButton";
import Icon from "../img/icon.png";
import HomeIcon from "@mui/icons-material/Home";
import HourglassEmptyIcon from "@mui/icons-material/HourglassEmpty";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import LoginIcon from "@mui/icons-material/Login";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const Navbar = () => {
  const { currentUser } = useContext(AuthContext);

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
        {currentUser ? (
          <NavButton icon={<AccountCircleIcon fontSize="inherit" />} />
        ) : (
          <Link to="/login" className="link">
            <NavButton icon={<LoginIcon fontSize="inherit" />} />
          </Link>
        )}
      </div>
    </div>
  );
};

export default Navbar;
