import { RenderResult, render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import App from '../../src/App';
import React from 'react';

describe('App Component Test Suite', (test) => {
    const result: RenderResult = render(<App />);

    test('renders', () => {
        expect(result).toBeTruthy(); // check if App component renders
    });

    test('includes component FunctionPanel', () => {
        const functionPanel = screen.queryByTestId("function-panel");
        expect(functionPanel).toBeInTheDocument(); // check if function panel renders
    });

    test("includes component ChampionView", () => {
        const championView = screen.queryByTestId("champion-view");
        expect(championView).toBeInTheDocument();
    });

    test("includes component HealthMonitor", () => {
        const healthMonitor = screen.queryByTestId("health-monitor");
        expect(healthMonitor).toBeInTheDocument();
    });

    test("includes component Champfield", () => {
        const champField = screen.queryByTestId("champion-field");
        expect(champField).toBeInTheDocument();
    });

    test("includes component InfoPanel", () => {
        const infoPanel = screen.queryByTestId("info-panel");
        expect(infoPanel).toBeInTheDocument();
    });

    test("includes component MovementAnchor", () => {
        const movementAnchor = screen.queryByTestId("movement-anchor");
        expect(movementAnchor).toBeInTheDocument();
    });
});