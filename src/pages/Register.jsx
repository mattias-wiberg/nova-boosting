import React, { useState } from "react";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth, db, storage } from "../firebase.js";
import { ref } from "firebase/storage";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { Link, useNavigate } from "react-router-dom";
import { v4 as uuid } from "uuid";
import Button from "../components/Button";
import "../style/css/pages/auth.scss";

const Register = () => {
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const armorMapping = {
    "death-knight": "plate",
    warrior: "plate",
    paladin: "plate",
    hunter: "mail",
    shaman: "mail",
    evoker: "mail",
    priest: "cloth",
    warlock: "cloth",
    mage: "cloth",
    "demon-hunter": "leather",
    rogue: "leather",
    monk: "leather",
    druid: "leather",
  };

  const roleMapping = {
    "death-knight": ["tank", "dps"],
    warrior: ["tank", "dps"],
    paladin: ["tank", "healer", "dps"],
    hunter: ["dps"],
    shaman: ["healer", "dps"],
    evoker: ["healer", "dps"],
    priest: ["healer", "dps"],
    warlock: ["dps"],
    mage: ["dps"],
    "demon-hunter": ["tank", "dps"],
    rogue: ["dps"],
    monk: ["tank", "healer", "dps"],
    druid: ["tank", "healer", "dps"],
  };

  const getCharacter = async () => {
    const region = "eu";
    const character = document.getElementById("character").value.split("-");

    if (character.length !== 2) {
      if (character.length === 1) {
        setError(
          "Please enter a character name and realm with the following format Name-Realm"
        );
      } else {
        setError("Please enter a valid character name and realm");
      }
      document.getElementById("character").value = "";
      return;
    }

    const name = character[0].trim();
    const realm = character[1].trim();
    if (realm === "") {
      setError(
        "Please enter the realm name of the character using the format Name-Realm"
      );
      return;
    }
    const url = `https://raider.io/api/v1/characters/profile?region=${region}&realm=${realm}&name=${name}&fields=mythic_plus_scores_by_season%3Acurrent`;

    try {
      const res = await fetch(url);
      const data = await res.json();
      setError("");

      const characterClass = data.class.toLowerCase().replace(" ", "-");
      // UUID for character
      data.id = uuid();
      data.armor = armorMapping[characterClass];
      data.roles = roleMapping[characterClass];
      return data;
    } catch (err) {
      setError(
        'Could not find character "' + name + '" on realm "' + realm + '"'
      );
      return;
    }
  };

  const handleSubmit = async () => {
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const confPassword = document.getElementById("conf-password").value;
    const character = await getCharacter();
    console.log(character);
    console.log(name, email, password, confPassword);

    // Check if all fields are filled in
    if (name === "") {
      setError("Please enter a username");
      return;
    }
    if (email === "") {
      setError("Please enter an email");
      return;
    }
    if (password === "") {
      setError("Please enter a password");
      return;
    }
    if (confPassword === "") {
      setError("Please confirm your password");
      return;
    }
    // Check if passwords match
    if (password !== confPassword) {
      setError("Passwords do not match");
      return;
    }
    // Check if character is valid
    if (character === undefined) {
      return;
    }

    // Check if username is already taken
    const userRef = doc(db, "users", name);
    const userDoc = await getDoc(userRef);
    if (userDoc.exists()) {
      setError("Username is already taken");
      return;
    }

    // Create user
    try {
      const res = await createUserWithEmailAndPassword(auth, email, password);
      await setDoc(doc(db, "users", res.user.uid), {
        uid: res.user.uid,
        displayName: name,
        characters: [character],
        main_character: character.id,
        teams: [],
      });
      navigate("/");
    } catch (err) {
      setError(err.message);
    }

    try {
      //const res = await createUserWithEmailAndPassword(auth, email, password);
      /*await setDoc(doc(db, "users", res.user.uid), {
        uid: res.user.uid,
        displayName: name,
        email: email,
      });

      navigate("/");*/
      /*await updateProfile(res.user, {
              displayName: name,
              photoURL: downloadURL,
            });*/
    } catch (err) {
      setError(true);
    }
  };

  return (
    <div className="formContainer">
      <span className="title">Register</span>
      <div className="error-box">
        {error !== "" && (
          <>
            <span className="red">Error: </span> {" " + error}
          </>
        )}
      </div>
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="Username" id="name" required />
        <input type="text" placeholder="E-mail" id="email" required />
        <input type="password" placeholder="Password" id="password" required />
        <input
          type="password"
          placeholder="Confirm Password"
          id="conf-password"
          required
        />
        <input type="text" placeholder="Name-Realm" id="character" />
        <Button
          text={"Register"}
          clickHandler={handleSubmit}
          color="active"
          className="submit"
        ></Button>
      </form>
      <p className="footerText">
        Already have an account?{" "}
        <Link to="/login" className="link">
          Login here
        </Link>
      </p>
    </div>
  );
};

export default Register;
