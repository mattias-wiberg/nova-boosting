import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import Button from "../components/Button";
import "../style/css/pages/auth.scss";

const Login = () => {
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const login = async () => {
    const email = document.getElementById("mail").value;
    const password = document.getElementById("password").value;

    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="formContainer">
      <span className="title">Login</span>
      <div className="error-box">
        {error !== "" && (
          <>
            <span className="red">Error: </span> {" " + error}
          </>
        )}
      </div>
      <form>
        <input type="text" placeholder="E-mail" id="mail" />
        <input type="password" placeholder="Password" id="password" />
        <Button
          text={"Login"}
          clickHandler={login}
          color="active"
          className="submit"
        ></Button>
      </form>
      <p className="footerText">
        Don't have an account?{" "}
        <Link to="/register" className="link">
          Register Here
        </Link>
      </p>
    </div>
  );
};

export default Login;
