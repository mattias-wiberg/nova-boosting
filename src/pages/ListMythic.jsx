import React, { useState } from "react";
import Gold from "../img/gold.jpg";
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";
import HourglassEmptyIcon from "@mui/icons-material/HourglassEmpty";
import AddIcon from "@mui/icons-material/Add";
import Key from "../components/Key";
import Select from "../components/Select";
import Button from "../components/Button";
import "../style/css/pages/listMythic.scss";

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

  // TODO: Add way to require possible item drop.
  // gather data from wowhead to know what classes can get what drops
  // https://www.wowhead.com/items/armor/trinkets?filter=220;6932;0
  /*<div className="m-listing">
        <input type="number" defaultValue={0} />
        <select defaultValue={"*"}>
          {Object.keys(mythicPlusDungeons).map((key) => (
            <option key={key} value={key}>
              {shortNames ? key : mythicPlusDungeons[key]}
            </option>
          ))}
          <option value="ANY">*</option>
        </select>
        <button>
          <AddIcon />
        </button>
      </div>
      <div className="keys">
        <KeyLi closeHandler={removeKey} />
      </div>
      <textarea
        cols="40"
        rows="3"
        placeholder="Type your note here..."
      ></textarea>
      <div className="paid">
        <input type="number" />

        <button onClick={() => setPaid(!paid)}>
          <img src={Gold} alt="Gold" />
          {paid ? (
            <CheckIcon className="mark green" />
          ) : (
            <CloseIcon className="mark red" />
          )}
        </button>
      </div>
    </div> */
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
            <Key level="14" name="Shadowmoon Burial Grounds" inTime={true} />
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
    </div>
  );
};

export default List;
