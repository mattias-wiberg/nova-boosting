import React, { useState, useRef } from "react";

import Key from "../components/Key";
import Select from "../components/Select";
import Button from "../components/Button";
import Checkbox from "../components/Checkbox";

import data from "../data/data.json";
import { classes, roleClass, armorClass, classArmor } from "../js/maps.js";
import { DUNGEONS } from "../js/utilities.js";
import "../style/css/pages/listMythic.scss";

import { ReactComponent as TankIcon } from "../img/icons/tank.svg";
import { ReactComponent as HealerIcon } from "../img/icons/healer.svg";
import { ReactComponent as DpsIcon } from "../img/icons/dps.svg";
import { ReactComponent as HordeIcon } from "../img/icons/horde.svg";
import { ReactComponent as AllianceIcon } from "../img/icons/alliance.svg";
import AddIcon from "@mui/icons-material/Add";

import {
  collectionGroup,
  query,
  where,
  getDocs,
  addDoc,
  collection,
  doc,
  serverTimestamp,
  setDoc,
} from "firebase/firestore";
import { v4 as uuid } from "uuid";

import "../style/animation.scss";
import { ReactComponent as N_1 } from "../img/icon/1.svg";
import { ReactComponent as N_2 } from "../img/icon/2.svg";
import { ReactComponent as N_3 } from "../img/icon/3.svg";
import { ReactComponent as N_4 } from "../img/icon/4.svg";
import { ReactComponent as O_ARC } from "../img/icon/O_Arc.svg";
import { ReactComponent as W_ARC } from "../img/icon/W_Arc.svg";
import { db } from "../firebase";

const LoadingIcon = () => {
  return (
    <div className="loading-icon">
      <N_1 className="n-1 slide-in-bl" />
      <N_2 className="n-2 slide-in-tl" />
      <N_3 className="n-3 slide-in-br" />
      <N_4 className="n-4 slide-in-tr" />
      <O_ARC className="o-arc slide-in-bl" />
      <W_ARC className="w-arc slide-in-tr" />
      <div className="circle">
        <div className="arc"></div>
      </div>
    </div>
  );
};

const List = () => {
  const [error, setError] = useState("");
  const [activeTab, setActiveTab] = React.useState("gear");
  const items = useRef([]); // index of the selected item in the dungeons
  const inputRef = useRef({
    note: "",
    realm: "",
    pot: 0,
    boosters: {
      tank: "",
      healer: "",
      dps_1: "",
      dps_2: "",
    },
  });

  const [ticks, setTicks] = useState({
    druid: {
      recommended: false,
      tank: false,
      healer: false,
      dps_1: false,
      dps_2: false,
    },
    paladin: {
      recommended: false,
      tank: false,
      healer: false,
      dps_1: false,
      dps_2: false,
    },
    monk: {
      recommended: false,
      tank: false,
      healer: false,
      dps_1: false,
      dps_2: false,
    },
    evoker: {
      recommended: false,
      healer: false,
      dps_1: false,
      dps_2: false,
    },
    priest: {
      recommended: false,
      healer: false,
      dps_1: false,
      dps_2: false,
    },
    shaman: {
      recommended: false,
      healer: false,
      dps_1: false,
      dps_2: false,
    },
    mage: {
      recommended: false,
      dps_1: false,
      dps_2: false,
    },
    rogue: {
      recommended: false,
      dps_1: false,
      dps_2: false,
    },
    hunter: {
      recommended: false,
      dps_1: false,
      dps_2: false,
    },
    warlock: {
      recommended: false,
      dps_1: false,
      dps_2: false,
    },
    "death-knight": {
      recommended: false,
      tank: false,
      dps_1: false,
      dps_2: false,
    },
    "demon-hunter": {
      recommended: false,
      tank: false,
      dps_1: false,
      dps_2: false,
    },
    warrior: {
      recommended: false,
      tank: false,
      dps_1: false,
      dps_2: false,
    },
  });

  const [listing, setListing] = useState({
    keys: [],
    faction: "horde",
    paid: false,
    started: false,
  });

  const selectedDungeon = useRef({
    id: "ANY", // "ANY" or "HoV" or "CoS" so on
    name: "ANY",
    level: 0,
    inTime: true,
    needKey: false,
  });

  const armorColors = {
    leather: "active",
    plate: "warrior",
    cloth: "priest",
    mail: "shaman",
  };

  const setRecommendedPicks = () => {
    // Get the intersection of all the items
    // Set first non-undefined item as the intersection
    const nonUndefinedItems = items.current.filter(
      (item) => item !== undefined
    );
    if (nonUndefinedItems.length === 0) {
      // If there are no items selected, then there are no recommended picks
      return []; // Empty object
    }

    const recommendedClasses = classes.filter((className) =>
      nonUndefinedItems.every((item) => item.classes[className] !== undefined)
    );
    /*
    console.log("RECOMMENDED CLASSES");
    console.log("Current items:", items.current); // prints the current items
    console.log("Recommended classes:", recommendedClasses); // pr
    console.log("Previous items:", prevItems.current); // prints the previous items
    console.log("Classes array:", classes); // prints the classes array
    console.log("Non-undefined items:", nonUndefinedItems); // prints the array of non-undefined items
    */
    console.log("Recommended classes:", recommendedClasses); // pr
    let newTicks = { ...ticks };
    Object.keys(newTicks).forEach((className) => {
      newTicks[className].recommended = recommendedClasses.includes(className);
    });
    setTicks(newTicks);
    return recommendedClasses;
  };

  const selectDungeon = (dungeonId) => {
    if (dungeonId.length === 0) return;
    selectedDungeon.current.id = dungeonId[0];
    selectedDungeon.current.name = DUNGEONS[dungeonId[0]].name;
  };

  const setDungeonLevel = (e) => {
    selectedDungeon.current.level = parseInt(e.target.value);
  };

  const setDungeonItem = (dungeonIndex, dungeon, itemIndex) => {
    if (itemIndex !== undefined) {
      items.current[dungeonIndex] = data[dungeon].items[itemIndex];
    } else {
      items.current[dungeonIndex] = undefined;
    }

    setRecommendedPicks();
  };

  const addDungeon = () => {
    setListing({
      ...listing,
      keys: [...listing.keys, { ...selectedDungeon.current }],
    });
  };

  const removeDungeon = (index) => {
    setListing({
      ...listing,
      keys: listing.keys.filter((_, i) => i !== index),
    });
    items.current = items.current.filter((_, i) => i !== index);
    setRecommendedPicks();
  };

  const toggleTimed = (index) => {
    setListing({
      ...listing,
      keys: listing.keys.map((dungeon, i) =>
        i === index ? { ...dungeon, inTime: !dungeon.inTime } : dungeon
      ),
    });
  };

  const toggleNeedKey = (index) => {
    setListing({
      ...listing,
      keys: listing.keys.map((dungeon, i) =>
        i === index ? { ...dungeon, needKey: !dungeon.needKey } : dungeon
      ),
    });
  };

  const toggleClass = (className) => {
    let newTicks = { ...ticks };
    // Get the roles for the class
    const roles = Object.keys(newTicks[className]).filter(
      (r) => r !== "recommended"
    );
    let tickedAmount = 0;
    let totalAmount = roles.length;

    roles.forEach((role) => {
      tickedAmount += ticks[className][role] ? 1 : 0;
    });

    if (tickedAmount === totalAmount) {
      roles.forEach((role) => {
        newTicks[className][role] = false;
      });
    } else {
      roles.forEach((role) => {
        newTicks[className][role] = true;
      });
    }
    setTicks(newTicks);
  };

  const toggleRoles = (role) => {
    let newTicks = { ...ticks };
    let tickedAmount = 0;
    let totalAmount = 0;

    Object.keys(ticks).forEach((className) => {
      if (ticks[className][role] !== undefined) {
        tickedAmount += ticks[className][role] ? 1 : 0;
        totalAmount += 1;
      }
    });

    if (tickedAmount === totalAmount) {
      Object.keys(ticks).forEach((className) => {
        if (ticks[className][role] !== undefined) {
          newTicks[className][role] = false;
        }
      });
    } else {
      Object.keys(ticks).forEach((className) => {
        if (ticks[className][role] !== undefined) {
          newTicks[className][role] = true;
        }
      });
    }
    setTicks(newTicks);
  };

  const toggleClassTick = (className, role) => {
    setTicks({
      ...ticks,
      [className]: {
        ...ticks[className],
        [role]: !ticks[className][role],
      },
    });
  };

  const toggleGearTick = (role, armor, tick) => {
    let newTicks = { ...ticks };
    // Get all classes that can wear 'armor' and be 'role'
    // Ex: Leather Healer: [Druid, Monk]
    let classesOfRole = [];
    const role_key = role.split("_")[0]; // key for roleClass dps_1 -> dps

    armorClass[armor].forEach((wow_class) => {
      if (roleClass[role_key].includes(wow_class)) {
        classesOfRole.push(wow_class);
      }
    });
    if (classesOfRole.length === 0) return;

    if (!tick) {
      Object.keys(newTicks).forEach((wow_class) => {
        if (classesOfRole.includes(wow_class)) {
          newTicks[wow_class][role] = false;
        }
      });
    } else {
      Object.keys(newTicks).forEach((wow_class) => {
        if (classesOfRole.includes(wow_class)) {
          newTicks[wow_class][role] = !newTicks[wow_class][role];
        }
      });
    }

    setTicks(newTicks);
  };

  const toggleRecommended = () => {
    let newTicks = { ...ticks };
    let tickedAmount = 0;
    let totalAmount = 0;
    Object.keys(newTicks).forEach((className) => {
      if (ticks[className].recommended) {
        // Get the roles for the class
        const roles = Object.keys(newTicks[className]).filter(
          (r) => r !== "recommended"
        );

        roles.forEach((role) => {
          tickedAmount += ticks[className][role] ? 1 : 0;
          totalAmount += 1;
        });
      }
    });

    Object.keys(newTicks).forEach((className) => {
      // TODO: Is this expected behavior?
      //if (ticks[className].recommended) {
      // Get the roles for the class
      const roles = Object.keys(newTicks[className]).filter(
        (r) => r !== "recommended"
      );

      if (tickedAmount >= totalAmount) {
        roles.forEach((role) => {
          newTicks[className][role] = false;
        });
      } else {
        roles.forEach((role) => {
          newTicks[className][role] = ticks[className].recommended;
        });
      }
      //}
    });
    setTicks(newTicks);
  };

  const createListing = async () => {
    //console.log(listing, inputRef.current, ticks);
    let boosters = {}; // Already determined boosters
    let rolesToFind = {}; // Boosters to find
    for (const key of Object.keys(inputRef.current.boosters)) {
      if (inputRef.current.boosters[key] !== "") {
        const names = inputRef.current.boosters[key]
          .trim()
          .split("-")
          .map((s) => s.trim());

        const name =
          names[0].substring(0, 1).toUpperCase() + names[0].substring(1);
        const realm =
          names[1].substring(0, 1).toUpperCase() + names[1].substring(1);

        const character = query(
          collectionGroup(db, "characters"),
          where("name", "==", name),
          where("realm", "==", realm)
        );
        const characterSnapshot = await getDocs(character);

        if (!characterSnapshot.empty) {
          console.log("Found character!");
        } else {
          setError(
            "Character '" +
              inputRef.current.boosters[key] +
              "' is not registered in any member!"
          );
          return;
        }
        if (characterSnapshot.size > 1) {
          setError("Multiple characters found! Please contact an admin!");
          return;
        }

        characterSnapshot.forEach((doc) => {
          boosters[key] = doc.id;
        });
      } else {
        rolesToFind[key] = Object.entries(ticks)
          .filter((x) => x[1][key])
          .map((x) => x[0]);
      }
    }

    if (Object.entries(rolesToFind).some((x) => x[1].length === 0)) {
      setError("Please select at least one class for each role!");
      return;
    }
    if (listing.keys.length === 0) {
      setError("Please select at least one key!");
      return;
    }
    if (inputRef.current.pot === 0) {
      setError("Please provide the pot!");
      return;
    }
    if (inputRef.current.realm === "") {
      setError("Please provide the buyers realm!");
      return;
    }

    let { keys } = listing;
    keys = keys.map((key, i) => {
      return {
        ...key,
        item: items.current[i] ? items.current[i] : "",
      };
    });

    const id = uuid();
    const MListing = {
      id: id,
      created: serverTimestamp(),
      keys: keys,
      note: inputRef.current.note,
      realm: inputRef.current.realm,
      faction: listing.faction.toLowerCase(),
      pot: inputRef.current.pot,
      rolesToFind: rolesToFind,
      boosters: boosters,
      paid: listing.paid,
      started: listing.started,
    };
    console.log(MListing);
    setError("");

    // Create listing in db
    await setDoc(doc(db, "mplus-listings", id), MListing);
  };

  return (
    <div className="list-mythic">
      <span className="title">M+ Boost Listing</span>
      <div className="error-box">
        <div className="error-box">
          {error !== "" && (
            <>
              <span className="red">Error: </span> {" " + error}
            </>
          )}
        </div>
      </div>
      <div className="key-input-wrapper">
        <div className="key-labels">
          <span className="plus">+</span>
          <span className="dungeon">Dungeon</span>
        </div>
        <div className="key-input">
          <input
            type="number"
            defaultValue={0}
            className="key-input"
            onChange={setDungeonLevel}
          />
          <Select
            className="select-dungeon"
            items={Object.fromEntries([
              ...Object.entries(DUNGEONS).map((v) => [
                v[0],
                { id: v[0], ...v[1] },
              ]),
              ["ANY", { id: "ANY", name: "Any" }],
            ])}
            onSelected={selectDungeon}
            defaultSelected={["ANY"]}
          />
          <Button
            button_icon={<AddIcon fontSize="inherit" />}
            className="add-button"
            clickHandler={addDungeon}
          />
        </div>
        <div className="keys">
          {listing.keys.map((dungeon, index) => (
            <Key
              level={dungeon.level}
              dungeon={dungeon.id}
              inTime={dungeon.inTime}
              needKey={dungeon.needKey}
              index={index}
              remove={removeDungeon}
              toggleTimed={toggleTimed}
              toggleNeedKey={toggleNeedKey}
              setItem={setDungeonItem}
              key={index}
            />
          ))}
        </div>
      </div>
      <div className="gear-part-wrapper">
        <div className="tabs">
          <div
            className={activeTab === "gear" ? "tab active-tab" : "tab"}
            onClick={() => setActiveTab("gear")}
          >
            Gear Type / Premade
          </div>
          <div
            className={activeTab === "class" ? "tab active-tab" : "tab"}
            onClick={() => setActiveTab("class")}
          >
            Class Specific
          </div>
        </div>
        <div className="checkbox-content">
          {activeTab === "gear" ? (
            <div className="gear">
              <div className="check-rows">
                {["tank", "healer", "dps_1", "dps_2"].map((role) => {
                  const role_key = role.split("_")[0];
                  return (
                    <div className="check-row" key={role}>
                      {role === "tank" ? (
                        <TankIcon
                          className={
                            "role" +
                            (roleClass.tank.every(
                              (className) => ticks[className].tank
                            )
                              ? " active-role"
                              : "")
                          }
                          onClick={() => toggleRoles("tank")}
                        />
                      ) : role === "healer" ? (
                        <HealerIcon
                          className={
                            "role" +
                            (roleClass.healer.every(
                              (className) => ticks[className].healer
                            )
                              ? " active-role"
                              : "")
                          }
                          onClick={() => toggleRoles("healer")}
                        />
                      ) : role === "dps_1" ? (
                        <DpsIcon
                          className={
                            "role" +
                            (roleClass.dps.every(
                              (className) => ticks[className].dps_1
                            )
                              ? " active-role"
                              : "")
                          }
                          onClick={() => toggleRoles("dps_1")}
                        />
                      ) : role === "dps_2" ? (
                        <DpsIcon
                          className={
                            "role" +
                            (roleClass.dps.every(
                              (className) => ticks[className].dps_2
                            )
                              ? " active-role"
                              : "")
                          }
                          onClick={() => toggleRoles("dps_2")}
                        />
                      ) : null}

                      {Object.keys(armorClass).map((armor) => {
                        // Get all classes that can wear 'armor' and be 'role'
                        // Ex: Leather Healer: [Druid, Monk]
                        let classesOfRole = [];
                        armorClass[armor].forEach((wow_class) => {
                          if (roleClass[role_key].includes(wow_class)) {
                            classesOfRole.push(wow_class);
                          }
                        });

                        // Count how many classes that are able to be 'role' and wear 'armor' that are ticked
                        let countClassesOfRoleTicked = 0;
                        classesOfRole.forEach((wow_class) => {
                          if (ticks[wow_class][role]) {
                            countClassesOfRoleTicked++;
                          }
                        });

                        if (classesOfRole.length === 0) {
                          // If there are no classes that can wear 'armor' and be 'role'
                          return (
                            <div className="empty-check" key={armor}></div>
                          );
                        }

                        let tick =
                          countClassesOfRoleTicked === classesOfRole.length ||
                          countClassesOfRoleTicked === 0;

                        return (
                          <Checkbox
                            recommended="0000"
                            tickType={tick ? "tick" : "semi"}
                            ticked={countClassesOfRoleTicked !== 0}
                            color={armorColors[armor]}
                            key={armor}
                            toggle={() => toggleGearTick(role, armor, tick)}
                          />
                        );
                      })}
                      <input
                        type="text"
                        placeholder="Name-Realm"
                        onChange={(e) =>
                          (inputRef.current.boosters[role] = e.target.value)
                        }
                      />
                    </div>
                  );
                })}
              </div>

              <div className="type-labels">
                <div className="left-labels">
                  <span className="armor-label">Leather</span>
                  <span className="armor-label">Plate</span>
                  <span className="armor-label">Cloth</span>
                  <span className="armor-label">Mail</span>
                </div>
                <div className="label">Name-Realm</div>
              </div>
            </div>
          ) : (
            <div className="class-wrapper">
              <div className="class-container">
                <div className="note" onClick={toggleRecommended}>
                  <span className="label">Recommended picks</span>
                  <div className="recommended-dark"></div>
                </div>
                <div className="class-content">
                  <div className="roles">
                    <TankIcon
                      className={
                        "role" +
                        (roleClass.tank.every(
                          (className) => ticks[className].tank
                        )
                          ? " active-role"
                          : "")
                      }
                      onClick={() => toggleRoles("tank")}
                    />
                    <HealerIcon
                      className={
                        "role" +
                        (roleClass.healer.every(
                          (className) => ticks[className].healer
                        )
                          ? " active-role"
                          : "")
                      }
                      onClick={() => toggleRoles("healer")}
                    />
                    <DpsIcon
                      className={
                        "role" +
                        (roleClass.dps.every(
                          (className) => ticks[className].dps_1
                        )
                          ? " active-role"
                          : "")
                      }
                      onClick={() => toggleRoles("dps_1")}
                    />
                    <DpsIcon
                      className={
                        "role" +
                        (roleClass.dps.every(
                          (className) => ticks[className].dps_2
                        )
                          ? " active-role"
                          : "")
                      }
                      onClick={() => toggleRoles("dps_2")}
                    />
                  </div>
                  <div className="class-rows">
                    {Object.keys(ticks).map((key) => (
                      <div className="class-row" key={key}>
                        <div className="checks">
                          {ticks[key].tank !== undefined ? (
                            <Checkbox
                              recommended={
                                ticks[key].recommended ? "0010" : "0000"
                              }
                              color={key}
                              ticked={ticks[key].tank}
                              toggle={() => toggleClassTick(key, "tank")}
                            />
                          ) : (
                            <div className="empty-check"></div>
                          )}
                          {ticks[key].healer !== undefined ? (
                            <Checkbox
                              recommended={
                                ticks[key].recommended ? "0010" : "0000"
                              }
                              color={key}
                              ticked={ticks[key].healer}
                              toggle={() => toggleClassTick(key, "healer")}
                            />
                          ) : (
                            <div className="empty-check"></div>
                          )}
                          {ticks[key].dps_1 !== undefined ? (
                            <Checkbox
                              recommended={
                                ticks[key].recommended ? "0010" : "0000"
                              }
                              color={key}
                              ticked={ticks[key].dps_1}
                              toggle={() => toggleClassTick(key, "dps_1")}
                            />
                          ) : (
                            <div className="empty-check"></div>
                          )}
                          {ticks[key].dps_2 !== undefined ? (
                            <Checkbox
                              recommended={
                                ticks[key].recommended ? "0010" : "0000"
                              }
                              color={key}
                              ticked={ticks[key].dps_2}
                              toggle={() => toggleClassTick(key, "dps_2")}
                            />
                          ) : (
                            <div className="empty-check"></div>
                          )}
                        </div>
                        <span
                          className={`class-label ${key}`}
                          onClick={() => toggleClass(key)}
                        >
                          {key.replace("-", " ")}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
      <div className="footer-inputs">
        <textarea
          cols="30"
          rows="3"
          placeholder="Type your note here..."
          onChange={(e) => (inputRef.current.note = e.target.value)}
        ></textarea>
        <div className="footer">
          <input
            type="text"
            className="realm-input"
            placeholder="Buyer's Realm"
            onChange={(e) => (inputRef.current.realm = e.target.value)}
          />
          <div className="factions">
            <HordeIcon
              className={`faction${
                listing.faction === "horde" ? " horde" : ""
              }`}
              onClick={() => setListing({ ...listing, faction: "horde" })}
            />
            <AllianceIcon
              className={`faction${
                listing.faction === "alliance" ? " alliance" : ""
              }`}
              onClick={() => setListing({ ...listing, faction: "alliance" })}
            />
          </div>
          <div className="pot">
            <input
              type="number"
              placeholder="Amount"
              onChange={(e) =>
                (inputRef.current.pot = parseInt(e.target.value))
              }
            />
            <div
              className={`paid-button${listing.paid ? " active-bg" : ""}`}
              onClick={() => setListing({ ...listing, paid: !listing.paid })}
            >
              $
            </div>
          </div>
        </div>
        <Button
          text="Create Listing"
          color="green"
          className="create-button"
          clickHandler={createListing}
        />
      </div>
    </div>
  );
};

export default List;
