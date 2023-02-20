import React, { useEffect, useState } from "react";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import "../style/css/components/select.scss";

const Select = ({ multiple, className }) => {
  const [state, setState] = useState({
    characters: [
      {
        id: 0,
        name: "Mathew",
        realm: "Deathwing",
        class: "warrior",
        selected: false,
        key: "characters",
      },
      {
        id: 1,
        name: "Drulu",
        realm: "Deathwing",
        class: "druid",
        selected: false,
        key: "characters",
      },
      {
        id: 2,
        name: "Thrallin",
        realm: "Deathwing",
        class: "demon-hunter",
        selected: false,
        key: "characters",
      },
    ],
  });
  const [expanded, setExpanded] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      if (expanded) {
        window.addEventListener("click", close);
      } else {
        window.removeEventListener("click", close);
      }
    }, 0);

    return () => {
      window.removeEventListener("click", close);
    };
  }, [expanded]);

  const expand = (e) => {
    e.preventDefault();
    setExpanded(!expanded);
  };

  const resetThenSet = (id, key) => {
    const temp = [...state[key]];

    temp.forEach((item) => (item.selected = false));
    temp[id].selected = true;

    setState({
      [key]: temp,
    });
    setExpanded(false);
    console.log(state);
  };

  const toggleItem = (id, key) => {
    const temp = [...state[key]];

    temp[id].selected = !temp[id].selected;

    setState({
      [key]: temp,
    });
  };

  const close = () => {
    setExpanded(false);
  };

  return (
    <div className={"select" + className && " " + className}>
      <div className="header" onClick={expand}>
        {state.characters.filter((item) => item.selected).length > 0 ? (
          multiple ? (
            <span className="selected">
              {"Selected " +
                state.characters.filter((item) => item.selected).length}
            </span>
          ) : (
            <div>
              <span
                className={
                  state.characters.filter((item) => item.selected)[0].class
                }
              >
                {state.characters.filter((item) => item.selected)[0].name}
              </span>
              {" - " +
                state.characters.filter((item) => item.selected)[0].realm}
            </div>
          )
        ) : (
          <span className="placeholder">Select</span>
        )}
        <div className="arrow">
          {expanded ? (
            <ExpandLessIcon fontSize="inherit" />
          ) : (
            <ExpandMoreIcon fontSize="inherit" />
          )}
        </div>
      </div>
      {expanded && (
        <div className="items">
          {state.characters.map((item) => (
            <div
              className={`item ${item.selected && "selected"}`}
              key={item.id}
              onClick={() =>
                multiple
                  ? toggleItem(item.id, item.key)
                  : resetThenSet(item.id, item.key)
              }
            >
              <span className={item.class}>{item.name}</span>
              {" - " + item.realm}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Select;
