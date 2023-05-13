import React, { useEffect } from 'react';
import './HealthMonitor.css';
import { AnchorTypes } from '../movement/MovementAnchor';
import HealthPanel from './healthPanel/HealthPanel';
import HealthIcon from './healthIcon/HealthIcon';


interface HealthMonitorProps {
    setAnchorType: (type: AnchorTypes) => void;
    center: {x: number, y: number};
    showHealthPanel: boolean;
    setShowHealthPanel: (value: boolean) => void;
}

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

export default function HealthMonitor({ setAnchorType, center, showHealthPanel, setShowHealthPanel }: HealthMonitorProps) {
    const [hover, setHover] = React.useState(false);
    const [connectionError, setConnectionError] = React.useState(false);
    const [paths, setPaths] = React.useState(pathsHeart);

    useEffect(() =>{
        if (connectionError) {
            setPaths(pathsFlatline);
        } else if (showHealthPanel) {
            setPaths(pathsClose);
        } else {
            setPaths(pathsHeart);
        }
    }, [connectionError, showHealthPanel])

    return(
        <div className="HealthMonitor" 
            data-testid="health-monitor"
        >
            <HealthPanel setAnchorType={setAnchorType} 
                style={showHealthPanel ? { right: "0%" } : { right: "-33%" }} 
                onDeselect={() => {}} //do nothing
                onError={(state: boolean) => setConnectionError(state)}
                center={center} //my graphs library doesnt scale at all, so I made it
            />

            <HealthIcon hover={hover} paths={paths} 
                connectionError={connectionError} showHealthInfo={showHealthPanel}
                iconStyle={{
                    top: "0",
                    right: "0",
                    marginTop: "5%",
                    marginRight: "-.75vw",
                    position: "absolute",
                    zIndex: "101"
                }}  
                />

           
            <div className="hm-background" />
            <button className="hm-button" 
                onClick={e => { setShowHealthPanel(!showHealthPanel) }}
                onMouseEnter={e => { setAnchorType(AnchorTypes.Mouse); setHover(true) }}
                onMouseLeave={e => { setAnchorType(AnchorTypes.Movement); setHover(false) }}
            />

        </div>
    );
}