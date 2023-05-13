import { RenderResult, render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import ChampField from '../../src/components/field/ChampField';
import React from 'react';
import { nameFilter } from '../../src/ts/filters';

const allowedTimeout = 10000;

describe('ChampField Component Test Suite', (test) => {

    test('renders', () => {
        const result: RenderResult = render(
            <ChampField center={{ x: 0, y: 0 }} mouse={{ x: 0, y: 0 }} filterOn={nameFilter}
                searchTerm="" setAnchorType={() => { }} setSelectedChampion={() => { }} />
        );
        expect(result).toBeTruthy(); // check if ChampField component renders
    });

    //one could test for the spinner initially being there, but I found it was very inconsistent - as in intended, but hard to test for

    test('does not include component Spinner after allowed load time ' + allowedTimeout, () => {
        const result: RenderResult = render(
            <ChampField center={{ x: 0, y: 0 }} mouse={{ x: 0, y: 0 }} filterOn={nameFilter}
                searchTerm="" setAnchorType={() => { }} setSelectedChampion={() => { }} />
        );
        setTimeout(() => {
            const spinner = result.queryByTestId("spinner");
            expect(spinner).not.toBeInTheDocument(); 
        }, allowedTimeout);
    });

    test('includes component ChampThumbnail after allowed load time ' + allowedTimeout, () => {
        const result: RenderResult = render(
            <ChampField center={{ x: 0, y: 0 }} mouse={{ x: 0, y: 0 }} filterOn={nameFilter}
                searchTerm="" setAnchorType={() => { }} setSelectedChampion={() => { }} />
        );
        setTimeout(() => {
            const champThumbnails = result.getAllByTestId("champ-thumbnail");
            expect(champThumbnails[0]).toBeInTheDocument(); 
        }, allowedTimeout);
    });

    test('includes all Thumbnails after allowed load time ' + allowedTimeout, () => {
        const result: RenderResult = render(
            <ChampField center={{ x: 0, y: 0 }} mouse={{ x: 0, y: 0 }} filterOn={nameFilter}
                searchTerm="" setAnchorType={() => { }} setSelectedChampion={() => { }} />
        );
        setTimeout(() => {
            const champThumbnails = result.getAllByTestId("champ-thumbnail");
            expect(champThumbnails.length).toBeGreaterThan(0); 
            for(let i = 0; i < champThumbnails.length; i++) {
                expect(champThumbnails[i]).toBeInTheDocument();
            }
        }, allowedTimeout);
    });

    test("doesnt render a Thumbnail twice", () => {
        const result: RenderResult = render(
            <ChampField center={{ x: 0, y: 0 }} mouse={{ x: 0, y: 0 }} filterOn={nameFilter}
                searchTerm="" setAnchorType={() => { }} setSelectedChampion={() => { }} />
        );
        setTimeout(() => {
            const champThumbnails = result.getAllByTestId("champ-thumbnail");
            const champNames: string[] = [];
            for(let i = 0; i < champThumbnails.length; i++) {
                const name = champThumbnails[i].querySelector("div")?.getAttribute("id");
                if(name) {
                    champNames.push(name);
                }
            }
            const uniqueChampNames = [...new Set(champNames)];
            expect(uniqueChampNames.length).toBe(champNames.length);
        }, allowedTimeout);
    });
});