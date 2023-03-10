import React, { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../firebase.js";
import {
  collection,
  doc,
  getDocs,
  query,
  setDoc,
  where,
} from "firebase/firestore";
import { Link, useNavigate } from "react-router-dom";
import Button from "../components/Button";
import "../style/css/pages/auth.scss";
import { getCharacter } from "../js/utilities.js";

const Register = () => {
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async () => {
    const name = document.getElementById("name").value.toLowerCase();
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const confPassword = document.getElementById("conf-password").value;
    const character = await getCharacter(setError);
    //console.log(character);
    //console.log(name, email, password, confPassword);

    // Check if character is valid
    if (character === undefined) {
      return;
    }
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

    // Check if username is already taken
    const userDoc = await getDocs(
      query(collection(db, "users"), where("name", "==", name))
    );
    if (!userDoc.empty) {
      setError("Username is already taken");
      return;
    }

    // Create user
    try {
      const res = await createUserWithEmailAndPassword(auth, email, password);
      await setDoc(doc(db, "users", res.user.uid), {
        uid: res.user.uid,
        name: name,
        characters: [character],
        main_character: character.id,
        character_priority: [character.id],
        teams: [],
      });
      navigate("/");
    } catch (err) {
      setError(err.message);
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
      <form onSubmit={handleSubmit} autoComplete="on">
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
