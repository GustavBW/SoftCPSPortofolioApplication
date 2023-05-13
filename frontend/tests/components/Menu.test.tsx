import { RenderResult, render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import {createMockFn} from '../../src/ts/mock';

import Menu from '../../src/components/functionPanel/menu/Menu';
import React from 'react';
import { AnchorTypes } from '../../src/components/movement/MovementAnchor';

describe('Menu Component Test Suite', (test) => {

    describe('Sub-Component Suite', (test) => {

        test('renders', () => {
            const result: RenderResult = render(
                <Menu setSearchTerm={(term) => { }} setFilterType={(filter) => { }} setAnchorType={(type) => { }} toggleInfoPanel={() => { }} />
            );
            expect(result).toBeTruthy(); // check if Menu component renders
        });

        test('includes component Search', () => {
            const result: RenderResult = render(
                <Menu setSearchTerm={(term) => { }} setFilterType={(filter) => { }} setAnchorType={(type) => { }} toggleInfoPanel={() => { }} />
            );
            const search = result.queryByTestId("menu-search");
            expect(search).toBeInTheDocument(); // check if Search component renders
        });

        test('includes component FilterSelect', () => {
            const result: RenderResult = render(
                <Menu setSearchTerm={(term) => { }} setFilterType={(filter) => { }} setAnchorType={(type) => { }} toggleInfoPanel={() => { }} />
            );
            const filterSelect = result.queryByTestId("filter-select");
            expect(filterSelect).toBeInTheDocument(); // check if FilterSelect component renders
        });

        test('includes Info Panel Toggle', () => {
            const result: RenderResult = render(
                <Menu setSearchTerm={(term) => { }} setFilterType={(filter) => { }} setAnchorType={(type) => { }} toggleInfoPanel={() => { }} />
            );
            const infoPanelToggle = result.queryByTestId("menu-info-button");
            expect(infoPanelToggle).toBeInTheDocument(); // check if Info Panel Toggle renders
        });

    });

    describe('Anchor Management Suite', (test) => {

        test("when mouse enters menu, setAnchorType is called with AnchorTypes.Mouse", () => {
            const setAnchorType = (type: AnchorTypes) => {
                expect(type).toEqual(AnchorTypes.Mouse);
            };
            const result: RenderResult = render(
                <Menu setSearchTerm={(term) => { }} setFilterType={(filter) => { }} setAnchorType={setAnchorType} toggleInfoPanel={() => { }} />
            );
            const menu = result.queryByTestId("function-menu");
            menu?.dispatchEvent(new MouseEvent('mouseenter', { bubbles: true }));
        });

        test("when mouse leaves menu, setAnchorType is called with AnchorTypes.Movement", () => {
            const setAnchorType = (type: AnchorTypes) => {
                expect(type).toEqual(AnchorTypes.Movement);
            };
            const result: RenderResult = render(
                <Menu setSearchTerm={(term) => { }} setFilterType={(filter) => { }} setAnchorType={setAnchorType} toggleInfoPanel={() => { }} />
            );
            const menu = result.queryByTestId("function-menu");
            menu?.dispatchEvent(new MouseEvent('mouseleave', { bubbles: true }));
        });

        test("when mouse enters info button, setAnchorType is called with AnchorTypes.Hand", () => {
            const setAnchorType = (type: AnchorTypes) => {
                expect(type).toEqual(AnchorTypes.Hand);
            };
            const result: RenderResult = render(
                <Menu setSearchTerm={(term) => { }} setFilterType={(filter) => { }} setAnchorType={setAnchorType} toggleInfoPanel={() => { }} />
            ); 
            const infoPanelToggle = result.queryByTestId("menu-info-button");
            infoPanelToggle?.dispatchEvent(new MouseEvent('mouseenter', { bubbles: true }));
        });

        test("when mouse leaves info button, setAnchorType is called with AnchorTypes.Mouse", () => {
            const setAnchorType = (type: AnchorTypes) => {
                expect(type).toEqual(AnchorTypes.Mouse);
            };
            const result: RenderResult = render(
                <Menu setSearchTerm={(term) => { }} setFilterType={(filter) => { }} setAnchorType={setAnchorType} toggleInfoPanel={() => { }} />
            ); 
            const infoPanelToggle = result.queryByTestId("menu-info-button");
            infoPanelToggle?.dispatchEvent(new MouseEvent('mouseleave', { bubbles: true }));
        });
    })

    describe('MISC Functionality Suite', (test) => {

        test("when info button is pressed, toggleInfoPanel is called", () => {
            let callCount = 0;
            const toggleInfoPanel = () => {callCount++;};
            const result: RenderResult = render(
                <Menu setSearchTerm={(term) => { }} setFilterType={(filter) => { }} setAnchorType={() => { }} toggleInfoPanel={toggleInfoPanel} />
            ); const infoPanelToggle = result.queryByTestId("menu-info-button");
            infoPanelToggle?.click();
            expect(callCount).toEqual(1);
        });

    });

});