import React, { useContext, useEffect, useState } from "react";
import Button from "./Button";
import RemoveIcon from "@mui/icons-material/Remove";
import CloseIcon from "@mui/icons-material/Close";
import EditIcon from "@mui/icons-material/Edit";
import AddIcon from "@mui/icons-material/Add";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";

import "../style/style.scss";
import "../style/css/components/team.scss";
import { ReactComponent as CrownIcon } from "../img/icons/crown.svg";
import { ReactComponent as DpsIcon } from "../img/icons/dps.svg";
import { ReactComponent as HealerIcon } from "../img/icons/healer.svg";
import { ReactComponent as TankIcon } from "../img/icons/tank.svg";
import { AuthContext } from "../context/AuthContext";
import {
  arrayRemove,
  arrayUnion,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  query,
  setDoc,
  updateDoc,
  where,
} from "firebase/firestore";
import { db } from "../firebase";
import { UserContext } from "../context/UserContext";

const Team = ({ team, setError, setTeams }) => {
  const [editing, setEditing] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const [teamMembers, setTeamMembers] = useState({});
  const { removeTeam } = useContext(UserContext);
  const { userAuth } = useContext(AuthContext);

  // Colors for each member of the team that is not you
  const memberColors = ["red", "blue", "green"];

  // Inputs
  const [username, setUsername] = useState("");
  const [character, setCharacter] = useState("");

  const addCharacter = async (e) => {
    e.preventDefault();
    if (username === "" || character === "") {
      setError("Please fill in all fields");
      return;
    }

    function extractNameAndRealm(input) {
      const regex = /^(\w+)\s*-\s*(\w[\w\s-]+\w)$/;
      const match = input.match(regex);

      if (match) {
        const name = match[1].charAt(0).toUpperCase() + match[1].slice(1);
        const realmWords = match[2].split(/\s|-/).map((word) => {
          return word.charAt(0).toUpperCase() + word.slice(1);
        });
        const realm = realmWords.join(" ");
        return [name, realm];
      }

      return null;
    }

    const [characterName, characterRealm] = extractNameAndRealm(character);
    if (characterName === "" || characterRealm === "") {
      setError("Invalid character name");
      return;
    }

    // Get user info from firestore
    const userQuery = query(
      collection(db, "users"),
      where("name", "==", username)
    );
    const userSnapshot = await getDocs(userQuery);
    if (userSnapshot.empty) {
      setError('User "' + username + '" not found');
      return;
    } else if (userSnapshot.size > 1) {
      setError('Multiple users with name "' + username + '" found');
      return;
    }
    userSnapshot.forEach(async (userDoc) => {
      const userInfo = userDoc.data();
      const characterQuery = query(
        collection(db, "users", userInfo.uid, "characters"),
        where("name", "==", characterName),
        where("realm", "==", characterRealm)
      );

      const characterSnapshot = await getDocs(characterQuery);
      if (characterSnapshot.empty) {
        setError(
          'Character "' +
            characterName +
            " - " +
            characterRealm +
            '" not found for user "' +
            username +
            '"'
        );
        return;
      }
      if (characterSnapshot.size > 1) {
        setError(
          'Multiple characters with name "' +
            characterName +
            " - " +
            characterRealm +
            '" found for user "' +
            username +
            '"'
        );
        return;
      }

      characterSnapshot.forEach(async (characterDoc) => {
        const characterInfo = characterDoc.data();
        // Check if character is already in team
        if (
          teamMembers[userInfo.uid] &&
          teamMembers[userInfo.uid].characters[character.id]
        ) {
          setError(
            'Character "' +
              characterName +
              " - " +
              characterRealm +
              '" is already in team "' +
              team.name +
              '"'
          );
          return;
        }

        if (!team.members[userInfo.uid]) {
          // If user does not exist in team
          // Add team member to team in firestore
          await setDoc(doc(db, "teams", team.id, "members", userInfo.uid), {
            id: userInfo.uid,
          });
        }

        // Add character to team members in state
        setTeamMembers((prev) => {
          if (prev[userInfo.uid]) {
            // If user already exists in state
            return {
              ...prev,
              [userInfo.uid]: {
                ...prev[userInfo.uid],
                characters: {
                  ...prev[userInfo.uid].characters,
                  [characterInfo.id]: {
                    ...characterInfo,
                    activeRoles: characterInfo.roles,
                  },
                }, // Have all possible roles as active as standard
              },
            };
          } else {
            return {
              ...prev,
              [userInfo.uid]: {
                id: userInfo.uid,
                name: username,
                characters: {
                  [characterInfo.id]: {
                    ...characterInfo,
                    activeRoles: characterInfo.roles,
                  },
                }, // Have all possible roles as active as standard
              },
            };
          }
        });

        // Add character to team member in firestore
        await setDoc(
          doc(
            db,
            "teams",
            team.id,
            "members",
            userInfo.uid,
            "characters",
            characterInfo.id
          ),
          {
            id: characterInfo.id,
            roles: characterInfo.roles,
          }
        );
        // Add team to user in firestore
        await updateDoc(doc(db, "users", userInfo.uid), {
          teams: arrayUnion(team.id),
        });

        setError("");
        setUsername("");
        setCharacter("");
        //console.log("Character Info", characterInfo);
      });
    });
  };

  const removeCharacter = async (userId, characterId) => {
    // Check if it is the last character in the team for the member
    if (Object.keys(teamMembers[userId].characters).length === 1) {
      // Remove team from user in firestore
      await updateDoc(doc(db, "users", userId), {
        teams: arrayRemove(team.id),
      });
      // Remove character from team in firestore
      await deleteDoc(
        doc(db, "teams", team.id, "members", userId, "characters", characterId)
      );
      // Remove member from team in firestore
      await deleteDoc(doc(db, "teams", team.id, "members", userId));
      // Remove member from team in state
      setTeamMembers((prev) => {
        const newTeamMembers = { ...prev };
        delete newTeamMembers[userId];
        return newTeamMembers;
      });
    } else {
      // Remove character from team in firestore
      await deleteDoc(
        doc(db, "teams", team.id, "members", userId, "characters", characterId)
      );
      // Remove character from team in state
      setTeamMembers((prev) => {
        const newTeamMembers = { ...prev };
        delete newTeamMembers[userId].characters[characterId];
        return newTeamMembers;
      });
    }
  };

  const toggleRole = (userId, characterId, role) => {
    if (
      !teamMembers[userId].characters[characterId].activeRoles.includes(role)
    ) {
      // Add role to character in firestore
      updateDoc(
        doc(db, "teams", team.id, "members", userId, "characters", characterId),
        {
          roles: arrayUnion(role),
        }
      );
    } else {
      // Remove role from character in firestore
      updateDoc(
        doc(db, "teams", team.id, "members", userId, "characters", characterId),
        {
          roles: arrayRemove(role),
        }
      );
    }
    setTeamMembers((prev) => {
      return {
        ...prev,
        [userId]: {
          ...prev[userId],
          characters: {
            ...prev[userId].characters,
            [characterId]: {
              ...prev[userId].characters[characterId],
              activeRoles: prev[userId].characters[
                characterId
              ].activeRoles.includes(role)
                ? prev[userId].characters[characterId].activeRoles.filter(
                    (activeRole) => activeRole !== role
                  )
                : [...prev[userId].characters[characterId].activeRoles, role],
            },
          },
        },
      };
    });
  };

  const changeLeader = (userId) => {
    setEditing(false);
    setTeams((prev) => {
      return {
        ...prev,
        [team.id]: {
          ...prev[team.id],
          leader: userId,
        },
      };
    });
    updateDoc(doc(db, "teams", team.id), {
      leader: userId,
    });
  };

  console.log("Team Members", teamMembers);

  useEffect(() => {
    const fetchTeamMembersCharacters = async () => {
      const teamMembers = {};
      // Fetch team members
      Object.values(team.members).forEach(async (member) => {
        teamMembers[member.id] = { id: member.id, characters: {} };
        try {
          // Fetch user
          await getDoc(doc(db, "users", member.id)).then(async (userDoc) => {
            const userInfo = userDoc.data();
            // Merge with member info
            teamMembers[member.id].name = userInfo.name;

            // Fetch characters
            await getDocs(
              query(
                collection(
                  db,
                  "teams",
                  team.id,
                  "members",
                  member.id,
                  "characters"
                )
              )
            ).then(async (charactersSnapshot) => {
              charactersSnapshot.forEach(async (characterSnapshot) => {
                await getDoc(
                  doc(
                    db,
                    "users",
                    member.id,
                    "characters",
                    characterSnapshot.id
                  )
                ).then((characterDoc) => {
                  const characterInfo = characterDoc.data();
                  characterInfo.activeRoles = characterSnapshot.data().roles;
                  teamMembers[member.id].characters[characterInfo.id] =
                    characterInfo;
                });
              });
            });
          });
        } catch (error) {
          setError(error.message);
        }
      });

      setTeamMembers(teamMembers);
    };
    fetchTeamMembersCharacters();
  }, [team.id, team.members, setError]);

  const handleDeleteTeam = async (teamId) => {
    try {
      // Delete team document
      await deleteDoc(doc(db, "teams", teamId));

      // Delete all members of the team
      const membersQuery = query(collection(db, "teams", teamId, "members"));
      const membersDocs = await getDocs(membersQuery);
      membersDocs.forEach(async (memberDoc) => {
        // Delete all characters of the team
        const charactersQuery = query(
          collection(db, "teams", teamId, "members", memberDoc.id, "characters")
        );
        const charactersDocs = await getDocs(charactersQuery);
        charactersDocs.forEach(async (characterDoc) => {
          await deleteDoc(characterDoc.ref);
        });
        // Delete team from members
        await updateDoc(doc(db, "users", memberDoc.id), {
          teams: arrayRemove(teamId),
        });
        await deleteDoc(memberDoc.ref);
      });

      // Delete team from user and context
      removeTeam(teamId, setError);
    } catch (error) {
      setError(error.message);
    }
  };

  const expand = (e) => {
    //console.log("expand");
    setExpanded(!expanded);
  };

  return (
    <div className="team-container">
      {}
      <div className={"team-head " + (expanded && "expanded")}>
        {userAuth.uid === team.leader && (
          <Button
            color="red"
            button_icon={<RemoveIcon fontSize="inherit" />}
            className="remove-button"
            clickHandler={() => handleDeleteTeam(team.id)}
          />
        )}
        {userAuth.uid === team.leader && (
          <Button
            color="active"
            type="hold"
            button_icon={<EditIcon fontSize="inherit" />}
            className="edit-button"
            clickHandler={() => setEditing(!editing)}
          />
        )}
        <div className="select" onClick={expand}>
          <div className="left">
            <span className="selected">{team.name}</span>
          </div>
          <div className="right">
            <span className="label">{Object.values(teamMembers).length}/4</span>
            <div className="arrow">
              {expanded ? (
                <ExpandLessIcon fontSize="inherit" />
              ) : (
                <ExpandMoreIcon fontSize="inherit" />
              )}
            </div>
          </div>
        </div>
      </div>
      {expanded && (
        <div className="dropdown">
          <div className="dropdown-content">
            <div className="rows">
              {Object.values(teamMembers)
                .sort((a, b) => (b.name < a.name ? 1 : 0))
                .map((member, i) => {
                  return (
                    <div className="row" key={member.id}>
                      <div className="user">
                        <div className="crown">
                          {member.id === team.leader ? (
                            <CrownIcon className="leader" />
                          ) : editing ? (
                            <CrownIcon
                              className="edit"
                              onClick={() => changeLeader(member.id)}
                            />
                          ) : null}
                        </div>
                        <span
                          className={
                            "name " +
                            (member.id === team.leader
                              ? "active"
                              : memberColors[i])
                          }
                        >
                          {member.name}
                        </span>
                      </div>
                      <div
                        className={
                          "characters " +
                          (member.id === team.leader
                            ? "active-blc"
                            : memberColors[i] + "-blc")
                        }
                      >
                        {Object.values(member.characters).map((character) => {
                          return (
                            <div className="team-mate" key={character.id}>
                              <div className="text">
                                <span
                                  className={character.class
                                    .toLowerCase()
                                    .replace(" ", "-")}
                                >
                                  {character.name}
                                </span>
                                {" - "}
                                {character.realm}
                              </div>
                              <div className="icons">
                                <div className="roles">
                                  {editing
                                    ? character.roles.sort().map((r) => {
                                        switch (r) {
                                          case "tank":
                                            return (
                                              <TankIcon
                                                className={
                                                  "role" +
                                                  (character.activeRoles.includes(
                                                    r
                                                  )
                                                    ? " active"
                                                    : "")
                                                }
                                                onClick={() =>
                                                  toggleRole(
                                                    member.id,
                                                    character.id,
                                                    r
                                                  )
                                                }
                                                key={r}
                                              />
                                            );
                                          case "healer":
                                            return (
                                              <HealerIcon
                                                className={
                                                  "role" +
                                                  (character.activeRoles.includes(
                                                    r
                                                  )
                                                    ? " active"
                                                    : "")
                                                }
                                                onClick={() =>
                                                  toggleRole(
                                                    member.id,
                                                    character.id,
                                                    r
                                                  )
                                                }
                                                key={r}
                                              />
                                            );
                                          case "dps":
                                            return (
                                              <DpsIcon
                                                className={
                                                  "role" +
                                                  (character.activeRoles.includes(
                                                    r
                                                  )
                                                    ? " active"
                                                    : "")
                                                }
                                                onClick={() =>
                                                  toggleRole(
                                                    member.id,
                                                    character.id,
                                                    r
                                                  )
                                                }
                                                key={r}
                                              />
                                            );
                                          default:
                                            return null;
                                        }
                                      })
                                    : character.activeRoles.sort().map((r) => {
                                        switch (r) {
                                          case "tank":
                                            return (
                                              <TankIcon
                                                className="role active inactive"
                                                key={r}
                                              />
                                            );
                                          case "healer":
                                            return (
                                              <HealerIcon
                                                className="role active inactive"
                                                key={r}
                                              />
                                            );
                                          case "dps":
                                            return (
                                              <DpsIcon
                                                className="role active inactive"
                                                key={r}
                                              />
                                            );
                                          default:
                                            return null;
                                        }
                                      })}
                                </div>
                                {userAuth.uid === team.leader && (
                                  <div className="cross">
                                    {editing &&
                                      (member.id !== team.leader ||
                                        Object.keys(member.characters).length >
                                          1) && (
                                        <CloseIcon
                                          fontSize="inherit"
                                          className="remove-character"
                                          onClick={() =>
                                            removeCharacter(
                                              member.id,
                                              character.id
                                            )
                                          }
                                        />
                                      )}
                                  </div>
                                )}
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  );
                })}
            </div>
            {userAuth.uid === team.leader && (
              <div className="add-panel">
                <input
                  type="text"
                  placeholder="Username"
                  className="input username"
                  value={username}
                  onChange={(e) => {
                    setUsername(e.target.value);
                  }}
                />
                <div className="right">
                  <input
                    type="text"
                    placeholder="Name - Realm"
                    className="input character"
                    value={character}
                    onChange={(e) => {
                      setCharacter(e.target.value);
                    }}
                  />
                  <div className="buttons">
                    <Button
                      color="green"
                      button_icon={<AddIcon fontSize="inherit" />}
                      className="add"
                      clickHandler={addCharacter}
                    />
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Team;
