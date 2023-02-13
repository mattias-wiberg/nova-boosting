import React from "react";
import CloseIcon from "@mui/icons-material/Close";
import AA_BG from "../img/dungeons/background/AA.jpg";
import CoS_BG from "../img/dungeons/background/CoS.jpg";
import HoV_BG from "../img/dungeons/background/HoV.jpg";
import RLP_BG from "../img/dungeons/background/RLP.jpg";
import SBG_BG from "../img/dungeons/background/SBG.jpg";
import TJS_BG from "../img/dungeons/background/TJS.jpg";
import AV_BG from "../img/dungeons/background/AV.jpg";
import NO_BG from "../img/dungeons/background/NO.jpg";

const KeyLi = ({ closeHandler }) => {
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
  return (
    <div className="keyLi">
      <div className="key">
        <div
          className="listing"
          style={
            closeHandler
              ? { borderRadius: "5px 0 0 5px" }
              : { borderRadius: "5px" }
          }
        >
          <img src={bgs["AA"]} alt="BG" />
          <div className="info">
            <span className="name">Algeth'ar Academy</span>
            <span className="level">14</span>
          </div>
        </div>
        {closeHandler && (
          <button onClick={closeHandler}>
            <CloseIcon />
          </button>
        )}
      </div>
    </div>
  );
};

export default KeyLi;
