import React, { useContext, useEffect } from "react";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  onSnapshot,
  query,
  where,
} from "firebase/firestore";
import { db } from "../firebase";
import { UserContext } from "../context/UserContext";

import Listing from "../components/Listing";
import "../style/css/pages/listings.scss";

const Listings = () => {
  const { user, characters } = useContext(UserContext);
  const [listings, setListings] = React.useState([]);
  const [teams, setTeams] = React.useState({});

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
        // Potential characters have to consider the following:
        // - Must be of class that some of the roles require
        // - If applying with key character must have a key that meets the requirements and is higher than the listing key

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

        // Potential teams have to consider the following:
        // - There must be a combination of characters between different users that can fill all the roles required by the listing
        // - This combination of characters have to meet the key requirements of the listing
        const potentialTeams = teams;

        return (
          <Listing
            listing={listing}
            potentialCharacters={potentialCharacters}
            teams={potentialTeams}
            key={listing.id}
          />
        );
      })}
    </div>
  );
};

export default Listings;
