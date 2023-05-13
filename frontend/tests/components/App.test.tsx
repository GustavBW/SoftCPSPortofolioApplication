import { RenderResult, render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import App from '../../src/App';
import React from 'react';

describe('App Component Test Suite', (test) => {

    test('renders', () => {
        const result: RenderResult = render(<App />);
        expect(result).toBeTruthy(); // check if App component renders
    });

    test('includes component FunctionPanel', () => {
        const result: RenderResult = render(<App />);
        const functionPanel = result.queryByTestId("function-panel");
        expect(functionPanel).toBeInTheDocument(); // check if function panel renders
    });

    test("does not initially include component ChampionView", () => {
        const result: RenderResult = render(<App />);
        const championView = result.queryByTestId("champion-view");
        expect(championView).not.toBeInTheDocument();
    });

    test("includes component HealthMonitor", () => {
        const result: RenderResult = render(<App />);
        const healthMonitor = result.queryByTestId("health-monitor");
        expect(healthMonitor).toBeInTheDocument();
    });

    test("includes component Champfield", () => {
        const result: RenderResult = render(<App />);
        const champField = result.queryByTestId("champion-field");
        expect(champField).toBeInTheDocument();
    });

    test("includes component InfoPanel", () => {
        const result: RenderResult = render(<App />);
        const infoPanel = result.queryByTestId("info-panel");
        expect(infoPanel).toBeInTheDocument();
    });

    test("includes component MovementAnchor", () => {
        const result: RenderResult = render(<App />);
        const movementAnchor = result.queryByTestId("movement-anchor");
        expect(movementAnchor).toBeInTheDocument();
    });
});