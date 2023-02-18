import { signOut } from "firebase/auth";
import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { auth } from "../firebase";
import Navbar from "../components/Navbar";
import data from "../data/data.json";
import Teams from "./Teams";

const Home = () => {
  const { currentUser } = useContext(AuthContext);
  const [charInfo, setCharInfo] = useState(null);

  const region = "eu";
  const name = "Drulu";
  const realm = "Deathwing";

  useEffect(() => {
    const getScore = async (region, name, realm) => {
      const url = `https://raider.io/api/v1/characters/profile?region=${region}&realm=${realm}&name=${name}&fields=mythic_plus_scores_by_season%3Acurrent`;
      const res = await fetch(url);
      const data = await res.json();
      setCharInfo(data);
    };
    Object.values(data).map(
      (x) =>
        x.items.map(
          (y) => Object.keys(y.classes).length === 0 && console.log(y)
        ) // Check for items without classes
    );

    getScore(region, name, realm);
  }, [region, name, realm]);
  /*
  {false && (
    <>
      Name: {charInfo.name}-{charInfo.realm}{" "}
      <img src={charInfo.faction === "horde" ? Horde : Alliance} alt="" />
      Scores:
      <img src={Flag} alt="" />{" "}
      {charInfo?.mythic_plus_scores_by_season[0].scores.all}
      <img src={Dps} alt="" />{" "}
      {charInfo?.mythic_plus_scores_by_season[0].scores.dps}
      <img src={Tank} alt="" />{" "}
      {charInfo?.mythic_plus_scores_by_season[0].scores.tank}
      <img src={Healer} alt="" />{" "}
      {charInfo?.mythic_plus_scores_by_season[0].scores.healer}
    </>
  )}
  <button onClick={() => signOut(auth)}>Logout</button>
  */
  return (
    <div className="home">
      <div className="page"></div>
    </div>
  );
};

export default Home;
