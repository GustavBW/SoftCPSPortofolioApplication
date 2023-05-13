import { RenderResult, render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import Search from '../../src/components/functionPanel/menu/search/Search';
import React from 'react';
import { AnchorTypes } from '../../src/components/movement/MovementAnchor';

describe('Search Component Test Suite', (test) => {
    


    test('renders', () => {
        const result: RenderResult = render(
            <Search setSearchTerm={(term) => { }} setAnchorType={(type) => { }} />
        );
        expect(result).toBeTruthy(); // check if Search component renders
    });

    test('includes input', () => {
        const result: RenderResult = render(
            <Search setSearchTerm={(term) => { }} setAnchorType={(type) => { }} />
        );
        const searchField = result.queryByTestId("menu-search-input");
        expect(searchField).toBeInTheDocument(); // check if SearchBar component renders
        expect(searchField?.tagName).toBe("INPUT"); // check if input renders
    });

    test('includes button', () => {
        const result: RenderResult = render(
            <Search setSearchTerm={(term) => { }} setAnchorType={(type) => { }} />
        );
        const button = result.queryByTestId("menu-search");
        expect(button).toBeInTheDocument(); // check if SearchBar component renders
        expect(button?.tagName).toBe("BUTTON"); // check if button renders
    });

    describe('Anchor Management Test Suite', (test) => {

        test('sets anchor type to mouse on mouse leave', () => {
            //jest mock functions arent working for me
            const setAnchorType = (type: AnchorTypes) => {
                expect(type).toEqual(AnchorTypes.Mouse);
            };
            const result: RenderResult = render(
                <Search setSearchTerm={(term) => { }} setAnchorType={setAnchorType} />
            );
            const menu = result.queryByTestId("menu-search-input");
            menu?.dispatchEvent(new MouseEvent('mouseenter', { bubbles: true }));
            setTimeout(() => { }, 0);

        });

        test('sets anchor type to text on input focus', () => {
            const setAnchorType = (type: AnchorTypes) => {
                expect(type).toEqual(AnchorTypes.Text);
            };
            const result: RenderResult = render(
                <Search setSearchTerm={(term) => { }} setAnchorType={setAnchorType} />
            );
            const menu = result.queryByTestId("menu-search-input");
            menu?.dispatchEvent(new MouseEvent('focus', { bubbles: true }));

        });

        test('sets anchor type to text on mouse enter on input', () => {
            const setAnchorType = (type: AnchorTypes) => {
                expect(type).toEqual(AnchorTypes.Text);
            };
            const result: RenderResult = render(
                <Search setSearchTerm={(term) => { }} setAnchorType={setAnchorType} />
            );
            const menu = result.queryByTestId("menu-search-input");
            menu?.dispatchEvent(new MouseEvent('mouseenter', { bubbles: true }));
        })

    });

});
