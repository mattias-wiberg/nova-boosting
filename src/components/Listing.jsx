import React, { useContext } from "react";
import {
  doc,
  getDoc,
  runTransaction,
  setDoc,
  serverTimestamp,
} from "firebase/firestore";
import { db } from "../firebase";
import { UserContext } from "../context/UserContext";

import Button from "../components/Button";
import KeyBanner from "../components/KeyBanner";
import RadioButton from "../components/RadioButton";
import Select from "../components/Select";

import { HourglassEmptyOutlined } from "@mui/icons-material";
import { ReactComponent as DpsIcon } from "../img/icons/dps.svg";
import { ReactComponent as HealerIcon } from "../img/icons/healer.svg";
import { ReactComponent as TankIcon } from "../img/icons/tank.svg";

// TODO: Change teams to potentialTeams similar to potentialCharacters but considering all members in the team
const Listing = ({ listing, potentialCharacters, teams }) => {
  const { characters } = useContext(UserContext);
  const [selectedRoles, setSelectedRoles] = React.useState([]);
  const [character, setCharacter] = React.useState([]);
  const [team, setTeam] = React.useState([]);
  const [radio, setRadio] = React.useState("character"); // character or team

  async function joinListing() {
    if (selectedRoles.length === 0) {
      alert("Please select a role!");
      return;
    }

    const postRef = doc(db, "mplus-listings", listing.id);
    // Add character to applicants collection
    await setDoc(
      doc(db, "mplus-listings", listing.id, "applicants", character[0]),
      {
        id: character[0],
        roles: selectedRoles,
        created: serverTimestamp(),
      }
    );

    let lastRole = "";
    let rolesToTry = [];
    for (const role of selectedRoles) {
      if (role === "dps") {
        rolesToTry.push("dps_1");
        rolesToTry.push("dps_2");
      }
      rolesToTry.push(role);
    }

    await runTransaction(db, async (transaction) => {
      const post = await transaction.get(postRef);

      if (!post.exists()) {
        return Promise.reject("post does not exist");
      }

      const postData = post.data();

      while (rolesToTry.length > 0) {
        const role = rolesToTry.pop();

        if (postData.boosters[role] === "") {
          console.log("Trying role:", role);
          lastRole = role;
          // Add character to role
          transaction.update(postRef, {
            [`boosters.${role}`]: character[0],
          });
          break;
        }
      }
    });

    const docSnap = await getDoc(postRef);
    if (docSnap.exists()) {
      // if last tried role is empty, then the transaction was successful
      if (docSnap.data().boosters[lastRole] === character[0]) {
        console.log("SUCCESS: Transaction successfully committed!");
      } else {
        console.log(docSnap.data());
        console.log("FAILURE: Did not get any role!");
      }
    } else {
      // doc.data() will be undefined in this case
      console.log("ERROR: Could not find mythic plus posting!");
    }
  }

  const setCharacters = (characters) => {
    setSelectedRoles("");
    setCharacter(characters);
  };

  const toggleSelectedRoles = (role) => {
    setSelectedRoles((prev) => {
      if (prev.includes(role)) {
        return prev.filter((r) => r !== role);
      }
      return [...prev, role];
    });
    console.log("Selected roles:", selectedRoles);
  };

  return (
    <div className="listing-card">
      {listing.keys.map((key, i) => {
        return (
          <KeyBanner
            dungeon={key.id}
            level={key.level}
            inTime={key.inTime}
            iconColor={key.needKey ? "active" : ""}
            className={i === 0 ? "first-key" : ""}
            key={i}
          />
        );
      })}
      <div className="content">
        {listing.note && <div className="note">Note: {listing.note}</div>}
        <div className="selection">
          <Select
            items={potentialCharacters}
            onSelected={setCharacters}
            type="character"
          />
          <RadioButton
            ticked={radio === "character"}
            onClick={(ticked) => setRadio("character")}
          />
        </div>
        <div className="selection">
          <Select items={teams} onSelected={setTeam} />
          <RadioButton
            ticked={radio === "team"}
            onClick={(ticked) => setRadio("team")}
          />
        </div>
      </div>
      <div className="footer">
        <Button text="Join" color="active" clickHandler={joinListing} />
        <div className="key-button">
          <HourglassEmptyOutlined className="icon active" />
        </div>
        {characters[character[0]] && radio === "character" && (
          <div className="roles">
            {characters[character[0]].roles.map((role) => {
              let classNames = "role";
              if (selectedRoles.includes(role)) {
                classNames += " active-role";
              }

              switch (role) {
                case "tank":
                  return (
                    <TankIcon
                      className={classNames}
                      key={role}
                      onClick={() => toggleSelectedRoles("tank")}
                    />
                  );
                case "healer":
                  return (
                    <HealerIcon
                      className={classNames}
                      key={role}
                      onClick={() => toggleSelectedRoles("healer")}
                    />
                  );
                case "dps":
                  return (
                    <DpsIcon
                      className={classNames}
                      key={role}
                      onClick={() => toggleSelectedRoles("dps")}
                    />
                  );
                default:
                  return null;
              }
            })}
          </div>
        )}
        <div className="pot">
          <span>{listing.pot}</span>
          <div className={`paid-button${listing.paid ? " active-bg" : ""}`}>
            $
          </div>
        </div>
      </div>
    </div>
  );
};

export default Listing;
