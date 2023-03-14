import React, { useContext, useEffect, useState } from "react";
import "../style/css/components/navbar.scss";
import NavButton from "./NavButton";
import Icon from "../img/icon.png";
import HomeIcon from "@mui/icons-material/Home";
import HourglassEmptyIcon from "@mui/icons-material/HourglassEmpty";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import LoginIcon from "@mui/icons-material/Login";
import { Link, useLocation } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { signOut } from "firebase/auth";
import { auth } from "../firebase";

const Navbar = () => {
  const { userAuth } = useContext(AuthContext);
  const [userDropdown, setUserDropdown] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setTimeout(() => {
      if (userDropdown) {
        window.addEventListener("click", close);
      } else {
        window.removeEventListener("click", close);
      }
    }, 0);

    return () => {
      window.removeEventListener("click", close);
    };
  }, [userDropdown]);

  const close = () => {
    setUserDropdown(false);
  };

  return (
    <div className="navbar">
      <div className="head">
        <img src={Icon} alt="" />
        <div className="hline"></div>

        <div className="links">
          <Link to="/">
            <NavButton
              icon={<HomeIcon fontSize="inherit" />}
              active={location.pathname === "/" ? true : false}
            />
          </Link>
          <Link to="/listings">
            <NavButton
              rotate={"-30deg"}
              icon={<HourglassEmptyIcon fontSize="inherit" />}
              active={location.pathname === "/listings" ? true : false}
            />
          </Link>
        </div>
      </div>
      <div className="footer">
        {userAuth ? (
          <NavButton
            icon={<AccountCircleIcon fontSize="inherit" />}
            onClick={() => setUserDropdown(!userDropdown)}
            active={
              ["/history", "/settings"].includes(location.pathname)
                ? true
                : false
            }
          />
        ) : (
          <Link to="/login">
            <NavButton
              icon={<LoginIcon fontSize="inherit" />}
              active={location.pathname === "/login" ? true : false}
            />
          </Link>
        )}
        {userDropdown && (
          <div className="account-dropdown">
            <div className="dropdown-items">
              <Link
                to="/history"
                className={
                  location.pathname === "/history" ? "link active" : "link"
                }
              >
                <div
                  className={
                    location.pathname === "/history"
                      ? "dropdown-item active"
                      : "dropdown-item"
                  }
                >
                  <AccountCircleIcon
                    className={
                      location.pathname === "/history"
                        ? "item-icon active"
                        : "item-icon"
                    }
                  />
                  Profile
                </div>
              </Link>
              <Link
                to="/settings"
                className={
                  location.pathname === "/settings" ? "link active" : "link"
                }
              >
                <div
                  className={
                    location.pathname === "/settings"
                      ? "dropdown-item active"
                      : "dropdown-item"
                  }
                >
                  <SettingsOutlinedIcon
                    className={
                      location.pathname === "/settings"
                        ? "item-icon active"
                        : "item-icon"
                    }
                  />
                  Settings
                </div>
              </Link>
              <Link
                to="/login"
                className={
                  location.pathname === "/login" ? "link active" : "link"
                }
                onClick={() => signOut(auth)}
              >
                <div
                  className={
                    location.pathname === "/login"
                      ? "dropdown-item active"
                      : "dropdown-item"
                  }
                >
                  <LogoutOutlinedIcon
                    className={
                      location.pathname === "/login"
                        ? "item-icon active"
                        : "item-icon"
                    }
                  />
                  Logout
                </div>
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
