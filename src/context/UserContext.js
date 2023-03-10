import { onAuthStateChanged } from "firebase/auth";
import {
  arrayRemove,
  arrayUnion,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import { createContext, useEffect, useState } from "react";
import { auth, db } from "../firebase";
import { getCharacter } from "../js/utilities";

export const UserContext = createContext();

export const UserContextProvider = ({ children }) => {
  const [user, setUser] = useState({});
  const [characters, setCharacters] = useState([]);

  const addCharacter = async (setError, characterText) => {
    console.log("Add character");
    const character = await getCharacter(setError, characterText);
    // Check if character is valid
    if (character === undefined) {
      return;
    }
    // Update user with new character
    try {
      // Update user context
      setUser((prevUser) => {
        return {
          ...prevUser,
          character_priority: [...prevUser.character_priority, character.id],
        };
      });
      // Update characters context
      setCharacters((prevCharacters) => {
        return {
          ...prevCharacters,
          [character.id]: character,
        };
      });

      // Update user in firestore
      const userRef = doc(db, "users", user.uid);
      await updateDoc(userRef, {
        character_priority: arrayUnion(character.id),
      });
      // Add character in firestore
      await setDoc(doc(db, "users", user.uid, "characters", character.id), {
        ...character,
      });
    } catch (err) {
      setError(err.message);
    }
  };

  const removeCharacter = async (cid, setError) => {
    console.log("Remove character with id:", cid);

    // Remove character from user
    try {
      // Update user context
      setUser((prevUser) => {
        return {
          ...prevUser,
          character_priority: prevUser.character_priority.filter(
            (id) => id !== cid
          ),
        };
      });
      // Update characters context
      setCharacters((prevCharacters) => {
        const newCharacters = { ...prevCharacters };
        delete newCharacters[cid];
        return newCharacters;
      });

      // Update user in firestore
      const userRef = doc(db, "users", user.uid);
      await updateDoc(userRef, {
        character_priority: arrayRemove(cid),
      });
      // Remove character in firestore
      await deleteDoc(doc(db, "users", user.uid, "characters", cid));
    } catch (err) {
      setError(err.message);
    }
  };

  const setMain = async (cid, setError) => {
    console.log("Change main to character with id:", cid);
    // Update user with new character
    try {
      // Update user context
      setUser((prevUser) => {
        return {
          ...prevUser,
          main_character: cid,
        };
      });
      // Update user in firestore
      const userRef = doc(db, "users", user.uid);
      await updateDoc(userRef, {
        main_character: cid,
      });
    } catch (err) {
      setError(err.message);
    }
  };

  const setRolePriority = async (cid, role, priority, setError) => {
    console.log("Change priority for role:", role, "to:", priority);
    const newRoles = [...characters[cid].roles];
    newRoles[newRoles.indexOf(role)] = newRoles[priority];
    newRoles[priority] = role;

    // Swap the positions of the characters roles so role is at index of priority
    try {
      // Update characters context
      setCharacters((prevCharacters) => {
        return {
          ...prevCharacters,
          [cid]: {
            ...prevCharacters[cid],
            roles: newRoles,
          },
        };
      });
      // Update characters in firestore
      const characterRef = doc(db, "users", user.uid, "characters", cid);
      await updateDoc(characterRef, {
        roles: newRoles,
      });
    } catch (err) {
      setError(err.message);
    }
  };

  const setCharacterPriority = async (cid, priority, setError) => {
    console.log("Change priority for character with id:", cid, "to:", priority);
    const newPriority = [...user.character_priority];
    newPriority[newPriority.indexOf(cid)] = newPriority[priority];
    newPriority[priority] = cid;

    // Swap the positions of the characters roles so role is at index of priority
    try {
      // Update user context
      setUser((prevUser) => {
        return {
          ...prevUser,
          character_priority: newPriority,
        };
      });
      // Update user in firestore
      const userRef = doc(db, "users", user.uid);
      await updateDoc(userRef, {
        character_priority: newPriority,
      });
    } catch (err) {
      setError(err.message);
    }
  };

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in and has just signed up.
        // get user data from firestore
        const fetchUser = async () => {
          const characters = await getDocs(
            collection(db, "users", user.uid, "characters")
          );
          var characterData = {};
          characters.forEach((doc) => {
            characterData = { ...characterData, [doc.id]: doc.data() };
          });
          setCharacters(characterData);

          const docSnap = await getDoc(doc(db, "users", user.uid));
          setUser(docSnap.data());
        };
        fetchUser();
        console.log("Fetched user data");
      } else {
        setUser({});
      }
    });

    return () => {
      unsub();
    };
  }, []);

  return (
    <UserContext.Provider
      value={{
        user,
        characters,
        removeCharacter,
        addCharacter,
        setMain,
        setRolePriority,
        setCharacterPriority,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
