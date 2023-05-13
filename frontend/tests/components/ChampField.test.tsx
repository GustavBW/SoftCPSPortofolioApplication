import { RenderResult, render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import matchers from '@testing-library/jest-dom/matchers';

import ChampField from '../../src/components/field/ChampField';
import React from 'react';
import { nameFilter } from '../../src/ts/filters';

describe('ChampField Component Test Suite', (test) => {
    const result: RenderResult = render(
            <ChampField center={{x: 0, y: 0}} mouse={{x: 0, y: 0}} filterOn={nameFilter} 
            searchTerm="" setAnchorType={() => {}} setSelectedChampion={() => {}} />
        );

    test('renders', () => {
        expect(result).toBeTruthy(); // check if ChampField component renders
    });

    test('includes component ChampThumbnail', () => {
        const champThumbnails = screen.getAllByTestId("champion-thumbnail");
        expect(champThumbnails[0]).toBeInTheDocument(); // check if ChampThumbnail component renders
    });

    test('renders all Thumbnails', () => {
        const champThumbnails = result.getAllByTestId("champion-thumbnail");
        expect(champThumbnails.length).toBeGreaterThan(0); // check if ChampThumbnail component renders
        for(let i = 0; i < champThumbnails.length; i++) {
            expect(champThumbnails[i]).toBeInTheDocument();
        }
    });

    test("doesnt render a Thumbnail twice", () => {
        const champThumbnails = result.getAllByTestId("champion-thumbnail");
        const champNames: string[] = [];
        for(let i = 0; i < champThumbnails.length; i++) {
            const name = champThumbnails[i].querySelector("div")?.getAttribute("id");
            if(name) {
                champNames.push(name);
            }
        }
        const uniqueChampNames = [...new Set(champNames)];
        expect(uniqueChampNames.length).toBe(champNames.length);

    });
});