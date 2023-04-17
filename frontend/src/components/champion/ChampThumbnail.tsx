import React, { useEffect } from 'react';
import { Champion } from '../../ts/types';
import './ChampThumbnail.css';
import { FieldIndex } from '../../ts/fieldGenerationIterator';

interface ThumbnailProps {
    champion: Champion,
    center: {x: number, y: number},
    mouse: {x: number, y: number},
    fieldIndex: FieldIndex,
    /**
     * Width of the thumbnail in pixels. The height is derived from this.
     */
    width: number
}

const path = "M 4 0 L 0 3 L 0 11 L 4 14 L 8 11 L 8 3 Z";

export default function ChampThumbnail({ champion, center, mouse, fieldIndex, width}: ThumbnailProps) {
    const [style, setStyle] = React.useState({
        width: width + "px",
        height: (width * 14.2 / 8) + "px",
        top: (fieldIndex.y + center.y) + "px",
        left: (fieldIndex.x + center.x) + "px"
    });

    useEffect(()=>{
        setStyle({
            width: width + "px",
            height: (width * 14.2 / 8) + "px",
            top: (fieldIndex.y + center.y) + "px",
            left: (fieldIndex.x + center.x) + "px"
        });
    },[center, fieldIndex, width])

    return (
        <button className="ChampThumbnail" style={style}>
            <svg viewBox="0 0 8.2 14.2" className="frame">
                <defs>
                    <clipPath id="hexagon">
                        <path d={path} />
                    </clipPath>
                    <linearGradient id={"gradient-" + champion.champion_key} x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="var(--border-gradient-1)" />
                        <stop offset="40%" stopColor="var(--border-gradient-2)" />
                        <stop offset="90%" stopColor="var(--border-gradient-3)" />
                    </linearGradient>
                </defs>
                <pattern id={"image-" + champion.champion_key} x="0" y="0" width="1" height="1" preserveAspectRatio="xMidYMid slice">
                    <image className="clipped-image" xlinkHref={champion.thumbnailUrl}/>
                </pattern>
                <path d={path} fill={"url(#image-" + champion.champion_key+")"} clipPath="url(#hexagon)" />
                <path d={path} stroke={"url(#gradient-" + champion.champion_key+")"} strokeWidth="0.1" fill="none" />
            </svg>
        </button>
    );
}