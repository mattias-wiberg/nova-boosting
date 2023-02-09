# About

This is a website to make boosting for the "Nova Boosting Community" Easier

## Data structure

```
User {
    uid: string,
    characters: [
        Character {
            name: string,
            realm: string,
            roles: [
                ["tank", "dps", "healer"],
            ],
            armor: ["Leather", "Plate", "Cloth", "Mail"],
            class: ["Death knight", "Demon hunter", "Druid", "Evoker", "Hunter", "Mage", "Monk", "Paladin", "Priest", "Rogue", "Shaman", "Warlock", "Warrior"]],
            rating: int,
            main: bool
        }
    ],
    main_character: int
}

MListing {
    keys: [
        Key {
            level: int,
            dungeon: int,
            timed: bool,
            need: bool
        },
    ],
    note: string,
    realm: string,
    faction: ["H", "A"],
    pot: int,
    boosters: [
        Role {
            role: ["tank", "dps", "healer"],
            armor: ["*", "Leather", "Plate", "Cloth", "Mail"],
            class: ["*", "Death knight", "Demon hunter", "Druid", "Hunter", "Mage", "Monk", "Paladin", "Priest", "Rogue", "Shaman", "Warlock", "Warrior", "Evoker"],
        },
    ],
    paid: bool,
    started: bool
}

MRun {
    keys: [
        Key {
            level: int,
            dungeon: int,
            timed: bool,
        },
    ],
    realm: string,
    faction: ["H", "A"],
    pot: int,
    boosters: [
        Role {
            role: ["tank", "dps", "healer"],
            name: string,
            realm: string
        }
    ],
    paid: bool,
    finished: bool,
}
```

## Commandos

To build

> npm run build

To start

> npm start

Deploy with firebase:

> firebase login

in root folder

> firebase init

select project, select hosting, build instead of public, one page app, do not overwrite index

> firebase deploy
