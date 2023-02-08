# About
This is a website to make boosting for the "Nova Boosting Community" Easier

## Data structure

User {
    uid: string,
    characters: [
        Character {
            name: string,
            realm: string,
            roles: [
                ["tank", "dps", "healer"],
            ],
            armor: ["Leather", "Plate", "Cloth", "Mail"]
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
    realm: string,
    faction: ["H", "A"],
    pot: int,
    boosters: [
        Role {
            role: ["tank", "dps", "healer"],
            armor: ["Leather", "Plate", "Cloth", "Mail"]
        },
    ],
    paid,
    started
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
    paid,
    finished,
}
    Key:
    
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
