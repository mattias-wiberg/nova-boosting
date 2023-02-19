import React, { useContext, useState } from "react";
import Button from "./Button";
import RemoveIcon from "@mui/icons-material/Remove";
import CloseIcon from "@mui/icons-material/Close";
import EditIcon from "@mui/icons-material/Edit";
import AddIcon from "@mui/icons-material/Add";

import "../style/style.scss";
import "../style/css/components/team.scss";
import { ReactComponent as CrownIcon } from "../img/icons/crown.svg";
import { ReactComponent as DpsIcon } from "../img/icons/dps.svg";
import { ReactComponent as HealerIcon } from "../img/icons/healer.svg";
import { ReactComponent as TankIcon } from "../img/icons/tank.svg";
import Select from "./Select";
import { AuthContext } from "../context/AuthContext";

const TeamMate = ({ character }) => {
  return (
    <div className="team-mate">
      <div className="text">
        <span className={character.class}>{character.name}</span>
        {" - "}
        {character.realm}
      </div>
      <div className="icons">
        <div className="roles">
          {character.roles.map((r) => {
            switch (r) {
              case "tank":
                return (
                  <TankIcon
                    className="role"
                    key={character.name + character.realm + r}
                  />
                );
              case "healer":
                return (
                  <HealerIcon
                    className="role"
                    key={character.name + character.realm + r}
                  />
                );
              case "dps":
                return (
                  <DpsIcon
                    className="role"
                    key={character.name + character.realm + r}
                  />
                );
              default:
                return null;
            }
          })}
        </div>
        <div className="cross">
          <CloseIcon fontSize="inherit" />
        </div>
      </div>
    </div>
  );
};

const Team = () => {
  const [editing, setEditing] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const { currentUser } = useContext(AuthContext);
  const leader = true;

  const expand = (e) => {
    //console.log("expand");
    setExpanded(!expanded);
  };

  return (
    <div className="team-container">
      <div className={"team-head " + (expanded && "expanded")}>
        <Button
          color="red"
          button_icon={<RemoveIcon fontSize="inherit" />}
          className="remove-button"
        />
        <Button
          color="active"
          type="hold"
          button_icon={<EditIcon fontSize="inherit" />}
          className="edit-button"
        />
        <Select
          clickHandler={expand}
          expanded={expanded}
          selection="Faze Clan"
          label="3/4"
        />
      </div>
      {expanded && (
        <div className="dropdown">
          <div className="dropdown-content">
            <div className="rows">
              <div className="row">
                <div className="user">
                  <div className="crown">
                    {leader ? (
                      <CrownIcon className="leader" />
                    ) : (
                      <CrownIcon className="edit" />
                    )}
                  </div>
                  <span className="name">You</span>
                </div>
                <div className="characters">
                  {currentUser.characters.map((c) => {
                    return (
                      <TeamMate
                        character={c}
                        key={currentUser.name + c.name + c.realm}
                      />
                    );
                  })}
                </div>
              </div>
            </div>
            <div className="add-panel">
              <input
                type="text"
                placeholder="Username"
                className="input username"
              />
              <div className="right">
                <input
                  type="text"
                  placeholder="Name - Realm"
                  className="input character"
                />
                <div className="buttons">
                  <div className="roles">
                    <TankIcon className="role" />
                    <HealerIcon className="role" />
                    <DpsIcon className="role" />
                  </div>
                  <Button
                    color="green"
                    button_icon={<AddIcon fontSize="inherit" />}
                    className="add"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Team;
