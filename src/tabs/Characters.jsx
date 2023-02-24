import React from "react";
import Button from "../components/Button";
import "../style/style.scss";
import "../style/css/tabs/characters.scss";
import EditIcon from "@mui/icons-material/Edit";
import CloseIcon from "@mui/icons-material/Close";
import CheckIcon from "@mui/icons-material/Check";
import AddIcon from "@mui/icons-material/Add";
import { ReactComponent as CrownIcon } from "../img/icons/crown.svg";
import { ReactComponent as AllianceIcon } from "../img/icons/alliance.svg";
import { ReactComponent as HordeIcon } from "../img/icons/horde.svg";
import { ReactComponent as TankIcon } from "../img/icons/tank.svg";
import { ReactComponent as HealerIcon } from "../img/icons/healer.svg";
import { ReactComponent as DpsIcon } from "../img/icons/dps.svg";

const Characters = () => {
  const [mode, setMode] = React.useState("view"); // view, edit
  const [invalidEdit, setInvalidEdit] = React.useState(false);
  const faction = "alliance";

  return (
    <div className="characters-container">
      <div className="header">
        <div className="labels">
          <span>Name</span>
          <span>Realm</span>
        </div>
        <div className="mode-button">
          {mode === "view" && (
            <Button
              color="active"
              button_icon={<EditIcon fontSize="inherit" />}
              clickHandler={() => setMode("edit")}
            />
          )}
          {mode === "edit" && !invalidEdit && (
            <Button
              color="green"
              button_icon={<CheckIcon fontSize="inherit" />}
              clickHandler={() => setMode("view")}
            />
          )}
          {mode === "edit" && invalidEdit && (
            <Button
              color="red"
              button_icon={<CloseIcon fontSize="inherit" />}
              clickHandler={() => setMode("view")}
            />
          )}
        </div>
      </div>
      <div className="characters">
        <div className="character">
          <div className="character-prio">
            <button className="prio prio-1 prio-locked"></button>
            {mode === "edit" && <button className="prio prio-2-dark"></button>}
          </div>
          <CrownIcon className="main" />
          <div className="info">
            <span className="name">Drulu</span>
            <span className="realm">Deathwing</span>
            <div className="score">
              <div className="role-prio">
                {mode === "edit" && (
                  <button className="prio prio-1-dark"></button>
                )}
                {mode === "edit" && (
                  <button className="prio prio-2-dark"></button>
                )}
                <button className="prio prio-3 prio-locked"></button>
              </div>
              <span className="value" style={{ color: "#ffffff" }}>
                204
              </span>
            </div>
            <div className="score">
              <div className="role-prio">
                {mode === "edit" && (
                  <button className="prio prio-1-dark"></button>
                )}
                <button className="prio prio-2 prio-locked"></button>
                {mode === "edit" && (
                  <button className="prio prio-3-dark"></button>
                )}
              </div>
              <span className="value" style={{ color: "#D74FA5" }}>
                2746
              </span>
            </div>
            <div className="score">
              <div className="role-prio">
                <button className="prio prio-1 prio-locked"></button>
                {mode === "edit" && (
                  <button className="prio prio-2-dark"></button>
                )}
                {mode === "edit" && (
                  <button className="prio prio-3-dark"></button>
                )}
              </div>
              <span className="value" style={{ color: "#A837E9" }}>
                2429
              </span>
            </div>
            <div className="faction">
              {faction === "alliance" && mode === "view" && (
                <AllianceIcon className="alliance" />
              )}
              {faction === "horde" && mode === "view" && (
                <HordeIcon className="horde" />
              )}
              {mode === "edit" && <CloseIcon className="delete" />}
            </div>
          </div>
        </div>
      </div>
      <div className="add-character">
        <div className="inputs">
          <Button
            color="green"
            button_icon={<AddIcon fontSize="inherit" />}
            className="add-button"
          />
          <input type="text" placeholder="Name" className="name" />
          <input type="text" placeholder="Realm" className="realm" />
        </div>
        <div className="roles">
          <TankIcon className="role" />
          <HealerIcon className="role" />
          <DpsIcon className="role" />
        </div>
      </div>
      <div className="prio-list">
        <span className="label">Prio</span>
        <div className="prio-item">
          <span className="number">1</span>
          <div className="prio prio-1 prio-locked"></div>
        </div>
        <div className="prio-item">
          <span className="number">2</span>
          <div className="prio prio-2 prio-locked"></div>
        </div>
        <div className="prio-item">
          <span className="number">3</span>
          <div className="prio prio-3 prio-locked"></div>
        </div>
      </div>
    </div>
  );
};

export default Characters;
