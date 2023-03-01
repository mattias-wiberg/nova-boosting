import React from "react";
import Button from "../components/Button";
import KeyBanner from "../components/KeyBanner";
import "../style/css/pages/listManager.scss";
import "../style/style.scss";
import { ReactComponent as TankIcon } from "../img/icons/tank.svg";
import { ReactComponent as HealerIcon } from "../img/icons/healer.svg";
import { ReactComponent as DpsIcon } from "../img/icons/dps.svg";
import { ReactComponent as HordeIcon } from "../img/icons/horde.svg";
import { ReactComponent as AllianceIcon } from "../img/icons/alliance.svg";
import { HourglassEmptyOutlined, KeyboardArrowDown } from "@mui/icons-material";

const ListManager = ({ paid = true }) => {
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
    <div className="detailed-list-card">
      <div className="tab-wrapper">
        <span className={`tab ${tabTextColor[tab]}`}>{tabText[tab]}</span>
      </div>
      <KeyBanner
        dungeon="SBG"
        level={14}
        inTime={true}
        iconColor="active"
        className="first-key"
      />
      <KeyBanner dungeon="AA" level={12} inTime={true} iconColor="blue" />
      <KeyBanner dungeon="RLP" level={10} inTime={false} iconColor="green" />
      <div className="content">
        <div className="applicants-labels">
          <div className="label first-label">Applications</div>
          <div className="last-labels">
            <div className="label">Roles</div>
            <div className="label">Since</div>
          </div>
        </div>
        <div className="applicants">
          <div className="applicant">
            <div className="character-info">
              <div className="pick active-bg"></div>
              <span className="evoker">Kärsomendrak</span> - Defias Brotherhood
            </div>
            <div className="right">
              <div className="roles">
                <HealerIcon className="role prio-2-role" />
                <DpsIcon className="role prio-1-role" />
              </div>
              <span>04:11</span>
            </div>
          </div>
          <div className="applicant">
            <div className="character-info">
              <div className="pick"></div>
              <span className="rogue">Chloride</span> - Frostmane
            </div>
            <div className="right">
              <div className="roles">
                <DpsIcon className="role prio-1-role" />
              </div>
              <span>04:11</span>
            </div>
          </div>
          <div className="applicant">
            <div className="character-info">
              <div className="pick"></div>
              <span className="death-knight">Drannach</span> - Frostmane
            </div>
            <div className="right">
              <div className="roles">
                <TankIcon className="role prio-1-role" />
                <DpsIcon className="role prio-2-role" />
              </div>
              <span>04:11</span>
            </div>
          </div>
          <div className="applicant">
            <div className="character-info">
              <div className="pick active-bg"></div>
              <span className="druid">Drulu</span> - Deathwing
            </div>
            <div className="right">
              <div className="roles">
                <TankIcon className="role prio-3-role" />
                <HealerIcon className="role prio-2-role" />
                <DpsIcon className="role prio-1-role" />
              </div>
              <span>04:11</span>
            </div>
          </div>
        </div>
        <div className="dropdown-container">
          <div className="dropdown-button">
            <KeyboardArrowDown className="arrow" />
          </div>
        </div>
        <div className="boosters-labels">
          <div className="label first-label">
            Boosters (Copy <span className="highlight">/invite</span>)
          </div>

          <div className="label">
            (Copy <span className="highlight">BATTLE.NET ID</span>)
          </div>
        </div>
        <div className="boosters">
          <div className="booster">
            <div className="character-info">
              <TankIcon className="role active-role" />
              <span className="warrior">Mathew</span> - Deathwing
            </div>
            <div className="right">
              <div className="key-container">
                <HourglassEmptyOutlined className="key active" />
              </div>
              <HordeIcon className="faction horde" />
            </div>
          </div>
          <div className="booster">
            <div className="character-info">
              <HealerIcon className="role active-role" />
              <span className="druid">Drulu</span> - Deathwing
            </div>
            <div className="right">
              <div className="key-container"></div>
              <HordeIcon className="faction horde" />
            </div>
          </div>
          <div className="booster">
            <div className="character-info">
              <DpsIcon className="role active-role" />
              <span className="evoker">Kärsomendrak</span> - Defias Brotherhood
            </div>
            <div className="right">
              <div className="key-container">
                <HourglassEmptyOutlined className="key blue" />
              </div>
              <AllianceIcon className="faction alliance" />
            </div>
          </div>
          <div className="booster">
            <div className="character-info">
              <DpsIcon className="role active-role" />
              <span className="demon-hunter">Trallin</span> - Deathwing
            </div>
            <div className="right">
              <div className="key-container">
                <HourglassEmptyOutlined className="key green" />
              </div>
              <HordeIcon className="faction horde" />
            </div>
          </div>
        </div>
      </div>
      <div className="footer">
        <Button text="Mark as completed" color="green" />
        <div className="cut">
          <HordeIcon className="faction horde" />
          <span>Blackrock</span>
        </div>
        <div className="pot">
          <span>1,182,172</span>
          <div className={`paid-button${paid ? " active-bg" : ""}`}>$</div>
        </div>
      </div>
    </div>
  );
};

export default ListManager;
