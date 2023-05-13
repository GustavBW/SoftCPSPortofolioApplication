import React, { ReactNode } from 'react';
import './InfoPanel.css';
import { AnchorTypes } from '../../movement/MovementAnchor';
import FilterSelect from '../menu/filterSelect/FilterSelect';
import HealthMonitor from '../../healthMonitor/HealthMonitor';
import HealthIcon from '../../healthMonitor/healthIcon/HealthIcon';

const path = `
    M 0 2 L 2 0 L 24 0 L 26 2 L 24 0 L 2 0 L 0 2 Z M 2 2 L 0 4 L 0 29 L 2 31 L 0 29 L 0 4 L 2 2 Z M 24 2 L 26 4 L 26 29 L 24 31 L 26 29 L 26 4 L 24 2 Z M 0 31 L 2 33 L 24 33 L 26 31 L 24 33 L 2 33 Z
`;

const imgFillPath = `
    M 0 2 L 2 0 L 24 0 L 26 2 L 26 31 L 24 33 L 2 33 L 0 31 L 0 2 L 0 2 Z
`;

const pathsHeart: string[] = [
    "M 2 5 A 1 1 0 0 1 8 5 A 1 1 0 0 1 14 5 C 14 9 11 13 8 15 C 5 13 2 9 2 5 Z",
    "M 0 8 L 4 8 L 6 5 L 10 11 L 12 8 L 16 8 L 12 8 L 10 11 L 6 5 L 4 8 L 0 8 Z",
    "M 8 17 C 13 14 16 9 16 5 C 16 2 12 -2 8 2 C 4 -2 0 2 0 5 C 0 9 3 14 8 17"
];
const pathsFlatline: string[] = [
    "M 2 5 A 1 1 0 0 1 8 5 A 1 1 0 0 1 14 5 C 14 9 11 13 8 15 C 5 13 2 9 2 5 Z",
    "M 0 8 L 4 8 L 6 8 L 10 8 L 12 8 L 16 8 L 16 7 L 10 7 L 6 7 L 4 7 L 0 7 Z",
    "M 8 17 C 13 14 16 9 16 5 C 16 2 12 -2 8 2 C 4 -2 0 2 0 5 C 0 9 3 14 8 17"
];
const pathsClose: string[] = [
    "M 12 13 L 7 8 L 2 13 L 1 12 L 6 7 L 1 2 L 2 1 L 7 6 L 12 1 L 13 2 L 8 7 L 13 12 Z",
    "M 7 9 L 2 14 L 2 12 L 0 12 L 5 7 L 0 2 L 2 2 L 2 0 L 7 5 L 12 0 L 12 2 L 14 2 L 9 7 L 14 12 L 12 12 L 12 14 Z",
    "M 7 9 L 2 14 L 2 12 L 0 12 L 5 7 L 0 2 L 2 2 L 2 0 L 7 5 L 12 0 L 12 2 L 14 2 L 9 7 L 14 12 L 12 12 L 12 14 Z"
];

interface InfoPanelProps {
    /**
     * Whatever to run when the panel is closed or deselected
     */
    show: boolean
    onDeselect: () => void,
    setAnchorType: (type: AnchorTypes) => void,
}

export default function InfoPanel({ onDeselect, show, setAnchorType }: InfoPanelProps) {

    return (
        <div className="InfoPanel" 
            style={show ? { bottom: "20%" } : { bottom: "200%" }}
            onMouseEnter={() => setAnchorType(AnchorTypes.Mouse)}
            data-testid="info-panel"
            >
            <div className="ip-body">
                <h1 className="info-panel-title">SLS</h1>
                <div className="info-panel-content">
                    <div className="ip-row">
                        <p>You can choose what type of information you are looking for in the filter menu</p>
                        <FilterSelect setAnchorType={setAnchorType} setFilterType={() => { }}/>
                    </div>
                    <div className="ip-row">
                        <p>Within the health monitor, you can find the latest fetch time data</p>
                        <HealthIcon hover={false} connectionError={false} paths={pathsHeart} showHealthInfo={false}/>
                    </div>
                    <div className="ip-row">
                        <p>Unless the backend isn't currently running</p>
                        <HealthIcon hover={false} connectionError={true} paths={pathsFlatline} showHealthInfo={false} />
                    </div>
                </div>
                <button className="info-panel-close" onClick={e => onDeselect()}
                    onMouseEnter={e => setAnchorType(AnchorTypes.Hand)}
                    onMouseLeave={e => setAnchorType(AnchorTypes.Mouse)}
                >X</button>
            </div>
            <svg className="info-panel-frame" viewBox="0 0 26 33" width="100%" height="100%">
                <defs>
                    <linearGradient id={"ip-border-gradient"} x1="0%" y1="100%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="var(--gold-3)" />
                        <stop offset="20%" stopColor="var(--gold-4)" />
                        <stop offset="40%" stopColor="var(--gold-2)" />
                        <stop offset="60%" stopColor="var(--gold-3)" />
                        <stop offset="80%" stopColor="var(--gold-4)" />
                        <stop offset="100%" stopColor="var(--gold-2)" />
                    </linearGradient>
                    <clipPath id="ip-clip-path">
                        <path d={imgFillPath} />
                    </clipPath>
                    <linearGradient id={"ip-image"} x1="0%" y1="100%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="var(--blue-6)" />
                        <stop offset="100%" stopColor="var(--blue-5)" />
                    </linearGradient>
                </defs>
                <path d={imgFillPath} fill={"url(#ip-image)"} clipPath="url(#ip-clip-path)" />
                <path d={path} stroke={"url(#ip-border-gradient)"} strokeWidth={.2}/>
            </svg>
    
        </div>
    )
}