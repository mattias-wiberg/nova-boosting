import "../style/css/tabs/teams.scss";

import React, { useContext, useEffect } from "react";

import Button from "../components/Button";
import Select from "../components/Select";
import Team from "../components/Team";

import AddIcon from "@mui/icons-material/Add";

import { AuthContext } from "../context/AuthContext";
import { UserContext } from "../context/UserContext";
import {
  arrayUnion,
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  setDoc,
  where,
} from "firebase/firestore";
import { auth, db } from "../firebase";
import { v4 as uuid } from "uuid";

const Teams = () => {
  const { userAuth } = useContext(AuthContext);
  const { user, characters, addTeam } = useContext(UserContext);
  const [error, setError] = React.useState("");
  const [teams, setTeams] = React.useState({});
  const [newTeamCharacter, setNewTeamCharacters] = React.useState([]);

  useEffect(() => {
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
    };

    fetchTeams();

    return () => {
      setTeams({});
    };
  }, [user]);

  console.log(teams);

  const handleAddTeam = async () => {
    const teamName = document.getElementById("team-name").value;
    const teamId = uuid();

    if (teamName === "") {
      setError("Team name cannot be empty");
      return;
    }

    if (newTeamCharacter.length === 0) {
      setError("You must select a character to be the leader of the team.");
      return;
    }

    console.log(teamName, newTeamCharacter, teamId);
    // Check if team name is taken
    const q = query(collection(db, "teams"), where("name", "==", teamName));
    const team = await getDocs(q);
    if (team.size > 0) {
      setError("Team name is already taken");
      return;
    }

    // Get character info
    const characterDoc = await getDoc(
      doc(db, "users", userAuth.uid, "characters", newTeamCharacter[0])
    );
    console.log(characterDoc.data());

    // Add team to teams collection
    await setDoc(doc(db, "teams", teamId), {
      id: teamId,
      name: teamName,
      leader: userAuth.uid,
    });
    // Add user to team members
    await setDoc(doc(db, "teams", teamId, "members", userAuth.uid), {
      id: userAuth.uid,
    });
    // Add characters to member
    await setDoc(
      doc(
        db,
        "teams",
        teamId,
        "members",
        userAuth.uid,
        "characters",
        characterDoc.id
      ),
      {
        id: characterDoc.id,
        roles: characterDoc.data().roles,
      }
    );
    // Add team to user and context
    addTeam(teamId, setError);

    document.getElementById("team-name").value = "";
    console.log("Team added");
  };

  return (
    <div className="teams">
      <div className="error-box">
        <div className="error-box">
          {error !== "" && (
            <>
              <span className="red">Error: </span> {" " + error}
            </>
          )}
        </div>
      </div>
      <div className="teams-container">
        {Object.values(teams).length > 0 &&
          Object.values(teams)?.map((team) => (
            <Team team={team} key={team.id} setError={setError} />
          ))}
      </div>
      {Object.entries(characters).length > 0 && (
        <div className="new-team-container">
          <input
            type="text"
            placeholder="Team name"
            className="team-name"
            id="team-name"
          />
          <Select
            className="select"
            items={characters}
            type="character"
            onSelected={setNewTeamCharacters}
          />
          <Button
            color="green"
            button_icon={<AddIcon fontSize="inherit" />}
            className="add"
            clickHandler={handleAddTeam}
          />
        </div>
      )}
    </div>
  );
};

export default Teams;
