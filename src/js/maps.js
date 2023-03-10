// Map different types of maps named in the form of from-to

export const classArmor = {
  "death-knight": "plate",
  warrior: "plate",
  paladin: "plate",
  hunter: "mail",
  shaman: "mail",
  evoker: "mail",
  priest: "cloth",
  warlock: "cloth",
  mage: "cloth",
  "demon-hunter": "leather",
  rogue: "leather",
  monk: "leather",
  druid: "leather",
};

export const armorClass = {
  plate: ["death-knight", "warrior", "paladin"],
  mail: ["hunter", "shaman", "evoker"],
  cloth: ["priest", "warlock", "mage"],
  leather: ["demon-hunter", "rogue", "monk", "druid"],
};

export const classRole = {
  "death-knight": ["tank", "dps"],
  warrior: ["tank", "dps"],
  paladin: ["tank", "healer", "dps"],
  hunter: ["dps"],
  shaman: ["healer", "dps"],
  evoker: ["healer", "dps"],
  priest: ["healer", "dps"],
  warlock: ["dps"],
  mage: ["dps"],
  "demon-hunter": ["tank", "dps"],
  rogue: ["dps"],
  monk: ["tank", "healer", "dps"],
  druid: ["tank", "healer", "dps"],
};

export const roleClass = {
  tank: ["death-knight", "warrior", "paladin", "demon-hunter", "monk", "druid"],
  healer: ["paladin", "shaman", "evoker", "priest", "monk", "druid"],
  dps: [
    "death-knight",
    "warrior",
    "paladin",
    "hunter",
    "shaman",
    "evoker",
    "priest",
    "warlock",
    "mage",
    "demon-hunter",
    "rogue",
    "monk",
    "druid",
  ],
};
