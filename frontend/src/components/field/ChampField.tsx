import React, { useEffect } from 'react';
import { Champion } from '../../ts/types';
import { getAllChampions } from '../../ts/api';
import ChampThumbnail from '../champion/ChampThumbnail';
import './ChampField.css';
import iterateField, { FieldIndex, FieldIteratorState } from '../../ts/fieldGenerationIterator';
import { SearchFilter } from '../../ts/filters';
import levenshteinSort from '../../ts/levelstein';

interface ChampFieldProps {
    /**
     * Absolute center of the field (in pixels)
     */
    center: {x: number, y: number},
    /**
     * Absolute position of the mouse (in pixels)
     */ 
    mouse: {x: number, y: number},
    /**
     * What aspect of champion data to sort based on
     * Default: name
     */
    filterOn: SearchFilter<Champion>,
    /**
     * The algorithm used to sort the champion list.
     * Default: Reversed Alphabetical
     */
    searchTerm: string
}

const sqrt3 = Math.sqrt(3);
const tileWidthPercent = .075; //percentage of the screen width

export default function ChampField({ center, mouse, filterOn, searchTerm }: ChampFieldProps) {
    const [champions, setChampions] = React.useState<Champion[]>([]);
    const [fieldIndicies, setFieldIndicies] = React.useState<FieldIndex[]>([]);
    const [tileWidth, setTileWidth] = React.useState<number>(2 * center.x * tileWidthPercent * 1.1);
    

    console.log(filterOn)

    const updateChampionIndicies = (champs: Champion[]) => {
        const width = 2 * center.x * tileWidthPercent * 1.1;
        const state: FieldIteratorState = {
            layer: 0, index: 0, width: width * 1.1, height: width * (14.2 / 8.2) * 1.1, pointer: 0, 
        };
        const indexes: FieldIndex[] = [];
        for (let i = 0; i < champs.length; i++) {
            indexes.push(iterateField(state));
        }
        indexes.push({ x: 0, y: 0, layer: 0, index: 0});
        setFieldIndicies(indexes);
        setTileWidth(width);
    }

    useEffect(() => {
        const timeA = performance.now();
        getAllChampions().then(champs => {
            console.log(`fetching champions took ${performance.now() - timeA} ms`);
            updateChampionIndicies(champs);
            setChampions(champs);
        });
    }, []);

    useEffect(() => {
        const timeA = performance.now();
        setChampions(levenshteinSort(champions, filterOn, searchTerm));
        const timeB = performance.now();
        console.log(`sorting took ${timeB - timeA} ms`);
    }, [searchTerm, filterOn]);

    //See GenerationStrategies for more info
    useEffect(() => {
        updateChampionIndicies(champions);
    }, [champions]);

    useEffect(() => {
        updateChampionIndicies(champions);
    },[center]);

    return (
        <div className="ChampField">
            {champions.map((champion, index) => {
                return (
                    <ChampThumbnail width={tileWidth} center={center} mouse={mouse} champion={champion} fieldIndex={fieldIndicies[index]} key={index} />
                )
            })}
        </div>
    );
}
