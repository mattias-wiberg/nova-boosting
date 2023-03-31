import Button from "../components/Button";
import React, { useEffect, useContext } from "react";
import KeyBanner from "../components/KeyBanner";
import RadioButton from "../components/RadioButton";
import Select from "../components/Select";
import "../style/css/pages/listings.scss";
import { HourglassEmptyOutlined } from "@mui/icons-material";
import { ReactComponent as TankIcon } from "../img/icons/tank.svg";
import { ReactComponent as HealerIcon } from "../img/icons/healer.svg";
import { ReactComponent as DpsIcon } from "../img/icons/dps.svg";
import { UserContext } from "../context/UserContext";
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
import { db } from "../firebase";
import { ref } from "firebase/storage";

const Listings = () => {
  const [listings, setListings] = React.useState([]);
  const [teams, setTeams] = React.useState({});
  const [radio, setRadio] = React.useState("character"); // character or team
  const { user, characters } = useContext(UserContext);

  function togglePaid(uid = "d18c8c38-5e09-4234-9776-714854da928c") {
    const postRef = ref(db, `/mplus-listings/${uid}`);

    runTransaction(postRef, (post) => {
      if (post) {
        if (post.paid) {
          console.log("paid = false");
          post.paid = false;
        } else {
          console.log("post was already set to false");
        }
      }
      return post;
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
        listings.push(doc.data());
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
              {listing.note}
              <div className="selection">
                <Select
                  items={characters}
                  defaultSelected={[Object.keys(characters)[0]]}
                  type="character"
                />
                <RadioButton
                  ticked={radio === "character"}
                  onClick={(ticked) => setRadio("character")}
                />
              </div>
              <div className="selection">
                <Select items={teams} />
                <RadioButton
                  ticked={radio === "team"}
                  onClick={(ticked) => setRadio("team")}
                />
              </div>
            </div>
            <div className="footer">
              <Button text="Join" color="active" />
              <div className="key-button">
                <HourglassEmptyOutlined className="icon active" />
              </div>
              <div className="roles">
                <TankIcon className="role active-role" />
                <HealerIcon className="role" />
                <DpsIcon className="role" />
              </div>
              <div className="pot" onClick={togglePaid}>
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
