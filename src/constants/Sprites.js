export const EntityNames = {
    GUN_AK47: 'gunAk47',
    GUN_P90: 'gunP90',
    GUN_FN_SCAR: 'gunFn-scar',
    GUN_MP5: 'gunMp5',
    GUN_MP7: 'gunMp7',
    GUN_MP10: 'gunMp10',
    GUN_M4: 'gunM4',
    GUN_RPG: 'gunRPG',
    GUN_ROCKET_LAUNCHER: 'gunRocketLauncher',
    GUN_GRENADE_LAUNCHER: 'gunGrenadeLauncher',
    GUN_REMINGTON870: 'gunRemington870',
    GUN_CDP12: 'gunCdp12',
    GUN_GALLO_SA12: 'gunGalloSA12',
    AMMO_SMALL: 'ammoSmall',
    AMMO_NORMAL: 'ammoNormal',
    AMMO_LARGE: 'ammoLarge',
    AMMO_ROCKET: 'ammoRocket',
    AMMO_GRENADE: 'ammoGrenade',
    AMMO_SHOTGUN: 'ammoShotgun',
    AMMO_SNIPER: 'ammoSniper',
    AMMO_NORMAL: 'ammoNormal',
}

export const SpriteMap = {
    [EntityNames.GUN_AK47]: [193, 38, 62, 20],
    [EntityNames.GUN_P90]: [8, 39, 48, 18],
    [EntityNames.GUN_FN_SCAR]: [2, 70, 61, 22],
    [EntityNames.GUN_MP5]: [136, 37, 47, 21],
    [EntityNames.GUN_MP7]: [289, 8, 30, 17],
    [EntityNames.GUN_MP10]: [70, 38, 52, 23],
    [EntityNames.GUN_M4]: [133, 71, 56, 21],
    [EntityNames.GUN_RPG]: [1, 169, 62, 15],
    [EntityNames.GUN_ROCKET_LAUNCHER]: [320, 192, 52, 19],
    [EntityNames.GUN_GRENADE_LAUNCHER]: [135, 167, 51, 17],
    [EntityNames.GUN_REMINGTON870]: [257, 73, 62, 14],
    [EntityNames.GUN_CDP12]: [2, 105, 60, 14],
    [EntityNames.GUN_GALLO_SA12]: [73, 104, 48, 16],
    [EntityNames.AMMO_SMALL]: [105, 8, 15, 18],
    [EntityNames.AMMO_NORMAL]: [9, 8, 15, 18],
    [EntityNames.AMMO_LARGE]: [133, 5, 23, 26],
    [EntityNames.AMMO_ROCKET]: [161, 12, 30, 9],
    [EntityNames.AMMO_GRENADE]: [200, 7, 17, 18],
    [EntityNames.AMMO_SHOTGUN]: [37, 5, 22, 23],
    [EntityNames.AMMO_SNIPER]: [69, 4, 21, 25],
}

export const GunSpecs = {
    [EntityNames.GUN_AK47]: {
        NAME: 'AK47',
        RANGETYPE: 'ranged',
        MAXMAGS: 3,
        MAGSIZE: 30,
        SHOTDELAY: 100,
        RELOADDELAY: 1000,
        BULLETNAME: 'bullet',
        BULLETCOUNT: '1',
        BULLETSPEED: 1500,
        BULLETSPREAD: '4',
        BULLETLIFESPAN: 600,
        BULLETDAMAGE: '1',
    },
    [EntityNames.GUN_P90]: {
        NAME: 'P90',
        RANGETYPE: 'ranged',
        MAXMAGS: 3,
        MAGSIZE: 30,
        SHOTDELAY: 100,
        RELOADDELAY: 1500,
        BULLETNAME: 'bullet',
        BULLETCOUNT: '1',
        BULLETSPEED: 800,
        BULLETSPREAD: '4',
        BULLETLIFESPAN: 600,
        BULLETDAMAGE: '1',
    },
    [EntityNames.GUN_FN_SCAR]: {
        NAME: 'FN Scar',
        RANGETYPE: 'ranged',
        MAXMAGS: 3,
        MAGSIZE: 30,
        SHOTDELAY: 100,
        RELOADDELAY: 1500,
        BULLETNAME: 'bullet',
        BULLETCOUNT: '1',
        BULLETSPEED: 800,
        BULLETSPREAD: '4',
        BULLETLIFESPAN: 600,
        BULLETDAMAGE: '1',
    },
    [EntityNames.GUN_MP5]: {
        NAME: 'MP5',
        RANGETYPE: 'ranged',
        MAXMAGS: 3,
        MAGSIZE: 30,
        SHOTDELAY: 100,
        RELOADDELAY: 1500,
        BULLETNAME: 'bullet',
        BULLETCOUNT: '1',
        BULLETSPEED: 800,
        BULLETSPREAD: '4',
        BULLETLIFESPAN: 600,
        BULLETDAMAGE: '1',
    },
    [EntityNames.GUN_MP10]: {
        NAME: 'MP10',
        RANGETYPE: 'ranged',
        MAXMAGS: 3,
        MAGSIZE: 30,
        SHOTDELAY: 100,
        RELOADDELAY: 1500,
        BULLETNAME: 'bullet',
        BULLETCOUNT: '1',
        BULLETSPEED: 800,
        BULLETSPREAD: '4',
        BULLETLIFESPAN: 600,
        BULLETDAMAGE: '1',
    },
    [EntityNames.GUN_M4]: {
        NAME: 'M4',
        RANGETYPE: 'ranged',
        MAXMAGS: 3,
        MAGSIZE: 30,
        SHOTDELAY: 100,
        RELOADDELAY: 1500,
        BULLETNAME: 'bullet',
        BULLETCOUNT: '1',
        BULLETSPEED: 800,
        BULLETSPREAD: '4',
        BULLETLIFESPAN: 600,
        BULLETDAMAGE: '1',
    },
    [EntityNames.GUN_RPG]: {
        NAME: 'RPG',
        RANGETYPE: 'ranged',
        MAXMAGS: 3,
        MAGSIZE: 30,
        SHOTDELAY: 100,
        RELOADDELAY: 1500,
        BULLETNAME: 'bullet',
        BULLETCOUNT: '1',
        BULLETSPEED: 800,
        BULLETSPREAD: '4',
        BULLETLIFESPAN: 600,
        BULLETDAMAGE: '1',
    },
    [EntityNames.GUN_ROCKET_LAUNCHER]: {
        NAME: 'Rocket Launcher',
        RANGETYPE: 'ranged',
        MAXMAGS: 3,
        MAGSIZE: 30,
        SHOTDELAY: 100,
        RELOADDELAY: 1500,
        BULLETNAME: 'bullet',
        BULLETCOUNT: '1',
        BULLETSPEED: 800,
        BULLETSPREAD: '4',
        BULLETLIFESPAN: 600,
        BULLETDAMAGE: '1',
    },
    [EntityNames.GUN_GRENADE_LAUNCHER]: {
        NAME: 'Rocket Launcher',
        RANGETYPE: 'ranged',
        MAXMAGS: 3,
        MAGSIZE: 30,
        SHOTDELAY: 100,
        RELOADDELAY: 1500,
        BULLETNAME: 'bullet',
        BULLETCOUNT: '1',
        BULLETSPEED: 100,
        BULLETSPREAD: '4',
        BULLETLIFESPAN: 600,
        BULLETDAMAGE: '1',
    },
    [EntityNames.GUN_REMINGTON870]: {
        NAME: 'Remington870',
        RANGETYPE: 'ranged',
        MAXMAGS: 3,
        MAGSIZE: 30,
        SHOTDELAY: 100,
        RELOADDELAY: 1500,
        BULLETNAME: 'bullet',
        BULLETCOUNT: '1',
        BULLETSPEED: 800,
        BULLETSPREAD: '4',
        BULLETLIFESPAN: 600,
        BULLETDAMAGE: '1',
    },
    [EntityNames.GUN_CDP12]: {
        NAME: 'CDP12',
        RANGETYPE: 'ranged',
        MAXMAGS: 3,
        MAGSIZE: 30,
        SHOTDELAY: 100,
        RELOADDELAY: 1500,
        BULLETNAME: 'bullet',
        BULLETCOUNT: '1',
        BULLETSPEED: 800,
        BULLETSPREAD: '4',
        BULLETLIFESPAN: 600,
        BULLETDAMAGE: '1',
    },
    [EntityNames.GUN_GALLO_SA12]: {
        NAME: 'Gallo SA12',
        RANGETYPE: 'ranged',
        MAXMAGS: 12,
        MAGSIZE: 4,
        SHOTDELAY: 800,
        RELOADDELAY: 500,
        BULLETNAME: 'bullet',
        BULLETCOUNT: 5,
        BULLETSPEED: 2000,
        BULLETSPREAD: 18,
        BULLETLIFESPAN: 400,
        BULLETDAMAGE: 1,
    },
}