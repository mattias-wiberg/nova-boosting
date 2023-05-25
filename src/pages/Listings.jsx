import { HourglassEmptyOutlined } from "@mui/icons-material";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  onSnapshot,
  query,
  runTransaction,
  where,
} from "firebase/firestore";
import { list, ref } from "firebase/storage";
import React, { useContext, useEffect } from "react";
import Button from "../components/Button";
import KeyBanner from "../components/KeyBanner";
import RadioButton from "../components/RadioButton";
import Select from "../components/Select";
import { UserContext } from "../context/UserContext";
import { db } from "../firebase";
import { ReactComponent as DpsIcon } from "../img/icons/dps.svg";
import { ReactComponent as HealerIcon } from "../img/icons/healer.svg";
import { ReactComponent as TankIcon } from "../img/icons/tank.svg";
import "../style/css/pages/listings.scss";

const Listings = () => {
  const { user, characters } = useContext(UserContext);
  const [listings, setListings] = React.useState([]);
  const [teams, setTeams] = React.useState({});
  const [team, setTeam] = React.useState([]);
  const [character, setCharacter] = React.useState([]);
  const [radio, setRadio] = React.useState("character"); // character or team
  const [selectedRoles, setSelectedRoles] = React.useState([]);

  async function joinListing(uid) {
    if (selectedRoles.length === 0) {
      alert("Please select a role!");
      return;
    }

    const postRef = doc(db, "mplus-listings", uid);

    let tried_roles = [];
    await runTransaction(db, async (transaction) => {
      const post = await transaction.get(postRef);

      if (!post.exists()) {
        return Promise.reject("post does not exist");
      }

      const postData = post.data();

      for (const role of selectedRoles) {
        if (postData.boosters[role] === "" && !tried_roles.includes(role)) {
          console.log("Trying role:", role);
          tried_roles.push(role);
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
      if (
        docSnap.data().boosters[tried_roles[tried_roles.length - 1]] ===
        character[0]
      ) {
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
      } else {
        return [...prev, role];
      }
    });
    console.log("Selected roles:", selectedRoles);
  };

  useEffect(() => {
    const q = query(
      collection(db, "mplus-listings"),
      where("started", "==", false)
    );
    const unSub = onSnapshot(q, (querySnapshot) => {
      const listings = [];
      querySnapshot.forEach((doc) => {
        const listing = doc.data();
        listings.push(listing);
      });
      setListings(listings);
    });

    const fetchTeams = async () => {
      if (!user || !user.teams) {
        return;
      }
      const fetchedTeam = await Promise.all(
        user.teams.map(async (team) => {
          const teamDoc = await getDoc(doc(db, "teams", team));
          const teamInfo = teamDoc.data();
          const teamMembers = await getDocs(
            collection(db, "teams", team, "members")
          );
          const members = {};
          teamMembers.forEach((member) => {
            const memberInfo = member.data();
            members[memberInfo.id] = memberInfo;
          });
          return {
            [team]: {
              ...teamInfo,
              members,
            },
          };
        })
      ).then((teams) => Object.assign({}, ...teams));
      setTeams(fetchedTeam);
      //console.log(fetchedTeam);
    };
    fetchTeams();

    return () => {
      setTeams({});
      unSub();
    };
  }, [user]);

  return (
    <div className="listings">
      {listings.map((listing) => {
        console.log(characters);
        const potentialCharacters = Object.fromEntries(
          Object.entries(characters).filter((entry) => {
            //const cid = entry[0];
            const character = entry[1];
            const characterClass = character.class
              .toLowerCase()
              .replace(" ", "-");

            // Character must have at least one of the roles
            return Object.values(listing.rolesToFind).some((classes) =>
              classes.includes(characterClass)
            );
          })
        );
        console.log(potentialCharacters);

        return (
          <div className="listing-card" key={listing.id}>
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
              <Button
                text="Join"
                color="active"
                clickHandler={() => joinListing(listing.id)}
              />
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
                <div
                  className={`paid-button${listing.paid ? " active-bg" : ""}`}
                >
                  $
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Listings;
