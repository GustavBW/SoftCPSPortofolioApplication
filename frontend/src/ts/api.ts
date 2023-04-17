import { Champion } from "./types";
import config from "../../env.json";

const apiRoot = config.apiRoot;
const serverUrl = config.serverUrl;

const headers = {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
    'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept, Authorization',
}

export async function getAllChampions(keys?: string[]): Promise<Champion[]> {
    const queryString = keys ? `?keys=${keys.join(',')}` : '';
    const response = await fetch(`${serverUrl}${apiRoot}/champions${queryString}`, {headers: headers});
    const data = await response.json();
    return data;
}

export async function getChampion(id: string): Promise<Champion> {
    const response = await fetch(`${serverUrl}${apiRoot}/champions/${id}`, { headers: headers });
    const data = await response.json();
    return data[0];
}

export async function getChampionStats(id: string): Promise<any> {
    const response = await fetch(`${serverUrl}${apiRoot}/champions/${id}/stats`, { headers: headers });
    const data = await response.json();
    return data[0];
}

export async function getNewestRotation(): Promise<any> {
    const response = await fetch(`${serverUrl}${apiRoot}/rotation`, { headers: headers });
    const data = await response.json();
    return data;
}