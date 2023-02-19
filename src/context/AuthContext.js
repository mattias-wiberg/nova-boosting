import { onAuthStateChanged } from "firebase/auth";
import { createContext, useEffect, useState } from "react";
import { auth } from "../firebase";

export const AuthContext = createContext()

export const AuthContextProvider = ({ children }) => {
    // Dummy user for ui testing
    const [currentUser, setCurrentUser] = useState({
        id: "0f517174-785d-41a9-8564-86403871f122",
        name: "Mattias",
        characters: [
            {
                id: "3a0e5818-29be-495a-b105-9cbe6fe22935",
                name: "Mathew",
                realm: "Deathwing",
                roles: ["tank", "dps"],
                class: "warrior",
                ratings: [2565, 0, 2565], // According to roles order, last is overall
                rating_colors: ["#ba3ed4", "#ffffff", "#ba3ed4"]
            }, {
                id: "97ad4380-25b8-45a2-8da2-f7c33d2a05dd",
                name: "Drulu",
                realm: "Deathwing",
                roles: ["tank", "healer", "dps"],
                class: "druid",
                ratings: [204, 2746, 2429, 2755], // According to roles order, last is overall
                rating_colors: ["#ffffff", "#d44daa", "#a335ee", "#d44daa"]
            }, {
                id: "c7748748-3dae-4925-8716-cb66b7e5e15c",
                name: "Thrallin",
                realm: "Deathwing",
                roles: ["tank", "dps"],
                armor: "leather",
                class: "demon-hunter",
                ratings: [0, 1403, 1403],
                rating_colors: ["#ffffff", "#5eab9e", "#5eab9e"]
            }],
        main_character: "97ad4380-25b8-45a2-8da2-f7c33d2a05dd",
        teams: [
            "7a9c3c6d-c804-420a-9d34-75f6821c319e",
        ]
    })
    // TODO: Remove this default value later

    useEffect(() => {
        const unsub = onAuthStateChanged(auth, (user) => {
            //setCurrentUser(user) // TODO: Uncomment this line when adding auth
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