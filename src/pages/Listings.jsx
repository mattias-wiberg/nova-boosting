import Button from "../components/Button";
import React from "react";
import KeyBanner from "../components/KeyBanner";
import RadioButton from "../components/RadioButton";
import Select from "../components/Select";
import "../style/css/pages/listings.scss";
import { HourglassEmptyOutlined } from "@mui/icons-material";
import { ReactComponent as TankIcon } from "../img/icons/tank.svg";
import { ReactComponent as HealerIcon } from "../img/icons/healer.svg";
import { ReactComponent as DpsIcon } from "../img/icons/dps.svg";

const Listings = ({ paid = true }) => {
  return (
    <div className="listing-card">
      <KeyBanner
        dungeon="SBG"
        level={14}
        inTime={true}
        iconColor="active"
        className="first-key"
      />
      <KeyBanner dungeon="AA" level={12} inTime={true} />
      <KeyBanner dungeon="RLP" level={10} inTime={false} />
      <div className="content">
        <div className="selection">
          <Select />
          <RadioButton />
        </div>
        <div className="selection">
          <Select />
          <RadioButton ticked={true} />
        </div>
      </div>
      <div className="footer">
        <Button text="Join" color="active" />
        <div className="key-button">
          <HourglassEmptyOutlined className="icon active" />
        </div>
        <div className="roles">
          <TankIcon className="role active-role" />
          <HealerIcon className="role" />
          <DpsIcon className="role" />
        </div>
        <div className="pot">
          <span>1,182,172</span>
          <div className={`paid-button${paid ? " active-bg" : ""}`}>$</div>
        </div>
      </div>
    </div>
  );
};

export default Listings;
