import React from 'react';
import { Champion } from '../../ts/types';
import Search from '../search/Search';
import './FunctionPanel.css';

interface FunctionPanelProps {
}

const path = "M 0 20 L 0 10 L 10 0 L 80 0 L 90 10 L 90 20 Z";
const path2 = "M 21 20 L 23 18 L 68 18 L 70 20 Z";
const path3 = "M 1 20 L 1 7 L 7 1 L 83 1 L 89 7 L 89 20 Z";
export default function FunctionPanel({ }: FunctionPanelProps) {
    const [showSearch, setShowSearch] = React.useState(false);
    

    return (
        <div className="FunctionPanel">
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
            <div className="menu">
                <p>info</p>
                <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg" viewBox="-3 -0.2 42.43 42.43">
                    <defs>
                        <clipPath id="fp-search-clip-path">
                        <path d="M 33.234 30.1924 L 26.8701 23.8284 A 3 3 45 0 0 8.4853 12.5147 C 2 23 15 34 24.0416 26.6569 L 30.4056 33.0208 Z" />
                        </clipPath>
                        <mask id="fp-search-mask">
                        <rect x="0" y="0" width="100%" height="100%" fill="white" />
                        <path d="M 0 21 A 3 3 45 0 0 42.4264 21 A 3 3 45 0 0 0 21 Z" fill="black" />
                        </mask>
                    </defs>

                    <path d="M 0 21 A 3 3 45 0 0 42.4264 21 A 3 3 45 0 0 0 21 Z" fill="red" mask="url(#fp-search-mask)" />
                    {/*<path d="M 24 24 A 1 1 0 0 0 11 12 A 1 1 0 0 0 24 24" fill="green"/>*/}
                </svg>
                <Search<Champion> items={[]} displayMethod={function (item: Champion): string {
                    throw new Error('Function not implemented.');
                } } onResultChosen={function (item: Champion): void {
                    throw new Error('Function not implemented.');
                } } defaultSelection={null} style={{bottom: showSearch ? "0" : "-10rem"}}/>
                <p>filter</p>
            </div>
        </div>
    );
}
