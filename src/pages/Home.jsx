import React, { useContext, useEffect } from "react";
import { AuthContext } from "../context/AuthContext";
import data from "../data/data.json";

const Home = () => {
  const { currentUser } = useContext(AuthContext);

  useEffect(() => {
    Object.values(data).map(
      (x) =>
        x.items.map(
          (y) => Object.keys(y.classes).length === 0 && console.log(y)
        ) // Check for items without classes
    );
  }, []);
  return (
    <div className="home">
      <div className="page"></div>
    </div>
  );
};

export default Home;
