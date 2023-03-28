import React, { useState } from "react";
import "../style/css/components/keybanner.scss";
import { DUNGEONS } from "../js/utilities.js";
import HourglassEmpty from "@mui/icons-material/HourglassEmpty";

const KeyBanner = ({
  dungeon,
  level,
  index,
  inTime = false,
  className,
  iconColor,
  toggleTimed,
}) => {
  return (
    <div
      className={"key" + (className ? " " + className : "")}
      style={
        dungeon === "ANY" && level === 0 ? { borderRadius: "5px 0 0 5px" } : {}
      }
    >
      <div className="background">
        <img src={DUNGEONS[dungeon].img} alt="BG" />
      </div>
      <div className="info">
        <div className="level" onClick={() => toggleTimed(index)}>
          <span className="value">{level}</span>
          <span className={"plus" + (inTime ? " intime" : "")}>+</span>
        </div>
        <div className="name">
          {iconColor && <HourglassEmpty className={`icon ${iconColor}`} />}
          <span>{DUNGEONS[dungeon].name}</span>
        </div>
      </div>
    </div>
  );
};

export default KeyBanner;
