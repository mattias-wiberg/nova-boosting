import React from "react";
import "../style/css/components/navbar.scss";
import NavButton from "./NavButton";
import Icon from "../img/icon.png";
import HomeIcon from "@mui/icons-material/HomeOutlined";
import HourglassEmptyIcon from "@mui/icons-material/HourglassEmpty";

const Navbar = () => {
  return (
    <div className="navbar">
      <div className="head">
        <img src={Icon} alt="" />
        <div className="hline"></div>

        <div className="links">
          <NavButton icon={<HomeIcon fontSize="inherit" />} />
          <NavButton
            rotate={"-30deg"}
            icon={<HourglassEmptyIcon fontSize="inherit" />}
          />
        </div>
      </div>
      <div className="footer">
        <NavButton />
      </div>
    </div>
  );
};

export default Navbar;
