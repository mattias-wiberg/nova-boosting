import React, { useContext } from "react";
import Button from "../components/Button";
import Select from "../components/Select";
import Team from "../components/Team";
import { AuthContext } from "../context/AuthContext";

const Teams = () => {
  const { currentUser } = useContext(AuthContext);

  return (
    <div className="teams">
      <h1>Teams</h1>
      <div className="teams-container">
        <Team />
      </div>
      <div className="new-team-container">
        <input type="text" placeholder="Team name" className="team-name" />
        <Button />
      </div>

      <Select />
    </div>
  );
};

export default Teams;
