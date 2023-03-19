import React, { useEffect, useState } from "react";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import "../style/css/components/select.scss";

const CharacterHeader = ({ character }) => {
  return (
    <div>
      <span className={character.class.toLowerCase().replace(" ", "-")}>
        {character.name}
      </span>
      {" - " + character.realm}
    </div>
  );
};

const CharacterItem = ({ character, selected, selectItem }) => {
  return (
    <div
      className={"item" + (selected ? " selected" : "")}
      onClick={() => selectItem(character.id)}
    >
      <span className={character.class.toLowerCase().replace(" ", "-")}>
        {character.name}
      </span>
      {" - " + character.realm}
    </div>
  );
};

const ItemItem = ({ item, selected, selectItem }) => {
  return (
    <div
      className={"item" + (selected ? " selected" : "")}
      onClick={() => selectItem(item.id)}
    >
      <img
        src={require(`../img/dungeons/items/${item.image_name}`)}
        alt="item icon"
      />
      <span className="name">{item.name}</span>
    </div>
  );
};

const Item = ({ item, selected, selectItem }) => {
  return (
    <div
      className={"item" + (selected ? " selected" : "")}
      onClick={() => selectItem(item.id)}
    >
      <span className="name">{item.name}</span>
    </div>
  );
};

const ItemItemHeader = ({ item }) => {
  return (
    <div className="item-header">
      <img
        src={require(`../img/dungeons/items/${item.image_name}`)}
        alt="item icon"
      />
      <span>{item.name}</span>
    </div>
  );
};

const Select = ({
  items,
  onSelected = (ids) => {
    console.log(ids);
  },
  className = "",
  multiple = false,
  defaultSelected = [],
  type = "", // character, item or none
}) => {
  const [selected, setSelected] = useState(defaultSelected); // Selected character(s)
  const [expanded, setExpanded] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      if (expanded) {
        window.addEventListener("click", close);
      } else {
        window.removeEventListener("click", close);
      }
    }, 0);
    onSelected(selected); // Call parent function with selected characters when selected changes

    return () => {
      window.removeEventListener("click", close);
    };
  }, [expanded, selected, onSelected]);

  const selectItem = (id) => {
    if (multiple) {
      toggleItem(id);
    } else {
      setSelected([id]);
      close();
    }
  };

  const toggleItem = (id) => {
    if (selected.includes(id)) {
      setSelected(selected.filter((item) => item !== id)); // Remove item from array
    } else {
      setSelected([...selected, id]); // Add item to array
    }
  };

  const expand = (e) => {
    e.preventDefault();
    setExpanded(!expanded);
  };

  const close = () => {
    setExpanded(false);
  };

  if (!items || items.length === 0) {
    return null;
  }
  return (
    <div className={`select ${className}`}>
      <div className="header" onClick={expand}>
        {selected.length > 0 ? (
          selected.length > 1 && multiple ? (
            <span className="selected">{`Selected ${selected.length} ${
              type + "s"
            }`}</span>
          ) : type === "item" ? (
            <ItemItemHeader item={items[selected[0]]} />
          ) : type === "character" ? (
            <CharacterHeader character={items[selected[0]]} />
          ) : (
            <span className="selected">{items[selected[0]].name}</span>
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
          {Object.values(items).map((item) =>
            type === "character" ? (
              <CharacterItem
                character={item}
                selected={selected.includes(item.id)}
                selectItem={selectItem}
                key={item.id}
              />
            ) : type === "item" ? (
              <ItemItem
                item={item}
                selected={selected.includes(item.id)}
                selectItem={selectItem}
                key={item.id}
              />
            ) : (
              <Item key={item.id} item={item} selectItem={selectItem} />
            )
          )}
        </div>
      )}
    </div>
  );
};

export default Select;
