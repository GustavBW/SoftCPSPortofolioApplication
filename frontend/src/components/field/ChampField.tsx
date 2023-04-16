import React, { useEffect } from 'react';
import { Champion } from '../../ts/types';
import { getAllChampions } from '../../ts/api';
import ChampThumbnail from '../champion/ChampThumbnail';
import './ChampField.css';

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
    const [xOffsets, setXOffsets] = React.useState<number[]>([]);
    const [yOffsets, setYOffsets] = React.useState<number[]>([]);

    useEffect(() => {
        getAllChampions().then((champions) => {
            setChampions(champions);
        });
    }, []);

    useEffect(() => {
        const xs = [center.x];
        const ys = [center.y];
        const w = tileWidth;
        const h = w * 14.2 / 8.2; // adjust for non-regular hexagons

        for (let i = 1; i < champions.length; i++) {
            const xOffset: number = xs[i - 1] + (2 * (i % 2) - 1) * 3 / 2 * w
            const yOffset: number = ys[i - 1] + (2 * ((i + 1) % 2) - 1) * sqrt3 / 2 * h
            xs.push(xOffset)
            ys.push(yOffset)
        }

        setXOffsets(xs);
        setYOffsets(ys);
    }, [center, champions]);

    return (
        <div className="ChampField">
            {champions.map((champion, index) => {
                return (
                    <ChampThumbnail width={tileWidth} champion={champion} xOffset={xOffsets[index]} yOffset={yOffsets[index]} key={index} />
                )
            })}
        </div>
    );
}