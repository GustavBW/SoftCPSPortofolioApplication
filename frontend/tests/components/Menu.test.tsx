import { RenderResult, render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import Menu from '../../src/components/functionPanel/menu/Menu';
import React from 'react';
import { AnchorTypes } from '../../src/components/movement/MovementAnchor';

describe('Menu Component Test Suite', (test) => {

    const result: RenderResult = render(
        <Menu setSearchTerm={(term) => {}} setFilterType={(filter) => {}} setAnchorType={(type) => {}} toggleInfoPanel={() => {}}/>
        );

    describe('Sub-Component Suite', (test) => {

        test('renders', () => {
            expect(result).toBeTruthy(); // check if Menu component renders
        });

        test('includes component Search', () => {
            const search = screen.queryByTestId("menu-search");
            expect(search).toBeInTheDocument(); // check if Search component renders
        });

        test('includes component FilterSelect', () => {
            const filterSelect = screen.queryByTestId("filter-select");
            expect(filterSelect).toBeInTheDocument(); // check if FilterSelect component renders
        });

        test('includes Info Panel Toggle', () => {
            const infoPanelToggle = screen.queryByTestId("menu-info-button");
            expect(infoPanelToggle).toBeInTheDocument(); // check if Info Panel Toggle renders
        });

    });

    describe('Anchor Management Suite', (test) => {

        test("when mouse enters menu, setAnchorType is called with AnchorTypes.Mouse", () => {
            const setAnchorType = jest.fn();
            render(<Menu setSearchTerm={(term) => { }} setFilterType={(filter) => { }} setAnchorType={setAnchorType} toggleInfoPanel={() => { }} />);
            const menu = screen.queryByTestId("function-menu");
            menu?.dispatchEvent(new MouseEvent('mouseenter', { bubbles: true }));
            expect(setAnchorType).toHaveBeenCalledTimes(1);
            expect(setAnchorType).toHaveBeenCalledWith(AnchorTypes.Mouse);
        });

        test("when mouse leaves menu, setAnchorType is called with AnchorTypes.Movement", () => {
            const setAnchorType = jest.fn();
            render(<Menu setSearchTerm={(term) => { }} setFilterType={(filter) => { }} setAnchorType={setAnchorType} toggleInfoPanel={() => { }} />);
            const menu = screen.queryByTestId("function-menu");
            menu?.dispatchEvent(new MouseEvent('mouseleave', { bubbles: true }));
            expect(setAnchorType).toHaveBeenCalledTimes(1);
            expect(setAnchorType).toHaveBeenCalledWith(AnchorTypes.Movement);
        });

        test("when mouse enters info button, setAnchorType is called with AnchorTypes.Hand", () => {
            const setAnchorType = jest.fn();
            render(<Menu setSearchTerm={(term) => { }} setFilterType={(filter) => { }} setAnchorType={setAnchorType} toggleInfoPanel={() => { }} />);
            const infoPanelToggle = screen.queryByTestId("menu-info-button");
            infoPanelToggle?.dispatchEvent(new MouseEvent('mouseenter', { bubbles: true }));
            expect(setAnchorType).toHaveBeenCalledTimes(1);
            expect(setAnchorType).toHaveBeenCalledWith(AnchorTypes.Hand);
        });

        test("when mouse leaves info button, setAnchorType is called with AnchorTypes.Mouse", () => {
            const setAnchorType = jest.fn();
            render(<Menu setSearchTerm={(term) => { }} setFilterType={(filter) => { }} setAnchorType={setAnchorType} toggleInfoPanel={() => { }} />);
            const infoPanelToggle = screen.queryByTestId("menu-info-button");
            infoPanelToggle?.dispatchEvent(new MouseEvent('mouseleave', { bubbles: true }));
            expect(setAnchorType).toHaveBeenCalledTimes(1);
            expect(setAnchorType).toHaveBeenCalledWith(AnchorTypes.Mouse);
        });
    })

    describe('MISC Functionality Suite', (test) => {

        test("when info button is pressed, toggleInfoPanel is called", () => {
            const toggleInfoPanel = jest.fn();
            render(<Menu setSearchTerm={(term) => { }} setFilterType={(filter) => { }} setAnchorType={(type) => { }} toggleInfoPanel={toggleInfoPanel} />);
            const infoPanelToggle = screen.queryByTestId("menu-info-button");
            infoPanelToggle?.click();
            expect(toggleInfoPanel).toHaveBeenCalledTimes(1);
        });

    });

});