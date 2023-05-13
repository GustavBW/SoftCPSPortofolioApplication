import { Champion, Rotation } from "../../src/ts/types";
import { rotationNewPlayerFilter, rotationFilter, keyFilter, loreFilter, nameFilter, partypeFilter, tagFilter, titleFilter } from "../../src/ts/filters";
import { expect, it, describe } from 'vitest';

const mockRotation: Rotation = {
    id: -1,
    maxNewPlayerLevel: 10,
    latestUpdate: "never",
    freeChampionIds: [103], //ahri
    freeChampionIdsForNewPlayers: [266] //aatrox
};

describe('Filters Test Suite', test => {
    //Testing reducers
    test('RotationFilter reducer', async () => {
        it("Should reduce the champion list to only those in the free rotation", async () => {
            const champsCopy = [...champions];
            const result = champsCopy.filter(t => rotationFilter.reducer!(t, mockRotation));
            expect(result[0].name).toEqual("Ahri");
        });
    });

    test('NewPlayerRotationFilter reducer', async () => {
        const champsCopy = [...champions];
        const result = champsCopy.filter(t => rotationNewPlayerFilter.reducer!(t, mockRotation));
        expect(result[0].name).toEqual("Aatrox");
    });


    //Testing basic filters
    test("Name Filter", () => {
        const expected = champions[0].name.toLowerCase();
        const result = nameFilter.apply(champions[0]);
        expect(result).toEqual(expected);
    });

    test("Tag Filter", () => {
        const result = tagFilter.apply(champions[0]);
        expect(result).toEqual(champions[0].tags.toLowerCase());
    });

    test("Key Filter", () => {
        const result = keyFilter.apply(champions[0]);
        expect(result).toEqual(champions[0].champion_key.toString());
    });

    test("Title Filter", () => {
        const result = titleFilter.apply(champions[0]);
        expect(result).toEqual(champions[0].title.toLowerCase());
    });

    test("Lore Filter", () => {
        const result = loreFilter.apply(champions[0]);
        expect(result).toEqual(champions[0].blurb.toLowerCase());
    });

    test("Partype Filter", () => {
        const result = partypeFilter.apply(champions[0]);
        expect(result).toEqual(champions[0].partype.toLowerCase());
    });
    

});

const champions: Champion[] = [
    {
        id: 1,
        version: "11.9.1",
        champion_id: "Aatrox",
        champion_key: 266,
        name: "Aatrox",
        title: "the Darkin Blade",
        blurb: "Once honored defenders of Shurima against the Void, Aatrox and his brethren would eventually become an even greater threat to Runeterra...",
        attack: 8,
        defense: 4,
        magic: 3,
        difficulty: 4,
        tags: "Fighter, Tank",
        partype: "Blood Well",
        imageUrl: "https://example.com/aatrox.png",
        thumbnailUrl: "https://example.com/aatrox_thumb.png"
    },
    {
        id: 2,
        version: "11.9.1",
        champion_id: "Ahri",
        champion_key: 103,
        name: "Ahri",
        title: "the Nine-Tailed Fox",
        blurb: "Innately connected to the latent power of Runeterra, Ahri is a vastayan trickster who wields her magic with devastating results...",
        attack: 3,
        defense: 4,
        magic: 8,
        difficulty: 5,
        tags: "Mage, Assassin",
        partype: "Mana",
        imageUrl: "https://example.com/ahri.png",
        thumbnailUrl: "https://example.com/ahri_thumb.png"
    }
];


