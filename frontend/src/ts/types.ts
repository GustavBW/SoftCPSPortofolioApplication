export interface Champion {
    /**
     * Internal db cache id
     */
    id: number;
    /**
     * Champion version
     */
    version: string;
    /**
     * Riot internal champion id (name) - unique
     */
    champion_id: string;
    /**
     * Riot internal champion key (number) - unique
     */
    champion_key: number;
    /**
     * Display name
     */
    name: string;
    title: string;
    /**
     * Champion lore excerpt
     */
    blurb: string;
    attack: number;
    defense: number;
    magic: number;
    difficulty: number;
    /**
     * Champion tags (e.g. "Fighter", "Mage", "Assassin", "Tank", "Support", "Marksman")
     * as [string]
     */
    tags: string;
    /**
     * In game resource type
     * (e.g. "Mana", "Energy", "Fury", "Heat", "Rage", "Blood Well")
     */
    partype: string;
    imageUrl: string;
    thumbnailUrl: string;
}

export interface ChampionStats {
    id: number;
    hp: number;
    hpperlevel: number;
    mp: number;
    mpperlevel: number;

    movespeed: number;
    armor: number;
    armorperlevel: number;
    spellblock: number;
    spellblockperlevel: number;
    attackrange: number;
    
    hpregen: number;
    hpregenperlevel: number;
    mpregen: number;
    mpregenperlevel: number;
    crit: number;
    critperlevel: number;
    attackdamage: number;
    attackdamageperlevel: number;
    attackspeedperlevel: number;
    attackspeed: number;
    champion_key: string;
}

export interface Ability {
    id: number;
    champion_key: string;
    name: string;
    icon: string;
    description: string[];
    cost: string[];
    targeting: string;
    affects: string;
    spellshieldable: string;
    resource: string;
    damageType: string;
    spellEffects: string;
    projectile: string;
    occurrence: string;
    blurb: string;
    missileSpeed: string;
    rechargeRate: string;
    collisionRadius: string;
    tetherRadius: string;
    onTargetCdStatic: string;
    innerRadius: string;
    speed: string;
    width: string;
    angle: string;
    castTime: string;
    effectRadius: string;
    targetRange: string;
}

export interface Rotation {
    id: number;
    freeChampionIds: number[];
    freeChampionIdsForNewPlayers: number[];
    maxNewPlayerLevel: number;
    latestUpdate: string;
}

export interface FetchTimeData {
    id: number;
    fetch_time_ms: number;
    timestamp: Date;
}