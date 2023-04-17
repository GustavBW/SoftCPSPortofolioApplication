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
    setRadius: (radius: number) => void
}

const sqrt3 = Math.sqrt(3);
const tileWidth = 200; //px

export default function ChampField({ center, mouse, setRadius }: ChampFieldProps) {
    const [champions, setChampions] = React.useState<Champion[]>([]);
    const [fieldIndexs, setFieldIndexs] = React.useState<FieldIndex[]>([]);

    useEffect(() => {
        getAllChampions().then((champions) => {
            setChampions(champions);
            
        });
    }, []);

    //See GenerationStrategies for more info
    useEffect(() => {
        const iterator = new FieldIterator(tileWidth, tileWidth * 14.2 / 8.2, 0);
        setFieldIndexs(champions.map(() => {
            return iterator.next();
        }));
    }, [champions]);

    return (
        <div className="ChampField">
            {champions.map((champion, index) => {
                return (
                    <ChampThumbnail width={tileWidth} center={center} mouse={mouse} champion={champion} fieldIndex={fieldIndexs[index]} key={index} />
                )
            })}
        </div>
    );
}