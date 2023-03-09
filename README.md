# About

This is a website to make boosting for the "Nova Boosting Community" Easier

## Data structure

```
User {
    id: string,
    name: string,
    character_priority: [cid, ...] // Length [1-]
    characters: [
        Character {
            id: string,
            roles: [
                ["tank", "healer", "dps"],
            ], # Ordered in priority with index 0 being the highest priority
            armor: ["leather", "plate", "cloth", mail"],
            ...rio_character_obj,
        }, ...
    ],
    main_character: cid (payout char)
    team_ids: [
        string
    ]
}

Team {
    id: string,
    name: string,
    members: [
        {id: uid, characters: [cid, ...]},
    ]
    leader: uid
}

MListing {
    keys: [
        Key {
            level: int,
            dungeon: int,
            timed: bool,
            need_key: bool,
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
            id: cid
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
