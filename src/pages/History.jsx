import React from "react";
import Button from "../components/Button";
import KeyBanner from "../components/KeyBanner";
import RadioButton from "../components/RadioButton";
import Select from "../components/Select";
import "../style/css/pages/history.scss";
import { HourglassEmptyOutlined } from "@mui/icons-material";
import { ReactComponent as TankIcon } from "../img/icons/tank.svg";
import { ReactComponent as HealerIcon } from "../img/icons/healer.svg";
import { ReactComponent as DpsIcon } from "../img/icons/dps.svg";
import { ReactComponent as HordeIcon } from "../img/icons/horde.svg";
import { ReactComponent as AllianceIcon } from "../img/icons/alliance.svg";

const History = ({ paid = true }) => {
  const [tab, setTab] = React.useState("live"); // live, completed, cancelled, pending
  const tabText = {
    live: "In Progress",
    completed: "Completed",
    cancelled: "Cancelled",
    pending: "Pending...",
  };
  const tabTextColor = {
    live: "live",
    completed: "completed",
    cancelled: "cancelled",
    pending: "pending",
  };
  return (
    <div className="history-card">
      <div className="tab-wrapper">
        <span className={`tab ${tabTextColor[tab]}`}>{tabText[tab]}</span>
      </div>
      <div className="content">
        <div className="label boosters-label">Boosters</div>
        <div className="boosters">
          <div className="booster">
            <div className="character-info">
              <TankIcon className="role active-role" />
              <span className="warrior">Mathew</span> - Deathwing
            </div>
            <HordeIcon className="faction horde" />
          </div>
          <div className="booster">
            <div className="character-info">
              <HealerIcon className="role active-role" />
              <span className="druid">Drulu</span> - Deathwing
            </div>
            <HordeIcon className="faction horde" />
          </div>
          <div className="booster">
            <div className="character-info">
              <DpsIcon className="role active-role" />
              <span className="evoker">Kärsomendrak</span> - Defias Brotherhood
            </div>
            <AllianceIcon className="faction alliance" />
          </div>
          <div className="booster">
            <div className="character-info">
              <DpsIcon className="role active-role" />
              <span className="demon-hunter">Trallin</span> - Deathwing
            </div>
            <HordeIcon className="faction horde" />
          </div>
        </div>
        <div className="dungeon-info">
          <div className="dungeons">
            <span className="label">Dungeon Info</span>
            <KeyBanner
              dungeon="SBG"
              level={14}
              inTime={true}
              iconColor="active"
            />
            <KeyBanner dungeon="AA" level={12} inTime={true} />
            <KeyBanner dungeon="RLP" level={10} />
          </div>
          <div className="loot-specs">
            <span className="label">Loot Spec</span>
            <div className="loot-specs-container">
              <div className="spec">
                <DpsIcon className="role" />
                Arms
              </div>
              <div className="spec">
                <DpsIcon className="role" />
                Fury
              </div>
              <div className="spec">
                <TankIcon className="role" />
                Protection
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="footer">
        <Button text="Mark as completed" color="green" />
        <div className="cut">
          <span>186,386</span>
        </div>
        <div className="pot">
          <span>1,182,172</span>
          <div className={`paid-button${paid ? " active-bg" : ""}`}>$</div>
        </div>
      </div>
    </div>
  );
};

export default History;
