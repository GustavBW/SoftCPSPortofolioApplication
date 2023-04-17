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

//const path = "M 4 0 L 0 3 L 0 11 L 4 14 L 8 11 L 8 3 Z";

export default function ChampThumbnail({ champion, center, mouse, fieldIndex, width}: ThumbnailProps) {
    const [path, setPath] = React.useState<string>("M 4 0 L 0 3 L 0 11 L 4 14 L 8 11 L 8 3 Z");
    const height = width * 14.2 / 8;
    const [style, setStyle] = React.useState({
        width: width + "px",
        height: height + "px",
        top: (fieldIndex.y + center.y) + "px",
        left: (fieldIndex.x + center.x) + "px"
    });
    const [hover, setHover] = React.useState(false);

    const updatePositioning = () => {
        setStyle({
            width: width + "px",
            height: height + "px",
            top: (fieldIndex.y + center.y) + "px",
            left: (fieldIndex.x + center.x) + "px"
        });
    }

    useEffect(()=>{
        updatePositioning();
    },[center, fieldIndex, width, mouse]);

    return (
        <button className="ChampThumbnail" style={style} onClick={e => console.log("You clicked; " + champion.name)} 
            onMouseOver={e => setHover(true)}
            onMouseLeave={e => setHover(false)}
            aria-label={champion.name}
            >
            {hover ? <h1 className="name-tag">{champion.name}</h1> : <></>}
            <svg viewBox={`0 0 8.2 14.2`} className="frame">
                <defs>
                    <clipPath id="hexagon">
                        <path d={path} />
                    </clipPath>
                    <linearGradient id={"border-gradient-" + champion.champion_key} x1="0%" y1="100%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="var(--border-gradient-1)" />
                        <stop offset="40%" stopColor="var(--border-gradient-2)" />
                        <stop offset="90%" stopColor="var(--border-gradient-3)" />
                    </linearGradient>
                    <linearGradient id={"gradient-" + champion.champion_key} x1="0%" y1="0%" x2="0%" y2="100%">
                        <stop offset="0%" stopColor="transparent" />
                        <stop offset="50%" stopColor="transparent" />
                        <stop offset="80%" stopColor="rgba(0,0,0,.8)" />
                    </linearGradient>
                </defs>
                <pattern id={"image-" + champion.champion_key} x="0" y="0" width="1" height="1" preserveAspectRatio="xMidYMid slice">
                    <image className={`clipped-image ${ hover ? "" : ""}`  } xlinkHref={champion.thumbnailUrl}/>
                </pattern>
                <path d={path} fill={"url(#image-" + champion.champion_key+")"} clipPath="url(#hexagon)" 
                />
                <path d={path} stroke={"url(#border-gradient-" + champion.champion_key+")"} strokeWidth="0.1" fill="none" />
                <path d={path} fill={"url(#gradient-" + champion.champion_key+")"} className={hover ? "" : "hidden"} />
            </svg>
        </button>
    );
}