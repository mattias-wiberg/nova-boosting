import { signOut } from "firebase/auth";
import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { auth } from "../firebase";
import Horde from "../img/horde.jpg";
import Alliance from "../img/alliance.jpg";
import Dps from "../img/roles/dps.webp";
import Healer from "../img/roles/healer.webp";
import Tank from "../img/roles/tank.webp";
import Flag from "../img/roles/flag.webp";
import Navbar from "../components/Navbar";
import List from "./List";

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

    getScore(region, name, realm);
  }, [region, name, realm]);

  return (
    <div className="home">
      <Navbar />
      <List />
      <div className="container">
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
      </div>
    </div>
  );
};

export default Home;
