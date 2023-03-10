import React, { useContext } from "react";
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
import { UserContext } from "../context/UserContext";
import { KeyboardArrowDown, KeyboardArrowUp } from "@mui/icons-material";

const Characters = () => {
  const [mode, setMode] = React.useState("view"); // view, edit
  const [error, setError] = React.useState(""); // [error, setError]
  const {
    user,
    characters,
    removeCharacter,
    addCharacter,
    setMain,
    setRolePriority,
    setCharacterPriority,
  } = useContext(UserContext);
  const roles = ["tank", "healer", "dps"];

  console.log(user);
  console.log(characters);

  const handleAddCharacter = () => {
    const name = document.getElementById("name").value;
    const realm = document.getElementById("realm").value;
    addCharacter(setError, name + "-" + realm);
    document.getElementById("name").value = "";
    document.getElementById("realm").value = "";
  };

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
          {mode === "edit" && (
            <Button
              color="green"
              button_icon={<CheckIcon fontSize="inherit" />}
              clickHandler={() => setMode("view")}
            />
          )}
        </div>
      </div>
      <div className="characters">
        {user.character_priority?.map((cid, i) => {
          const character = characters[cid];
          return (
            <div className="character" key={cid}>
              <div className="character-prio">
                {mode === "edit" &&
                  i === 0 &&
                  user.character_priority.length > 1 && (
                    <KeyboardArrowDown
                      className="arrow"
                      fontSize="inherit"
                      onClick={() => setCharacterPriority(cid, i + 1)}
                    />
                  )}
                {mode === "edit" &&
                  i === user.character_priority.length - 1 &&
                  user.character_priority.length > 1 && (
                    <KeyboardArrowUp
                      className="arrow"
                      fontSize="inherit"
                      onClick={() => setCharacterPriority(cid, i - 1)}
                    />
                  )}
                {mode === "edit" &&
                  i !== 0 &&
                  i !== user.character_priority.length - 1 && (
                    <div className="double_arrow">
                      <KeyboardArrowUp
                        fontSize="inherit"
                        className="arrow up"
                        onClick={() => setCharacterPriority(cid, i - 1)}
                      />
                      <KeyboardArrowDown
                        fontSize="inherit"
                        className="arrow down"
                        onClick={() => setCharacterPriority(cid, i + 1)}
                      />
                    </div>
                  )}
              </div>
              {cid === user.main_character && <CrownIcon className="main" />}
              {cid !== user.main_character && mode === "edit" && (
                <CrownIcon className="non-main" onClick={() => setMain(cid)} />
              )}
              <div className="info">
                <span
                  className={`name ${character.class
                    .toLowerCase()
                    .replace(" ", "-")}`}
                >
                  {character.name}
                </span>
                <span className="realm">{character.realm}</span>
                {roles.map((role) => (
                  <div className="score" key={role}>
                    <div className="role-prio">
                      {roles.map((prio_role, j) => {
                        if (
                          mode === "edit" &&
                          j < character.roles.length && // only show same amount of prio buttons as roles
                          character.roles.includes(role) && // only show prio buttons for roles that are available
                          character.roles.indexOf(role) !== j
                        ) {
                          return (
                            <button
                              key={prio_role}
                              className={`prio prio-${j + 1}-dark`}
                              onClick={() =>
                                setRolePriority(cid, role, j, setError)
                              }
                            ></button>
                          );
                        } else if (character.roles.indexOf(role) === j) {
                          return (
                            <button
                              key={prio_role}
                              className={`prio prio-${j + 1} prio-locked`}
                            ></button>
                          );
                        } else {
                          return null;
                        }
                      })}
                    </div>
                    <span
                      className="value"
                      style={
                        character.roles.includes(role)
                          ? {
                              color:
                                character.mythic_plus_scores_by_season[0]
                                  .segments[role].color,
                            }
                          : {}
                      }
                    >
                      {character.roles.includes(role)
                        ? Math.round(
                            character.mythic_plus_scores_by_season[0].segments[
                              role
                            ].score
                          )
                        : "-"}
                    </span>
                  </div>
                ))}
                <div className="faction">
                  {character.faction === "alliance" && mode === "view" && (
                    <AllianceIcon className="alliance" />
                  )}
                  {character.faction === "horde" && mode === "view" && (
                    <HordeIcon className="horde" />
                  )}
                  {mode === "edit" && cid !== user.main_character && (
                    <CloseIcon
                      className="delete"
                      onClick={() => removeCharacter(cid, setError)}
                    />
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
      <div className="add-character">
        <div className="inputs">
          <Button
            color="green"
            button_icon={<AddIcon fontSize="inherit" />}
            className="add-button"
            clickHandler={handleAddCharacter}
          />
          <input type="text" placeholder="Name" className="name" id="name" />
          <input type="text" placeholder="Realm" className="realm" id="realm" />
        </div>
        <div className="roles">
          <TankIcon className="role" />
          <HealerIcon className="role" />
          <DpsIcon className="role" />
        </div>
      </div>
      <div className="footer">
        <div className="error">
          {error && (
            <>
              <span className="red">Error</span>: {error}
            </>
          )}
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
    </div>
  );
};

export default Characters;
