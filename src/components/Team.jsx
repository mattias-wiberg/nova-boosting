import React from "react";
import Button from "./Button";
import RemoveIcon from "@mui/icons-material/Remove";
import EditIcon from "@mui/icons-material/Edit";
import CheckIcon from "@mui/icons-material/Check";

import "../style/style.scss";
import "../style/css/components/team.scss";
import Select from "./Select";

const Team = () => {
  const expand = (e) => {
    console.log("expand");
  };

  return (
    <div className="team-container">
      <Button
        color="red"
        button_icon={<RemoveIcon fontSize="14px" />}
        borderRadius="5px 0 0 5px"
      />
      <div className="vl" />
      <Button
        color="active"
        type="hold"
        borderRadius="0"
        button_icon={<EditIcon fontSize="14px" />}
      />
      <div className="vl" />
      <Select onClick={expand} />
    </div>
  );
};

export default Team;
