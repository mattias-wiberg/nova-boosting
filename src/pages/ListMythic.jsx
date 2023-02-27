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
import { ReactComponent as HordeIcon } from "../img/icons/horde.svg";
import { ReactComponent as AllianceIcon } from "../img/icons/alliance.svg";
import "../style/css/pages/listMythic.scss";
import Checkbox from "../components/Checkbox";

const List = () => {
  const shortNames = false;
  const [keys, setKeys] = useState([]);
  const [note, setNote] = useState("");
  const [pot, setPot] = useState(0);
  const [paid, setPaid] = useState(false);
  const [faction, setFaction] = useState("alliance");

  const removeKey = (e) => {
    e.preventDefault();
  };

  const [activeTab, setActiveTab] = React.useState("gear");

  const classes = {
    druid: {
      tank: {
        recommended: false,
        ticked: true,
      },
      healer: {
        recommended: true,
        ticked: true,
      },
      dps: {
        recommended: true,
        first: {
          ticked: true,
        },
        second: {
          ticked: true,
        },
      },
    },
    paladin: {
      tank: {
        recommended: false,
        ticked: true,
      },
      healer: {
        recommended: true,
        ticked: true,
      },
      dps: {
        recommended: false,
        first: {
          ticked: false,
        },
        second: {
          ticked: false,
        },
      },
    },
    monk: {
      tank: {
        recommended: false,
        ticked: true,
      },
      healer: {
        recommended: true,
        ticked: true,
      },
      dps: {
        recommended: false,
        first: {
          ticked: false,
        },
        second: {
          ticked: false,
        },
      },
    },
    evoker: {
      healer: {
        recommended: true,
        ticked: true,
      },
      dps: {
        recommended: true,
        first: {
          ticked: true,
        },
        second: {
          ticked: true,
        },
      },
    },
    priest: {
      healer: {
        recommended: true,
        ticked: true,
      },
      dps: {
        recommended: true,
        first: {
          ticked: true,
        },
        second: {
          ticked: true,
        },
      },
    },
    shaman: {
      healer: {
        recommended: true,
        ticked: true,
      },
      dps: {
        recommended: true,
        first: {
          ticked: true,
        },
        second: {
          ticked: true,
        },
      },
    },
    mage: {
      dps: {
        recommended: true,
        first: {
          ticked: true,
        },
        second: {
          ticked: true,
        },
      },
    },
    rogue: {
      dps: {
        recommended: false,
        first: {
          ticked: false,
        },
        second: {
          ticked: false,
        },
      },
    },
    hunter: {
      dps: {
        recommended: false,
        first: {
          ticked: false,
        },
        second: {
          ticked: false,
        },
      },
    },
    warlock: {
      dps: {
        recommended: true,
        first: {
          ticked: true,
        },
        second: {
          ticked: true,
        },
      },
    },
    "death-knight": {
      tank: {
        recommended: false,
        ticked: true,
      },
      dps: {
        recommended: false,
        first: {
          ticked: false,
        },
        second: {
          ticked: false,
        },
      },
    },
    "demon-hunter": {
      tank: {
        recommended: false,
        ticked: true,
      },
      dps: {
        recommended: false,
        first: {
          ticked: false,
        },
        second: {
          ticked: false,
        },
      },
    },
    warrior: {
      tank: {
        recommended: false,
        ticked: true,
      },
      dps: {
        recommended: false,
        first: {
          ticked: false,
        },
        second: {
          ticked: false,
        },
      },
    },
  };

  console.log(classes);

  return (
    <div className="list-mythic">
      <span className="title">M+ Boost Listing</span>
      <div className="key-input-wrapper">
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
          <Key level="14" dungeon={"AA"} inTime={false} />
        </div>
      </div>
      <div className="gear-part-wrapper">
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
            <div className="class-wrapper">
              <div className="class-container">
                <div className="note">
                  <span className="label">Recommended picks</span>
                  <div className="recommended-dark"></div>
                </div>
                <div className="class-content">
                  <div className="roles">
                    <TankIcon className="role active-role" />
                    <HealerIcon className="role active-role" />
                    <DpsIcon className="role" />
                    <DpsIcon className="role" />
                  </div>
                  <div className="class-rows">
                    {Object.keys(classes).map((key) => (
                      <div className="class-row" key={key}>
                        <div className="checks">
                          {classes[key].tank ? (
                            <Checkbox
                              recommended={
                                classes[key].tank.recommended ? "0010" : "0000"
                              }
                              color={key}
                              defaultValue={classes[key].tank.ticked}
                            />
                          ) : (
                            <div className="empty-check"></div>
                          )}
                          {classes[key].healer ? (
                            <Checkbox
                              recommended={
                                classes[key].healer.recommended
                                  ? "0010"
                                  : "0000"
                              }
                              color={key}
                              defaultValue={classes[key].healer.ticked}
                            />
                          ) : (
                            <div className="empty-check"></div>
                          )}
                          {classes[key].dps ? (
                            <Checkbox
                              recommended={
                                classes[key].dps.recommended ? "0010" : "0000"
                              }
                              color={key}
                              defaultValue={classes[key].dps.first.ticked}
                            />
                          ) : (
                            <div className="empty-check"></div>
                          )}
                          {classes[key].dps ? (
                            <Checkbox
                              recommended={
                                classes[key].dps.recommended ? "0010" : "0000"
                              }
                              color={key}
                              defaultValue={classes[key].dps.second.ticked}
                            />
                          ) : (
                            <div className="empty-check"></div>
                          )}
                        </div>
                        <span className={`class-label ${key}`}>
                          {key.replace("-", " ")}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
      <div className="footer-inputs">
        <textarea
          cols="30"
          rows="3"
          placeholder="Type your note here..."
        ></textarea>
        <div className="footer">
          <input
            type="text"
            className="realm-input"
            placeholder="Buyer's Realm"
          />
          <div className="factions">
            <HordeIcon
              className={`faction${faction === "horde" ? " horde" : ""}`}
              onClick={() => setFaction("horde")}
            />
            <AllianceIcon
              className={`faction${faction === "alliance" ? " alliance" : ""}`}
              onClick={() => setFaction("alliance")}
            />
          </div>
          <div className="pot">
            <input type="number" placeholder="Amount" />
            <div
              className={`paid-button${paid ? " active-bg" : ""}`}
              onClick={() => setPaid(!paid)}
            >
              $
            </div>
          </div>
        </div>
        <Button text="Create Listing" color="green" className="create-button" />
      </div>
    </div>
  );
};

export default List;
