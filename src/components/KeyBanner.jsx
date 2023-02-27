import React, { useState } from "react";
import "../style/css/components/keybanner.scss";
import AA_BG from "../img/dungeons/background/AA.jpg";
import CoS_BG from "../img/dungeons/background/CoS.jpg";
import HoV_BG from "../img/dungeons/background/HoV.jpg";
import RLP_BG from "../img/dungeons/background/RLP.jpg";
import SBG_BG from "../img/dungeons/background/SBG.jpg";
import TJS_BG from "../img/dungeons/background/TJS.jpg";
import AV_BG from "../img/dungeons/background/AV.jpg";
import NO_BG from "../img/dungeons/background/NO.jpg";
import HourglassEmpty from "@mui/icons-material/HourglassEmpty";

const KeyBanner = ({
  dungeon,
  level,
  inTime = false,
  className,
  iconColor,
}) => {
  const dungeons = {
    AA: { name: "Algeth'ar Academy", img: AA_BG },
    CoS: { name: "Court of Stars", img: CoS_BG },
    HoV: { name: "Halls of Valor", img: HoV_BG },
    RLP: { name: "Ruby Life Pools", img: RLP_BG },
    SBG: { name: "Shadowmoon Burial Grounds", img: SBG_BG },
    TJS: { name: "Temple of the Jade Serpent", img: TJS_BG },
    AV: { name: "The Azure Vault", img: AV_BG },
    NO: { name: "The Nokhud Offensive", img: NO_BG },
  };
  console.log(dungeons);
  console.log(dungeon);
  const [timed, setTimed] = useState(inTime);

  return (
    <div className={"key" + (className ? " " + className : "")}>
      <div className="background">
        <img src={dungeons[dungeon].img} alt="BG" />
      </div>
      <div className="info">
        <div className="level" onClick={() => setTimed(!timed)}>
          <span className="value">{level}</span>
          <span className={"plus" + (timed ? " intime" : "")}>+</span>
        </div>
        <div className="name">
          {iconColor && <HourglassEmpty className={`icon ${iconColor}`} />}
          <span>{dungeons[dungeon].name}</span>
        </div>
      </div>
    </div>
  );
};

export default KeyBanner;
