import React, { useEffect } from "react";
import "../style/css/components/checkbox.scss";

const Checkbox = ({
  tickType = "tick",
  recommended = "0010", // 4 digit string, 0 = transparent, 1 = visible (top, right, bottom, left)
  ticked = true,
  toggle = () => {},
  color = "active",
}) => {
  return (
    <div className="checkbox">
      <div className="row">
        <div
          className={
            "recommended" + (recommended[0] === "0" ? " transparent" : "")
          }
        ></div>
      </div>
      <div className="row">
        <div
          className={
            "recommended" + (recommended[3] === "0" ? " transparent" : "")
          }
        ></div>
        <div className="box" onClick={toggle}>
          {tickType === "tick" && ticked && (
            <div className={`tick ${color}-bg`}></div>
          )}
          {tickType === "semi" && ticked && (
            <div className={`semi-tick ${color}-border`}></div>
          )}
        </div>
        <div
          className={
            "recommended" + (recommended[1] === "0" ? " transparent" : "")
          }
        ></div>
      </div>
      <div className="row">
        <div
          className={
            "recommended" + (recommended[2] === "0" ? " transparent" : "")
          }
        ></div>
      </div>
    </div>
  );
};

export default Checkbox;
