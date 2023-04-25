import React from 'react';
import './ChampionView.css';

import { Champion } from '../../../ts/types';
import { AnchorTypes } from '../../movement/MovementAnchor';


interface ChampionViewProps {
    champion: Champion | null;
    onDeselect: () => void;
    show: boolean;
    setAnchorType: (type: AnchorTypes) => void;
}

const framePaths: string[] = [
    "M 6 4 C 6 10 14 17 6 22 L 6 70 A 4 4 90 0 1 15 84 L 34 96 L 90 96 L 109 84 A 4 4 90 0 1 118 70 L 118 22 C 110 17 118 10 118 4 Z",
    "M 0 13 A 4 4 90 0 1 8 24 L 8 67 C 14 64 27 72 18 84 L 34 94 L 47 94 L 54 101 L 58 101 L 62 105 L 66 101 L 70 101 L 79 94 L 90 94 L 106 84 C 97 72 110 64 116 67 L 116 24 A 4 4 90 0 1 124 13 L 124 0 L 0 0 Z",
    "M 54 99 L 62 107 L 70 99 L 67 102 L 63 102 L 62 103 L 61 102 L 57 102 L 54 99 Z",
    "M 62 99 L 65 96 L 62 93 L 59 96 Z"
]

const closePaths: string[] = [
    "M 12 9 L 24 3 L 24 0 L 12 6 L 0 0 L 0 3 Z", //V
     "M 12 13 L 24 7 L 24 10 L 12 16 L 0 10 L 0 7 Z", //V 
     "M 12 19 L 16 17 L 16 9 L 22 6 L 18 1 L 12 4 L 6 1 L 2 6 L 8 9 L 8 17 Z" //wierd thing
];

export default function ChampionView({ champion, onDeselect, show, setAnchorType }: ChampionViewProps) {
    const [imgIsReady, setImgIsReady] = React.useState(false);
    const [closeIsHovered, setCloseIsHovered] = React.useState(false);

    const getViewStyle = () => {
        if(!show){
            return {
                top: '-100%',
            }
        }
        return {}
    }

    const getImgStyle = () => {
        if(!imgIsReady){
            return {
                opacity: 0,
            }
        }
        return {opacity: 1}
    }

    if (champion === null){
        return (
            <div className="Empty Champion View"/>
        );
    }

    return (
        <div className="ChampionView" 
            style={getViewStyle()} 
            onMouseEnter={e=>setAnchorType(AnchorTypes.Hand)} onMouseLeave={e => {()=>onDeselect()}}
            >
            <div className="cw-content">
                <div className="name-and-title">
                    <h1 className="name">{champion.name}</h1>
                    <h2 className="title">{champion.title}</h2>
                </div>

                <p className="lore">{champion.blurb}</p>

                <button className="close-button" 
                    onClick={e => onDeselect()}
                    onMouseEnter={() => setCloseIsHovered(true)}
                    onMouseLeave={() => setCloseIsHovered(false)}
                    >
                    <svg viewBox="0 0 24 19" xmlns="http://www.w3.org/2000/svg" 
                        width="150%" height="150%"
                        style={closeIsHovered ? {filter: "drop-shadow(0,0,.5rem, white"} : {}}
                        >
                        <path d={closePaths[2]} fill="url(#cw-radiant-gradient)" strokeWidth=".1"/>
                        <path d={closePaths[0]} fill="url(#cw-metal-gradient)" strokeWidth="1" />
                        <path d={closePaths[1]} fill="url(#cw-metal-gradient)" strokeWidth="1" />
                    </svg>
                </button>
            </div>

            <div className="stat-crystals">
                <div className="atk-crystal" title="Attack">
                    <h2>
                        {champion.attack}
                    </h2>
                </div>
                <div className="def-crystal" title="Defense">
                    <h2>
                        {champion.defense}
                    </h2>
                </div>
                <div className="mag-crystal" title="Magick">
                    <h2>
                        {champion.magic}
                    </h2>
                </div>
                <div className="dif-crystal" title="Difficulty">
                    <h2>
                        {champion.difficulty}
                    </h2>
                </div>
            </div>

            <div className="cw-frame">
                <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg" viewBox="-0.1 -0.1 124.2 107.2" className="cw-frame">
                    <defs>
                        <clipPath id="portrait-clip">
                            <path d={framePaths[1]} />
                        </clipPath>
                        <linearGradient id="cw-radiant-gradient" x1="0%" y1="0%" x2="0%" y2="100%">
                            <stop offset="0%" stopColor="var(--blue-5)" />
                            <stop offset="50%" stopColor="var(--blue-3)" />
                            <stop offset="100%" stopColor="var(--blue-4" />
                        </linearGradient>
                        <linearGradient id="cw-metal-gradient" x1="0%" y1="0%" x2="100%" y2="0">
                            <stop offset="0%" stopColor="var(--gold-5)" />
                            <stop offset="20%" stopColor="var(--gold-3)" />
                            <stop offset="45%" stopColor="var(--gold-4)" />
                            <stop offset="50%" stopColor="var(--gold-5)" />
                            <stop offset="70%" stopColor="var(--gold-3)" />
                            <stop offset="100%" stopColor="var(--gold-4)" />
                        </linearGradient>
                        <linearGradient id="cw-silver-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                            <stop offset="0%" stopColor="var(--grey-4)" />
                            <stop offset="20%" stopColor="var(--grey-2)" />
                            <stop offset="45%" stopColor="var(--grey-5)" />
                            <stop offset="70%" stopColor="var(--grey-4)" />
                            <stop offset="900%" stopColor="var(--grey-2)" />
                            <stop offset="100%" stopColor="var(--grey-5)" />
                        </linearGradient>
                        <linearGradient id="cw-image-lower-cover" x1="0" y1="0" x2="0" y2="100%">
                            <stop offset="65%" stopColor="transparent" />
                            <stop offset="70%" stopColor="rgba(0,0,0,.5)" />
                            <stop offset="85%" stopColor="black" />
                        </linearGradient>
                        <linearGradient id="cw-image-upper-cover" x1="0" y1="0" x2="0" y2="100%">
                            <stop offset="16%" stopColor="black" />
                            <stop offset="23%" stopColor="rgba(0,0,0,.5)" />
                            <stop offset="25%" stopColor="transparent" />
                        </linearGradient>
                        <pattern id="cw-background-image" x="0" y="0" width="100%" height="100%" preserveAspectRatio="xMidYMid slice">
                            <image className="portrait" style={{ zIndex: "-10" }} xlinkHref={champion.imageUrl} />
                        </pattern>
                    </defs>
                    {/* The big silver shape */}
                    <path d={framePaths[0]} stroke="none" strokeWidth="1" fill="url(#cw-silver-gradient)" />
                    
                    {/* The one with the image */}
                    <path d={framePaths[1]} stroke="none" strokeWidth="1" fill="url(#cw-background-image)" clipPath="url(#portrait-clip)" />
                    {/* The golden border around the image */}
                    <path d={framePaths[1]} stroke="url(#cw-metal-gradient)" strokeWidth="1" fill="none" />

                    {/* The black gradient over the top of the image */}
                    <path d={framePaths[1]} stroke="none" fill="url(#cw-image-upper-cover)" clipPath="url(#portrait-clip)" />
                    {/* The black gradient over the bottom of the image */}
                    <path d={framePaths[1]} stroke="none" fill="url(#cw-image-lower-cover)" clipPath="url(#portrait-clip)" />

                    {/* The little v shape at the bottom */}
                    <path d={framePaths[2]} stroke="url(#cw-metal-gradient)" strokeWidth=".5" fill="rgba(0,0,0,-5)" />
                    
                </svg>
            </div>
        </div>
    )
}
