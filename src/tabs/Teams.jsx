import React, { useContext } from "react";
import Button from "../components/Button";
import Select from "../components/Select";
import Team from "../components/Team";
import { AuthContext } from "../context/AuthContext";
import AddIcon from "@mui/icons-material/Add";
import "../style/css/tabs/teams.scss";

const Teams = () => {
  const { userAuth } = useContext(AuthContext);

  return (
    <div className="teams">
      <div className="teams-container">
        <Team />
      </div>
      <div className="new-team-container">
        <input type="text" placeholder="Team name" className="team-name" />
        <Select className="select" />
        <Button
          color="green"
          button_icon={<AddIcon fontSize="inherit" />}
          className="add"
        />
      </div>
    </div>
  );
};

export default Teams;
