import { onAuthStateChanged } from "firebase/auth";
import { createContext, useEffect, useState } from "react";
import { auth } from "../firebase";

export const AuthContext = createContext()

export const AuthContextProvider = ({ children }) => {
    // Dummy user for ui testing
    const [currentUser, setCurrentUser] = useState({})
    // TODO: Remove this default value later

    useEffect(() => {
        const unsub = onAuthStateChanged(auth, (user) => {
            setCurrentUser(user) // TODO: Uncomment this line when adding auth
        })

        return () => {
            unsub();
        }
    }, []);

    return (
        <AuthContext.Provider value={{ currentUser }}>
            {children}
        </AuthContext.Provider>
    );
}