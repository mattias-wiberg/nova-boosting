import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import Button from "../components/Button";
import "../style/css/pages/auth.scss";

const Login = () => {
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    const email = e.target[0].value;
    const password = e.target[1].value;

    try {
      await signInWithEmailAndPassword(auth, email, password);
      // TODO add wrong password error
      navigate("/");
    } catch (err) {
      setError(err.message);
    }
  };

  const submit = () => {
    document.forms[0].submit();
  };

  return (
    <div className="formContainer">
      <span className="title">Login</span>
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="E-mail" />
        <input type="password" placeholder="Password" />
        <Button
          text={"Login"}
          clickHandler={submit}
          color="active"
          className="submit"
        ></Button>
      </form>
      {error && <span>Something went wrong</span>}
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
