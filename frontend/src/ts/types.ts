export interface Champion {
    id: number;
    version: string;
    champion_id: string;
    champion_key: string;
    name: string;
    title: string;
    blurb: string;
    attack: number;
    defense: number;
    magic: number;
    difficulty: number;
    tags: string;
    partype: string;
    imageUrl: string;
    thumbnailUrl: string;
}