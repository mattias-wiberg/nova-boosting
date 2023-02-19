import React, { useState } from "react";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import "../style/css/components/select.scss";

const Select = ({}) => {
  const [state, setState] = useState({
    location: [
      {
        id: 0,
        title: "New York",
        selected: false,
        key: "location",
      },
      {
        id: 1,
        title: "Dublin",
        selected: false,
        key: "location",
      },
      {
        id: 2,
        title: "California",
        selected: false,
        key: "location",
      },
      {
        id: 3,
        title: "Istanbul",
        selected: false,
        key: "location",
      },
      {
        id: 4,
        title: "Izmir",
        selected: false,
        key: "location",
      },
      {
        id: 5,
        title: "Oslo",
        selected: false,
        key: "location",
      },
    ],
  });
  const [expanded, setExpanded] = useState(false);
  const [selected, setSelected] = useState({});

  const expand = () => {
    setExpanded(!expanded);
  };

  return (
    <div className="select" onClick={expand}>
      <div className="left">
        <span className="selected">Faze Clan</span>
      </div>
      <div className="right">
        <span className="label">3/4</span>
        <div className="arrow">
          {expanded ? (
            <ExpandLessIcon fontSize="inherit" />
          ) : (
            <ExpandMoreIcon fontSize="inherit" />
          )}
        </div>
      </div>
    </div>
  );
};

export default Select;
