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

export interface FetchTimeData {
    id: number;
    fetch_time_ms: number;
    timestamp: Date;
}