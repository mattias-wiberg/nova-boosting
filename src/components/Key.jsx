import React, { useState } from "react";
import "../style/css/components/key.scss";
import HourglassEmptyIcon from "@mui/icons-material/HourglassEmpty";
import CloseIcon from "@mui/icons-material/Close";
import Select from "./Select";
import Button from "./Button";
import KeyBanner from "./KeyBanner";

const Key = ({ dungeon, level, inTime = false, className }) => {
  const [timed, setTimed] = useState(inTime);

  return (
    <div className="key-container">
      <div className="key-content">
        <KeyBanner dungeon={dungeon} level={level} inTime={timed} />
        <div className="bottom">
          <button>
            <HourglassEmptyIcon fontSize="inherit" className="icon" />
          </button>
          <Select className="item-select" />
        </div>
      </div>
      <Button color="red" button_icon={<CloseIcon fontSize="inherit" />} />
    </div>
  );
};

export default Key;
