import { HourglassEmptyOutlined } from "@mui/icons-material";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  onSnapshot,
  query,
  runTransaction,
  where
} from "firebase/firestore";
import { ref } from "firebase/storage";
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
  const [selectedRoles, setSelectedRoles] = React.useState("")

  async function joinListing(uid) {
    const postRef = doc(db, "mplus-listings", uid);
    
    await runTransaction(db, async (transaction) => {
      const post = await transaction.get(postRef);
      
      if (!post.exists()) {
        console.log("post does not exist");
      }

      const postData = post.data();
      
      if (postData.paid) {
        console.log("paid = false");
        transaction.update(postRef, { paid: false });
      } else {
        console.log("post was already set to false");
      }
    });
  }

  const setCharacters = (characters) => {
    setSelectedRoles("");
    setCharacter(characters);
  }

  const toggleSelectedRoles = (role) => {
    setSelectedRoles((prev) => {
      if (prev.includes(role)) {
        return prev.filter((r) => r !== role);
      } else {
        return [...prev, role];
      }
    });
  } 

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
      console.log(fetchedTeam);
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
        const potentialCharacters = Object.keys(characters).filter((char) => {
          Object.values(listing.rolesToFind).forEach((classes) => {
            if (classes.includes(characters[char].class)) {
              return true;
            }
          });
          return false;
        });

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
              {listing.note && 
                <div className="note">
                  Note: {listing.note}
                </div>
              }
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
                <Select 
                  items={teams}
                  onSelected={setTeam} 
                />
                <RadioButton
                  ticked={radio === "team"}
                  onClick={(ticked) => setRadio("team")}
                />
              </div>
            </div>
            <div className="footer">
              <Button text="Join" color="active" clickHandler={() => joinListing(listing.id)}/>
              <div className="key-button">
                <HourglassEmptyOutlined className="icon active" />
              </div>
              {characters[character[0]] && radio === "character" && 
              <div className="roles">
                {
                  characters[character[0]].roles.map((role) => {
                    let classNames = "role";
                    if (selectedRoles.includes(role)) {
                      classNames += " active-role"
                    }
                  
                    switch(role) {
                      case "tank":
                        return <TankIcon className={classNames} key={role} onClick={() => toggleSelectedRoles("tank")}/>
                      case "healer":
                        return <HealerIcon className={classNames} key={role} onClick={() => toggleSelectedRoles("healer")}/>
                      case "dps":
                        return <DpsIcon className={classNames} key={role} onClick={() => toggleSelectedRoles("dps")}/>
                      default:
                        return null
                    }
                  })
                }
              </div>}
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
