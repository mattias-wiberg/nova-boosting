# About

This is a website to make boosting for the "Nova Boosting Community" Easier

## Data structure

```
(User) id: {
    id: string,
    name: string,
    character_priority: [cid, ...] // Length [1-]
    Collection(characters): [
        Character {
            id: string,
            roles: [
                ["tank", "healer", "dps"],
            ], # Ordered in priority with index 0 being the highest priority
            armor: ["leather", "plate", "cloth", mail"],
            ...rio_character_obj,
        }, ...
    ],
    main_character: (Character) id    # payout char
    team_ids: [(Team) id, ...]
}

(Team) id: {
    id: string,
    name: string,
    Collection(members): {
        (User) id: {
            id: (User) id,
            characters: {
                (Character) id: {
                    id: (Character) id,
                    roles: ["tank", "healer", "dps"]
                },
                ...
            }
        },
    }
    leader: (User) id
}

MListing {
    id: string,
    timestamp: (ServerTimestamp)
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
    faction: ["horde", "alliance"],
    pot: int,
    roles_to_find: {
        ["tank", "healer", "dps_1", "dps_2"]: ["Death knight", "Demon hunter", "Druid", "Hunter", "Mage", "Monk", "Paladin", "Priest", "Rogue", "Shaman", "Warlock", "Warrior", "Evoker"],
    }
    boosters: {
        ["tank", "healer", "dps_1", "dps_2"]: (Character) id
    },
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
