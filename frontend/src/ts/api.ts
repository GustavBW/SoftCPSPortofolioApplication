import { Ability, Champion, ChampionStats, FetchTimeData, Rotation } from "./types";
import config from "../../env.json";
import { formatCost, formatDescription } from "./transferTool";


const apiRoot = config.apiRoot;
const serverUrl = config.serverUrl;

const headers = {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
    'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept, Authorization',
}

export async function getAllChampions(keys?: number[]): Promise<Champion[]> {
    const queryString = keys ? `?keys=${keys.join(',')}` : '';
    const response = await fetch(`${serverUrl}${apiRoot}/champions${queryString}`, {headers: headers});
    const data = await response.json();
    return data as Champion[];
}

export async function getChampion(id: number): Promise<Champion> {
    const response = await fetch(`${serverUrl}${apiRoot}/champions/${id}`, { headers: headers });
    const data = await response.json() as Champion[];
    return data[0] as Champion;
}

export async function getChampionStats(id: number): Promise<ChampionStats> {
    const response = await fetch(`${serverUrl}${apiRoot}/champions/${id}/stats`, { headers: headers });
    const data = await response.json() as ChampionStats[];
    return data[0] as ChampionStats;
}

export async function getChampionAbilities(id: number): Promise<Ability[]> {
    const response = await fetch(`${serverUrl}${apiRoot}/champions/${id}/abilities`, { headers: headers });
    const data = await response.json() as Ability[];

    //minor data formatting functions
    Object.values(data).forEach((ability: any) => {
        ability.description = formatDescription(ability.description);
    });

    Object.values(data).forEach((ability: any) => {
        ability.cost = formatCost(ability.cost);
    });

    return data;
}

export async function getNewestRotation(): Promise<Rotation> {
    const response = await fetch(`${serverUrl}${apiRoot}/rotation`, { headers: headers });
    const data = (await response.json())[0];
    const asOfTypeRotation: Rotation = {
        id: data.id,
        freeChampionIds: JSON.parse(data.freeChampionIds),
        freeChampionIdsForNewPlayers: JSON.parse(data.freeChampionIdsForNewPlayers),
        latestUpdate: data.maxNewPlayerLevel,
        maxNewPlayerLevel: data.latestUpdate
    };
    return asOfTypeRotation;
}

export async function getLatestFetchTimeData(entries: number): Promise<FetchTimeData[]> {

        const response = await fetch(`${serverUrl}${apiRoot}/cache/fetchtimes?entries=${entries}`, { headers: headers });
        const data = await response.json() as any[];
        const asOfTypeFetchTimeData: FetchTimeData[] = [];
        data.map((item: any) => {
            asOfTypeFetchTimeData.push({ //some manual assistance is needed here since the date format is not standard
                id: item.id,
                fetchTimeMs: item.fetch_time_ms,
                timestamp: new Date(item.timestamp)
            });
        });
        return asOfTypeFetchTimeData;
 

}