import { getAllChampions, getChampion, getChampionStats, getChampionAbilities, getNewestRotation, getLatestFetchTimeData } from '../../src/ts/api';
import {expect, it, describe} from 'vitest';
import config from "../../env.json";

const apiRoot = config.apiRoot;
const serverUrl = config.serverUrl;
const headers = {
    'Content-Type': 'application/json'
};

describe('API Test Suite', test => {
    const testKeys = [266, 84, 131]; //Aatrox, Akali, Diana

    test('getAllChampions returns all champions', async () => {
        getAllChampions().then(champions => {
            expect(champions.length).toBeGreaterThan(0);
            Object.values(champions).forEach(champion => {
                expect(champion).toBeDefined();
            });
        });
    });

    test('getAllChampions returns only specified keys when given keys', async () => {
        getAllChampions(testKeys).then(champions => {
            expect(champions.length).toBe(testKeys.length);
            for (let i = 0; i < champions.length; i++) {
                expect(champions[i].champion_key).toBe(testKeys[i]);
            }
        });
    });

    test('getChampion returns a champion by ID', async () => {
        const champion = await getChampion(266);
        expect(champion.name).toBe('Aatrox');
    });

    test('getChampionStats returns stats for a champion by ID', async () => {
        const stats = await getChampionStats(266);
        expect(stats.champion_key).toBe(266);
    });

    test('getChampionAbilities returns abilities for a champion by ID', async () => {
        const abilities = await getChampionAbilities(266);
        expect(abilities.length).toBeGreaterThan(3); //Aatrox has 4 abilities
        for(let i = 0; i < abilities.length; i++){
            expect(abilities[i].name).toBeDefined();
            expect(abilities[i].description).toBeDefined();
            expect(abilities[i].cost).toBeDefined();
        }
    });

    test('getNewestRotation returns the newest rotation', async () => {
        const rotation = await getNewestRotation();
        expect(rotation).toBeDefined();
        expect(rotation.latestUpdate).toBeDefined();
        expect(rotation.freeChampionIds).toBeDefined();
        expect(rotation.freeChampionIds.length).toBeGreaterThan(0);
        expect(rotation.freeChampionIdsForNewPlayers).toBeDefined();
        expect(rotation.freeChampionIdsForNewPlayers.length).toBeGreaterThan(0);
    });

    test('getLatestFetchTimeData returns an array of FetchTimeData objects', async () => {
        const entries = 5;
        const fetchTimeData = await getLatestFetchTimeData(entries);
        expect(fetchTimeData).toBeDefined();
        expect(fetchTimeData.length).toBeLessThanOrEqual(entries);

        for(let i = 0; i < fetchTimeData.length; i++){
            expect(fetchTimeData[i].id).toBeDefined();
            expect(fetchTimeData[i].fetchTimeMs).toBeDefined();
            expect(fetchTimeData[i].timestamp).toBeDefined();
        }
    });
});