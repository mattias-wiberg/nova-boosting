import React, { useContext, useEffect } from "react";
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
import { AuthContext } from "../context/AuthContext";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase";

const Characters = () => {
  const [mode, setMode] = React.useState("view"); // view, edit
  const [invalidEdit, setInvalidEdit] = React.useState(false);
  const faction = "alliance";
  const { userAuth } = useContext(AuthContext);
  const [userInfo, setUserInfo] = React.useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      const docSnap = await getDoc(doc(db, "users", userAuth.uid));
      setUserInfo(docSnap.data());
    };

    fetchUser();
    return () => {
      setUserInfo(null);
    };
  }, [setUserInfo, userAuth.uid]);

  console.log(userInfo);
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
        {userInfo?.characters.map((character) => (
          <div className="character" key={character.id}>
            <div className="character-prio">
              <button className="prio prio-1 prio-locked"></button>
              {mode === "edit" && (
                <button className="prio prio-2-dark"></button>
              )}
            </div>
            <CrownIcon className="main" />
            <div className="info">
              <span className={`name ${character.class.toLowerCase()}`}>
                {character.name}
              </span>
              <span className="realm">{character.realm}</span>
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
                <span
                  className="value"
                  style={{
                    color:
                      character.mythic_plus_scores_by_season[0].segments.tank
                        .color,
                  }}
                >
                  {Math.round(
                    character.mythic_plus_scores_by_season[0].segments.tank
                      .score
                  )}
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
                <span
                  className="value"
                  style={{
                    color:
                      character.mythic_plus_scores_by_season[0].segments.healer
                        .color,
                  }}
                >
                  {Math.round(
                    character.mythic_plus_scores_by_season[0].segments.healer
                      .score
                  )}
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
                <span
                  className="value"
                  style={{
                    color:
                      character.mythic_plus_scores_by_season[0].segments.dps
                        .color,
                  }}
                >
                  {Math.round(
                    character.mythic_plus_scores_by_season[0].segments.dps.score
                  )}
                </span>
              </div>
              <div className="faction">
                {character.faction === "alliance" && mode === "view" && (
                  <AllianceIcon className="alliance" />
                )}
                {character.faction === "horde" && mode === "view" && (
                  <HordeIcon className="horde" />
                )}
                {mode === "edit" && <CloseIcon className="delete" />}
              </div>
            </div>
          </div>
        ))}
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
