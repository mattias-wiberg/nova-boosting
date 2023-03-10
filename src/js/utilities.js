import { classArmor, classRole } from "./maps.js";
import { v4 as uuid } from "uuid";

export const getCharacter = async (setError) => {
  const region = "eu";
  const character = document.getElementById("character").value.split("-");

  if (character.length !== 2) {
    if (character.length === 1) {
      setError(
        "Please enter a character name and realm with the following format Name-Realm"
      );
    } else {
      setError("Please enter a valid character name and realm");
    }
    document.getElementById("character").value = "";
    return;
  }

  const name = character[0].trim();
  const realm = character[1].trim();
  if (realm === "") {
    setError(
      "Please enter the realm name of the character using the format Name-Realm"
    );
    return;
  }
  const url = `https://raider.io/api/v1/characters/profile?region=${region}&realm=${realm}&name=${name}&fields=mythic_plus_scores_by_season%3Acurrent`;

  try {
    const res = await fetch(url);
    const data = await res.json();
    setError("");

    const characterClass = data.class.toLowerCase().replace(" ", "-");
    // UUID for character
    data.id = uuid();
    data.armor = classArmor[characterClass];

    // Set role priorities by rio score
    const roles = classRole[characterClass];
    const scoresData = data.mythic_plus_scores_by_season[0].scores;
    const scores = Object.keys(scoresData)
      .filter((role) => roles.includes(role)) // Only get roles that the character can play
      .map((role) => ({
        role: role,
        score: scoresData[role],
      }));
    scores.sort((a, b) => b.score - a.score);
    data.roles = scores.map((score) => score.role);
    return data;
  } catch (err) {
    setError(
      'Could not find character "' + name + '" on realm "' + realm + '"'
    );
    return;
  }
};
