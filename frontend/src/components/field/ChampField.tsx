import React, { useEffect } from 'react';
import { Champion } from '../../ts/types';
import { getAllChampions } from '../../ts/api';
import ChampThumbnail from '../champion/ChampThumbnail';
import './ChampField.css';
import iterateField, { FieldIndex, FieldIteratorState } from '../../ts/fieldGenerationIterator';
import { SearchFilter } from '../../ts/filters';
import Spinner from '../loadingSpinner/Spinner';
import { AnchorTypes } from '../movement/MovementAnchor';
import levenshteinSort from '../../ts/levenshtein';

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
    filterOn: SearchFilter<Champion,any>,
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
    const [displayedChampions, setDisplayedChampions] = React.useState<Champion[]>([]);
    const [champions, setChampions] = React.useState<Champion[]>([]);
    const [fieldIndicies, setFieldIndicies] = React.useState<FieldIndex[]>([]);
    const [tileWidth, setTileWidth] = React.useState<number>(2 * center.x * tileWidthPercent * 1.1);
    const [isLoading, setIsLoading] = React.useState<boolean>(true);

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
            setDisplayedChampions(champs);
            setChampions(champs);
            setIsLoading(false);
        });
    }, []);

    useEffect(() => {
        const timeA = performance.now();
        let champsToSort = [...champions];

        const prepPropsAndApply = async(
                    reducer: (item: Champion, state: any) => boolean,
                    stateGatherer: () => Promise<any>
                ): Promise<Champion[]> => {
            const reducerState = await stateGatherer();
            return champsToSort.filter(t => reducer(t, reducerState));
        }
        if (filterOn.reducer) {
            prepPropsAndApply(filterOn.reducer, filterOn.gatherReducerProps!).then((reducedChampions) => {
                setDisplayedChampions(levenshteinSort(reducedChampions, filterOn, searchTerm.toLowerCase()));
                const timeB = performance.now();
                console.log(`sorting and reducing took ${timeB - timeA} ms`);
            });
        }else{
            setDisplayedChampions(levenshteinSort(champsToSort, filterOn, searchTerm.toLowerCase()));
            const timeB = performance.now();
            console.log(`sorting took ${timeB - timeA} ms`);
        }

        //theres no excuse to bad search fields when levenshtein exists - and is very fast

    }, [searchTerm, filterOn]);

    //See GenerationStrategies for more info
    useEffect(() => {
        updateChampionIndicies(champions);
    }, [champions]);

    useEffect(() => {
        updateChampionIndicies(displayedChampions);
    }, [center]);

    const getSpinner = () => {
        if(isLoading) {
            return <Spinner />
        }
    }

    return (
        <div className="ChampField" data-testid={"champion-field"}>
            {getSpinner()}
            {displayedChampions.map((champion, index) => {
                return (
                    <ChampThumbnail setSelectedChampion={setSelectedChampion} 
                        width={tileWidth} 
                        center={center} 
                        mouse={mouse} 
                        champion={champion} 
                        fieldIndex={fieldIndicies[index]} 
                        key={index} 
                        setAnchorType={setAnchorType} 
                        />
                )
            })}
        </div>
    );
}
