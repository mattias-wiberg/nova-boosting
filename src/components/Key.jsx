import React from "react";
import "../style/css/components/key.scss";
import AA_BG from "../img/dungeons/background/AA.jpg";
import CoS_BG from "../img/dungeons/background/CoS.jpg";
import HoV_BG from "../img/dungeons/background/HoV.jpg";
import RLP_BG from "../img/dungeons/background/RLP.jpg";
import SBG_BG from "../img/dungeons/background/SBG.jpg";
import TJS_BG from "../img/dungeons/background/TJS.jpg";
import AV_BG from "../img/dungeons/background/AV.jpg";
import NO_BG from "../img/dungeons/background/NO.jpg";

const KeyLi = ({ name, level, inTime = false, className }) => {
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
    <div className={"key" + (className ? " " + className : "")}>
      <div className="background">
        <img src={bgs["AA"]} alt="BG" />
      </div>
      <div className="info">
        <div className="level">
          <span className="value">{level}</span>
          <span className={"plus" + (inTime ? " intime" : "")}>+</span>
        </div>
        <span className="name">{name}</span>
      </div>
    </div>
  );
};

export default KeyLi;
