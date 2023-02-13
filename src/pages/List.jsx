import React, { useState } from "react";
import Gold from "../img/gold.jpg";
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";
import AddIcon from "@mui/icons-material/Add";
import KeyLi from "../components/KeyLi";

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
  return (
    <div className="mListFormContainer">
      <div className="keyInput">
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
    </div>
  );
};

export default List;
