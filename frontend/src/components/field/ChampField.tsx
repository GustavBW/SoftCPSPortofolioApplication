import React, { useEffect } from 'react';
import { Champion } from '../../ts/types';
import { getAllChampions } from '../../ts/api';
import ChampThumbnail from '../champion/ChampThumbnail';
import './ChampField.css';
import FieldIterator, { FieldIndex } from '../../ts/fieldGenerationIterator';

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
     * Informs the app about the radius of the field (in pixels)
     */
    setRadius: (radius: number) => void,
    /**
     * The algorithm used to sort the champion list.
     * Default: Reversed Alphabetical
     */
    algorithm?: (champions: Champion[]) => Champion[]
}

const sqrt3 = Math.sqrt(3);
const tileWidthPercent = .1; //percentage of the screen width

export default function ChampField({ center, mouse, setRadius, algorithm }: ChampFieldProps) {
    const [champions, setChampions] = React.useState<Champion[]>([]);
    const [fieldIndicies, setFieldIndicies] = React.useState<FieldIndex[]>([]);
    const [tileWidth, setTileWidth] = React.useState<number>(2 * center.x * tileWidthPercent * 1.1);

    const updatesChampionIndicies = (champs: Champion[]) => {
        if(algorithm){
            champs = algorithm(champs);
        }
        const width = 2 * center.x * tileWidthPercent * 1.1;
        const iterator = new FieldIterator(width * 1.1, width * (14.2 / 8.2) * 1.1, 0);
        const indexes: FieldIndex[] = [];
        for (let i = 0; i < champs.length; i++) {
            indexes.push(iterator.next());
        }
        indexes.push({ x: 0, y: 0, layer: 0, index: 0});
        setFieldIndicies(indexes);
        setTileWidth(width);
    }

    useEffect(() => {
        getAllChampions().then((champions) => {
            updatesChampionIndicies(champions);
            setChampions(champions);
        });
    }, [algorithm]);

    //See GenerationStrategies for more info
    useEffect(() => {
        updatesChampionIndicies(champions);
    }, [champions]);

    useEffect(() => {
        updatesChampionIndicies(champions);
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