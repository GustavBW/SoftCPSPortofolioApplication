import iterateField, { FieldIndex, FieldIteratorState } from '../../src/ts/fieldGenerationIterator';
import { expect, it, describe } from 'vitest';

const fieldIndexComparator = ( a: FieldIndex, b: FieldIndex ): number => {
    if ( a.layer < b.layer ) return -1;
    if ( a.layer > b.layer ) return 1;
    if ( a.index < b.index ) return -1;
    if ( a.index > b.index ) return 1;
    if ( a.x < b.x ) return -1;
    if ( a.x > b.x ) return 1;
    if ( a.y < b.y ) return -1;
    if ( a.y > b.y ) return 1;
    return 0;
}

const getState = (): FieldIteratorState => {
    return {
        index: 3,
        layer: 1,
        latest: { x: -20, y: 7.5 },
        width: 10,
        height: 10,
        pointer: 2,
        rawWidth: 10,
        rawHeight: 10,
    };
}

describe('Field Iterator Test Suite', () => {
    it('should return unique, valid indexes for a given provided state', () => {
        const state: FieldIteratorState = getState();

        const actual: FieldIndex[] = [];

        for (let i = 0; i < 200; i++) {
            actual.push(iterateField(state));
        }

        for(let i = 1; i < actual.length; i++) { //skip the first since its the center and special
            const index = actual[i];
            Object.keys(index).forEach(key => {
                expect(index[key]).toBeDefined();
            });

            expect(index.layer).toBeGreaterThanOrEqual(0);
            expect(index.index).toBeGreaterThanOrEqual(0);

            for(let j = 0; j < i; j++) {
                const otherIndex = actual[j];
                expect(fieldIndexComparator(index, otherIndex)).not.toBe(0);
            }
        }
    });

    it('should remain completely stateless', () => {
        const samples: FieldIndex[] = [];

        for (let i = 0; i < 20; i++) {
            samples.push(iterateField(getState())); //copy the state
        }

        samples.map((index, i) => {
            samples.map((otherIndex, j) => {
                expect(fieldIndexComparator(index, otherIndex)).toBe(0); //no difference
            });
        });
    });
});