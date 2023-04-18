import React from 'react';
import { Champion } from '../../ts/types';
import './FunctionPanel.css';
import { SearchFilter } from '../../ts/filters';
import Menu from './menu/Menu';
import { AnchorTypes } from '../movement/MovementAnchor';

interface FunctionPanelProps {
    setSearchTerm: (term: string) => void;
    setFilterType: (filter: SearchFilter<Champion>) => void;
    setAnchorType: (type: AnchorTypes) => void;
}

const path = "M 0 20 L 0 10 L 10 0 L 80 0 L 90 10 L 90 20 Z";
const path2 = "M 21 20 L 23 18 L 68 18 L 70 20 Z";
const path3 = "M 1 20 L 1 7 L 7 1 L 83 1 L 89 7 L 89 20 Z";
export default function FunctionPanel({ setSearchTerm, setFilterType, setAnchorType }: FunctionPanelProps) {
    //This is just the background, the rest is in the menu component
    return (
        <div className="FunctionPanel" onMouseEnter={e=> setAnchorType(AnchorTypes.Mouse)} onMouseLeave={e=> setAnchorType(AnchorTypes.Movement)}> 
            <svg className="relative" width="100%" height="100%" id="function-panel" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 90.2 20.2"  aria-label="menu">
                <defs>
                    <clipPath id="fp-clip-path">
                        <path d={path} />
                    </clipPath>
                    <linearGradient id={"fp-border-gradient"} x1="0%" y1="100%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="var(--gold-3)" />
                        <stop offset="40%" stopColor="var(--gold-2)" />
                        <stop offset="90%" stopColor="var(--gold-4)" />
                    </linearGradient>
                </defs>
                <pattern id={"fp-image-background"} x="0" y="0" width="1" height="1" preserveAspectRatio="xMidYMid slice">
                    <image className="fp-background" xlinkHref="https://raw.communitydragon.org/latest/plugins/rcp-fe-lol-static-assets/global/default/images/lcu-article-backdrop.jpg" />
                </pattern>
                <path d={path} fill={"url(#fp-image-background)"} clipPath="url(#fp-clip-path)" />
                <path d={path} fill={"url(#fp-image-background)"} clipPath="url(#fp-clip-path)" />
                <path id="fp-path-3" d={path3} stroke="url(#fp-border-gradient)" strokeWidth="0.1" fill="url(#fp-image-1)" />
                <path id="fp-path-1" d={path} stroke="url(#fp-border-gradient)" strokeWidth="0.5" fill="url(#fp-image-1)" />
                <path id="fp-path-2" d={path2} stroke="url(#fp-border-gradient)" strokeWidth="0.1" fill="url(#fp-image-1)" />
            </svg>
            <Menu setSearchTerm={setSearchTerm} setFilterType={setFilterType} setAnchorType={setAnchorType}/>
        </div>
    );
}
