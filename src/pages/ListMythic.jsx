import React, { useState } from "react";
import Gold from "../img/gold.jpg";
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";
import HourglassEmptyIcon from "@mui/icons-material/HourglassEmpty";
import AddIcon from "@mui/icons-material/Add";
import Key from "../components/Key";
import Select from "../components/Select";
import Button from "../components/Button";
import { ReactComponent as TankIcon } from "../img/icons/tank.svg";
import { ReactComponent as HealerIcon } from "../img/icons/healer.svg";
import { ReactComponent as DpsIcon } from "../img/icons/dps.svg";
import "../style/css/pages/listMythic.scss";
import Checkbox from "../components/Checkbox";

const List = () => {
  const shortNames = false;
  const [keys, setKeys] = useState([]);
  const [note, setNote] = useState("");
  const [pot, setPot] = useState(0);
  const [paid, setPaid] = useState(false);

  const mythicPlusDungeons = {
    AA: "Algeth'ar Academy",
    CoS: "Court of Stars",
    HoV: "Halls of Valor",
    RLP: "Ruby Life Pools",
    SBG: "Shadowmoon Burial Grounds",
    TJS: "Temple of the Jade Serpent",
    AV: "The Azure Vault",
    NO: "The Nokhud Offensive",
  };

  const removeKey = (e) => {
    e.preventDefault();
  };

  const [activeTab, setActiveTab] = React.useState("gear");

  return (
    <div className="list-mythic">
      <span className="title">M+ Boost Listing</span>
      <div className="key-labels">
        <span className="plus">+</span>
        <span className="dungeon">Dungeon</span>
      </div>
      <div className="key-input">
        <input type="number" defaultValue={0} className="key-input" />
        <Select className="select-dungeon" />
        <Button
          button_icon={<AddIcon fontSize="inherit" />}
          className="add-button"
        />
      </div>
      <div className="keys">
        <div className="key-container">
          <div className="key-content">
            <Key level="14" name="Shadowmoon Burial Grounds" inTime={false} />
            <div className="bottom">
              <button>
                <HourglassEmptyIcon fontSize="inherit" className="icon" />
              </button>
              <Select className="item-select" />
            </div>
          </div>
          <Button color="red" button_icon={<CloseIcon fontSize="inherit" />} />
        </div>
      </div>
      <div className="tabs">
        <div
          className={activeTab === "gear" ? "tab active-tab" : "tab"}
          onClick={() => setActiveTab("gear")}
        >
          Gear Type / Premade
        </div>
        <div
          className={activeTab === "class" ? "tab active-tab" : "tab"}
          onClick={() => setActiveTab("class")}
        >
          Class Specific
        </div>
      </div>
      <div className="checkbox-content">
        {activeTab === "gear" ? (
          <div className="gear">
            <div className="check-rows">
              <div className="check-row">
                <TankIcon className="role active-role" />
                <Checkbox recommended="0000" color="druid" />
                <Checkbox recommended="0000" color="warrior" />
                <div className="empty-check"></div>
                <div className="empty-check"></div>
                <input type="text" />
              </div>
              <div className="check-row">
                <HealerIcon className="role active-role" />
                <Checkbox recommended="0000" color="druid" />
                <div className="empty-check"></div>
                <Checkbox recommended="0000" color="priest" />
                <Checkbox recommended="0000" color="shaman" />
                <input type="text" />
              </div>
              <div className="check-row">
                <DpsIcon className="role" />
                <Checkbox
                  defaultValue={false}
                  recommended="0000"
                  color="druid"
                />
                <Checkbox
                  defaultValue={false}
                  recommended="0000"
                  color="warrior"
                />
                <Checkbox recommended="0000" color="priest" />
                <Checkbox recommended="0000" tickType="semi" color="shaman" />
                <input type="text" />
              </div>
              <div className="check-row">
                <DpsIcon className="role" />
                <Checkbox
                  defaultValue={false}
                  recommended="0000"
                  color="druid"
                />
                <Checkbox
                  defaultValue={false}
                  recommended="0000"
                  color="warrior"
                />
                <Checkbox recommended="0000" color="priest" />
                <Checkbox recommended="0000" tickType="semi" color="shaman" />
                <input type="text" />
              </div>
            </div>

            <div className="type-labels">
              <div className="left-labels">
                <span className="armor-label">Leather</span>
                <span className="armor-label">Plate</span>
                <span className="armor-label">Cloth</span>
                <span className="armor-label">Mail</span>
              </div>
              <div className="label">Name-Realm</div>
            </div>
          </div>
        ) : (
          <div className="class">
            <div className="roles">
              <TankIcon className="role" />
              <HealerIcon className="role" />
              <DpsIcon className="role" />
              <DpsIcon className="role" />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default List;
