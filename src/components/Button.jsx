import React from "react";
import "../style/css/components/button.scss";
import { useState } from "react";

const Button = ({
  text,
  button_icon,
  color = "green",
  type,
  clickHandler,
  swap,
  borderRadius = "5px",
}) => {
  /*
    type: none, hold
      Will change the background color of the button on click to
      the one when hovering over it. (defined by {type}-hover)
      
    swap (optional):
      If type is hold, swap will be an object with the following
      properties:
        color: The color of the button when it is active
        button_icon: The icon of the button when it is active
      Example:
        swap = {
          color: "green",
          button_icon: <CheckIcon fontSize="14px" />
        }
  */
  // type: none, hold:
  //  Will change the background color of the button on click and
  const [hover, setHover] = useState(color + "-hover");
  const [background, setBackground] = useState("default");
  const [activeClick, setActiveClick] = useState(false);
  const [icon, setIcon] = useState(button_icon);

  const handleClick = (e) => {
    e.preventDefault();

    if (type === "hold") {
      if (hover === color + "-hover") {
        setHover("");
        if (swap) {
          setBackground(swap.color);
          setIcon(swap.button_icon);
        } else {
          setBackground(color);
        }
      } else if (hover === "") {
        if (activeClick) {
          // Button is default and being clicked but activeClick
          // is true since the mouse never left the button
          if (swap) {
            setBackground(swap.color);
            setIcon(swap.button_icon);
          } else {
            setBackground(color);
          }
          setActiveClick(false);
        } else {
          //Button is active and being clicked
          setIcon(button_icon);
          setBackground("default");
          setActiveClick(true);
        }
      }
    }
    clickHandler && clickHandler(e);
  };

  const handleMouseLeave = () => {
    if (type === "hold") {
      if (activeClick) {
        setHover(color + "-hover");
        setActiveClick(false);
      }
    }
  };

  return (
    <div
      className={`button ${background} ${hover}`}
      onClick={handleClick}
      onMouseLeave={handleMouseLeave}
      style={{ borderRadius: borderRadius }}
    >
      {text && <span>{text}</span>}
      <div className="icon">{icon}</div>
    </div>
  );
};

export default Button;
