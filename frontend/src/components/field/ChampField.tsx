import React, { useEffect } from 'react';
import { Champion } from '../../ts/types';
import { getAllChampions } from '../../ts/api';
import ChampThumbnail from '../champion/ChampThumbnail';
import './ChampField.css';
import iterateField, { FieldIndex, FieldIteratorState } from '../../ts/fieldGenerationIterator';
import { SearchFilter } from '../../ts/filters';
import levenshteinSort from '../../ts/levenshtein';
import Spinner from '../loadingSpinner/Spinner';
import { AnchorTypes } from '../movement/MovementAnchor';

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
    searchTerm: string,
    setAnchorType: (type: AnchorTypes) => void,
    setSelectedChampion: (champion: Champion) => void
}

const sqrt3 = Math.sqrt(3);
const tileWidthPercent = .075; //percentage of the screen width

export default function ChampField({ center, mouse, filterOn, searchTerm, setAnchorType, setSelectedChampion }: ChampFieldProps) {
    const [champions, setChampions] = React.useState<Champion[]>([]);
    const [fieldIndicies, setFieldIndicies] = React.useState<FieldIndex[]>([]);
    const [tileWidth, setTileWidth] = React.useState<number>(2 * center.x * tileWidthPercent * 1.1);
    const [isLoading, setIsLoading] = React.useState<boolean>(true);
    const [error, setError] = React.useState<boolean>(false);

    const updateChampionIndicies = (champs: Champion[]) => {
        const width = 2 * center.x * tileWidthPercent * 1.1;
        const state: FieldIteratorState = {
            layer: 0, 
            index: 0, 
            width: width * 1.1,
            height: width * (14.2 / 8.2) * 1.1, 
            pointer: 0,
            rawWidth: width,
            rawHeight: width * (14.2 / 8.2),
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
            setIsLoading(false);
        }).catch(err => {
            setError(true);
            console.log("Unable to gather champion data.")
        });
    }, []);

    useEffect(() => {
        //theres no excuse to bad search fields when levenshtein exists - and is very fast
        setChampions(levenshteinSort(champions, filterOn, searchTerm.toLowerCase()));
    }, [searchTerm]);

    useEffect(() => {
        updateChampionIndicies(champions);
    }, [champions]);

    useEffect(() => {
        updateChampionIndicies(champions);
    },[center]);

    const getSpinner = () => {
        if(isLoading) {
            return <Spinner />
        }
    }

    return (
        <div className="ChampField">
            {getSpinner()}
            {champions.map((champion, index) => {
                return (
                    <ChampThumbnail setSelectedChampion={setSelectedChampion} width={tileWidth} center={center} mouse={mouse} champion={champion} fieldIndex={fieldIndicies[index]} key={index} setAnchorType={setAnchorType} />
                )
            })}
        </div>
    );
}
