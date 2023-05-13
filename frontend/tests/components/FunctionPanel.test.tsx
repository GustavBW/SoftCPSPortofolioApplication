import { RenderResult, render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import FunctionPanel from '../../src/components/functionPanel/FunctionPanel';
import React from 'react';

describe('FunctionPanel Component Test Suite', (test) => {

    const result: RenderResult = render(
        <FunctionPanel setSearchTerm={(term) => {}} setFilterType={(filter) => {}} setAnchorType={(type) => {}} toggleInfoPanel={() => {}}/>
        );

    test('renders', () => {
        expect(result).toBeTruthy(); // check if FunctionPanel component renders
    });

    test('includes component Menu', () => {
        const menu = screen.queryByTestId("function-menu");
        expect(menu).toBeInTheDocument(); // check if SearchBar component renders
    });
});