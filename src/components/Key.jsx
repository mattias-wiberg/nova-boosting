import React, { useState } from "react";
import "../style/css/components/key.scss";
import HourglassEmptyIcon from "@mui/icons-material/HourglassEmpty";
import CloseIcon from "@mui/icons-material/Close";
import AA_BG from "../img/dungeons/background/AA.jpg";
import CoS_BG from "../img/dungeons/background/CoS.jpg";
import HoV_BG from "../img/dungeons/background/HoV.jpg";
import RLP_BG from "../img/dungeons/background/RLP.jpg";
import SBG_BG from "../img/dungeons/background/SBG.jpg";
import TJS_BG from "../img/dungeons/background/TJS.jpg";
import AV_BG from "../img/dungeons/background/AV.jpg";
import NO_BG from "../img/dungeons/background/NO.jpg";
import Select from "./Select";
import Button from "./Button";
import KeyBanner from "./KeyBanner";

const Key = ({ name, level, inTime = false, className }) => {
  const bgs = {
    AA: AA_BG,
    CoS: CoS_BG,
    HoV: HoV_BG,
    RLP: RLP_BG,
    SBG: SBG_BG,
    TJS: TJS_BG,
    AV: AV_BG,
    NO: NO_BG,
  };

  const [timed, setTimed] = useState(inTime);

  return (
    <div className="key-container">
      <div className="key-content">
        <KeyBanner name={name} level={level} inTime={timed} />
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
