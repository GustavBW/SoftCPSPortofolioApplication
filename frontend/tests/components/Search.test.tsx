import { RenderResult, render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import Search from '../../src/components/functionPanel/menu/search/Search';
import React from 'react';
import { AnchorTypes } from '../../src/components/movement/MovementAnchor';

describe('Search Component Test Suite', (test) => {
    
    const result: RenderResult = render(
        <Search setSearchTerm={(term) => {}} setAnchorType={(type) => {}}/>
        );

    test('renders', () => {
        expect(result).toBeTruthy(); // check if Search component renders
    });

    test('includes input', () => {
        const searchBar = screen.queryByTestId("menu-search-input");
        expect(searchBar).toBeInTheDocument(); // check if SearchBar component renders
    });

    test('includes button', () => {
        const button = screen.queryByTestId("menu-search")?.querySelector("button");
        expect(button).toBeInTheDocument(); // check if button renders
    });

    describe('Anchor Management Test Suite', (test) => {

        test('sets anchor type to text on mouse enter', () => {
            const setAnchorType = jest.fn();
            render(<Search setSearchTerm={(term) => { }} setAnchorType={setAnchorType} />);
            const menu = screen.queryByTestId("menu-search-input");
            menu?.dispatchEvent(new MouseEvent('mouseenter', { bubbles: true }));
            expect(setAnchorType).toHaveBeenCalledTimes(1);
            expect(setAnchorType).toHaveBeenCalledWith(AnchorTypes.Mouse);
        });

        test('sets anchor type to movement on focus', () => {
            const setAnchorType = jest.fn();
            render(<Search setSearchTerm={(term) => { }} setAnchorType={setAnchorType} />);
            const menu = screen.queryByTestId("menu-search-input");
            menu?.dispatchEvent(new MouseEvent('focus', { bubbles: true }));
            expect(setAnchorType).toHaveBeenCalledTimes(1);
            expect(setAnchorType).toHaveBeenCalledWith(AnchorTypes.Movement);
        });

    });

});
