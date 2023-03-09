import { onAuthStateChanged } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { createContext, useContext, useEffect, useState } from "react";
import { auth, db } from "../firebase";

export const UserContext = createContext();

export const UserContextProvider = ({ children }) => {
  const [user, setUser] = useState({});

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
      } else {
        setUser({});
      }
    });

    return () => {
      unsub();
    };
  }, []);

  return (
    <UserContext.Provider value={{ user }}>{children}</UserContext.Provider>
  );
};
