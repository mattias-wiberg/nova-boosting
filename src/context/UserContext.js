import { onAuthStateChanged } from "firebase/auth";
import {
  arrayRemove,
  arrayUnion,
  doc,
  getDoc,
  updateDoc,
} from "firebase/firestore";
import { createContext, useEffect, useState } from "react";
import { auth, db } from "../firebase";
import { getCharacter } from "../js/utilities";

export const UserContext = createContext();

export const UserContextProvider = ({ children }) => {
  const [user, setUser] = useState({});

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
          characters: [...prevUser.characters, character],
          character_priority: [...prevUser.character_priority, character.id],
        };
      });
      // Update user in firestore
      const userRef = doc(db, "users", user.uid);
      await updateDoc(userRef, {
        characters: arrayUnion(character),
        character_priority: arrayUnion(character.id),
      });
    } catch (err) {
      setError(err.message);
    }
  };

  const removeCharacter = async (character, setError) => {
    console.log("Remove character with id:", character.id);

    // Remove character from user
    try {
      // Update user context
      setUser((prevUser) => {
        return {
          ...prevUser,
          characters: prevUser.characters.filter((c) => c.id !== character.id),
          character_priority: prevUser.character_priority.filter(
            (c) => c.id !== character.id
          ),
        };
      });
      // Update user in firestore
      const userRef = doc(db, "users", user.uid);
      await updateDoc(userRef, {
        characters: arrayRemove(character),
        character_priority: arrayRemove(character.id),
      });
    } catch (err) {
      setError(err.message);
    }
  };

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in or has just signed up.
        // get user data from firestore
        const fetchUser = async () => {
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
    <UserContext.Provider value={{ user, removeCharacter, addCharacter }}>
      {children}
    </UserContext.Provider>
  );
};
