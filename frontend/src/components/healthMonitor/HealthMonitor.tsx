import React from 'react';
import './HealthMonitor.css';
import { AnchorTypes } from '../movement/MovementAnchor';
import HealthPanel from './healthPanel/HealthPanel';


interface HealthMonitorProps {
    setAnchorType: (type: AnchorTypes) => void;
}

const pathsHeart: string[] = [
    "M 2 5 A 1 1 0 0 1 8 5 A 1 1 0 0 1 14 5 C 14 9 11 13 8 15 C 5 13 2 9 2 5 Z",
    "M 0 8 L 4 8 L 6 5 L 10 11 L 12 8 L 16 8 L 12 8 L 10 11 L 6 5 L 4 8 L 0 8 Z",
    "M 8 17 C 13 14 16 9 16 5 C 16 2 12 -2 8 2 C 4 -2 0 2 0 5 C 0 9 3 14 8 17"
];
const pathsClose: string[] = [
    "M 12 13 L 7 8 L 2 13 L 1 12 L 6 7 L 1 2 L 2 1 L 7 6 L 12 1 L 13 2 L 8 7 L 13 12 Z", 
    "M 7 9 L 2 14 L 2 12 L 0 12 L 5 7 L 0 2 L 2 2 L 2 0 L 7 5 L 12 0 L 12 2 L 14 2 L 9 7 L 14 12 L 12 12 L 12 14 Z",
    "M 7 9 L 2 14 L 2 12 L 0 12 L 5 7 L 0 2 L 2 2 L 2 0 L 7 5 L 12 0 L 12 2 L 14 2 L 9 7 L 14 12 L 12 12 L 12 14 Z"
];

export default function HealthMonitor({ setAnchorType }: HealthMonitorProps) {
    const [hover, setHover] = React.useState(false);
    const [showHealthInfo, setShowHealthInfo] = React.useState(false);

    const getPath = (): string[] => {
        if (!showHealthInfo) {
            return pathsClose;
        } else {
            return pathsHeart;
        }
    }

    return(

        <div className="HealthMonitor" 
            onMouseEnter={e=>setAnchorType(AnchorTypes.Mouse)} 
            onMouseLeave={e=>setAnchorType(AnchorTypes.Movement)}>
            <HealthPanel setAnchorType={setAnchorType} style={showHealthInfo ? { right: "-33%" } : { right: "0%" }} onDeselect={() => setShowHealthInfo(false)} />

            <svg className="health-monitor-icon" 
                width="50%" height="50%" 
                xmlns="http://www.w3.org/2000/svg" 
                viewBox="-0.1 0.216986 16.2 16.88"
                onMouseEnter={e=>setHover(true)}
                onMouseLeave={e=>setHover(false)}
                >
                <defs>
                    <linearGradient id="health-monitor-blue" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="var(--blue-4)" />
                        <stop offset="50%" stopColor="var(--blue-3)" />
                        <stop offset="100%" stopColor="var(--blue-5)" />
                    </linearGradient>
                    <linearGradient id="health-monitor-gold" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="var(--gold-4)" />
                        <stop offset="50%" stopColor="var(--gold-3)" />
                        <stop offset="100%" stopColor="var(--gold-5)" />
                    </linearGradient>

                </defs>
                
                <path className="health-monitor-icon" d={getPath()[0]} stroke="url(#health-monitor-gold)" 
                    strokeWidth="0.2" fill="url(#health-monitor-blue)" 
                    style={{filter: hover ? "drop-shadow(0px 0px 5px var(--gold-3))" : "none"}}
                    />
                <path className="health-monitor-icon" d={getPath()[1]} stroke="url(#health-monitor-gold)" strokeWidth="0.3" fill="none" />
                <path className="health-monitor-icon" d={getPath()[2]} stroke="url(#health-monitor-gold)" strokeWidth="0.3" fill="none" />
            </svg>
            <div className="hm-background" />
            <button className="hm-button" onClick={e=>{setShowHealthInfo(!showHealthInfo)}}/>

        </div>
    );
}