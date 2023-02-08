import { signOut } from "firebase/auth";
import React, { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { auth } from "../firebase";

const Home = () => {
  const { currentUser } = useContext(AuthContext);

  return (
    <div className="home">
      <div className="container">
        Welcome {currentUser.displayName}!
        <button onClick={() => signOut(auth)}>Logout</button>
      </div>
    </div>
  );
};

export default Home;
