import React, { useState } from "react";
import "../style/css/components/key.scss";
import data from "../data/data.json";
import HourglassEmptyIcon from "@mui/icons-material/HourglassEmpty";
import CloseIcon from "@mui/icons-material/Close";
import Select from "./Select";
import Button from "./Button";
import KeyBanner from "./KeyBanner";

const Key = ({
  dungeon,
  level,
  inTime = false,
  needKey = false,
  remove,
  toggleTimed,
  toggleNeedKey,
  className,
}) => {
  return (
    <div className="key-container">
      <div className="key-content">
        <KeyBanner
          dungeon={dungeon}
          level={level}
          inTime={inTime}
          toggleTimed={toggleTimed}
        />
        <div className="bottom">
          {level > 0 && (
            <button
              onClick={toggleNeedKey}
              style={dungeon === "ANY" ? { borderRadius: "0 0 5px 5px" } : {}}
              className={dungeon !== "ANY" ? "right-border" : ""}
            >
              <HourglassEmptyIcon
                fontSize="inherit"
                className={"icon" + (needKey ? " active" : "")}
              />
            </button>
          )}{" "}
          {dungeon !== "ANY" && (
            <Select
              className={
                level === 0 ? "level-round item-select" : "item-select"
              }
              type="item"
              items={Object.fromEntries(
                data[dungeon].items.map((item, i) => [i, { id: i, ...item }])
              )}
            />
          )}
        </div>
      </div>
      <Button
        color="red"
        button_icon={<CloseIcon fontSize="inherit" />}
        clickHandler={remove}
      />
    </div>
  );
};

export default Key;
