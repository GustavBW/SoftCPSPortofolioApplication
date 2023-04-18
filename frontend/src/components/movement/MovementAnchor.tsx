import React, { useEffect } from  'react' ;
import './MovementAnchor.css';

export enum AnchorTypes {
    Movement =  "movement" ,
    Mouse = "mouse",
    Hand = "hand",
    Grabber = "grabber",
    Text = "text"
}

interface MovementAnchorProps {
    center: {x: number, y: number},
    mouse: {x: number, y: number},
    type: AnchorTypes
}

const movementPaths = [
    "M 0 1 L -3 4 L 0 12 L 3 4 Z",
    "M 0 -1 L -3 -4 L 0 -12 L 3 -4 Z",
    "M 1 0 L 4 -3 L 12 0 L 4 3 Z",
    "M -1 0 L -4 -3 L -12 0 L -4 3 Z",
    "M 0 -3 L 3 -6 L 6 -3 L 3 0 L 6 3 L 3 6 L 0 3 L -3 6 L -6 3 L -3 0 L -6 -3 L -3 -6 Z"
];
const grabberPaths = [
    "M 0 1 L -3 9 L 0 12 L 3 9 Z", 
    "M 0 -1 L -3 -9 L 0 -12 L 3 -9 Z", 
    "M 1 0 L 9 -3 L 12 0 L 9 3 Z", 
    "M -1 0 L -9 -3 L -12 0 L -9 3 Z", 
    "M 0 -9 L 2 -3 L 3 -2 L 9 0 L 3 2 L 2 3 L 0 9 L -2 3 L -3 2 L -9 0 L -3 -2 L -2 -3 Z"
];
const mousePaths = [
    "M -1 -1 L 6 9 L 10 9 L 10 5 Z", 
    "M -1 -1 L 6 9 L 10 9 L 10 5 Z", 
    "M -1 -1 L 10 5 L 10 9 L 6 9 Z", 
    "M 10 9 L 10 5 L -1 -1 L 6 9 Z", 
    "M -3 -3 L 11 4 L 11 10 L 5 10 Z"
];
const textPaths = [
    "M 1 -6 L -1 -6 L -1 6 L 1 6 Z", 
    "M 1 6 L -1 6 L -1 -6 L 1 -6 Z", 
    "M 1 -6 L 1 6 L -1 6 L -1 -6 Z", 
    "M 1 -6 L 1 6 L -1 6 L -1 -6 Z", 
    "M 0 -8 L 2 -6 L 2 6 L 0 8 L -2 6 L -2 -6 Z"
];

export default function MovementAnchor({ center, mouse, type }: MovementAnchorProps) {
    const [x, setX] = React.useState(mouse.x);
    const [y, setY] = React.useState(mouse.y);
    const [paths, setPaths] = React.useState(movementPaths);

    const congealPaths = () => {
        return paths[0] + paths[1] + paths[2] + paths[3] + paths[4];
    }

    useEffect(() =>{
        switch (type) {
            case AnchorTypes.Movement:
                setPaths(movementPaths);
                break;
            case AnchorTypes.Grabber:
                setPaths(grabberPaths);
                break;
            case AnchorTypes.Mouse:
                setPaths(mousePaths);
                break;
            case AnchorTypes.Text:
                setPaths(textPaths);
                break;
        }
    },[type])

 

    return (
        <div className="MovementAnchor" style={{ top: mouse.y + "px", left: mouse.x + "px", clipPath: paths[4]}}>
            <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg" viewBox="-12.1 -12.1 24.2 24.2">
                <defs>
                    <linearGradient id={"movement-anchor-gradient"} x1="0%" y1="100%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="var(--gold-3)" />
                        <stop offset="40%" stopColor="var(--gold-2)" />
                        <stop offset="90%" stopColor="var(--gold-4)" />
                    </linearGradient>
                    <linearGradient id={"movement-anchor-background"} x1="0%" y1="100%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="var(--blue-5)" />
                        <stop offset="40%" stopColor="var(--blue-4)" />
                        <stop offset="90%" stopColor="var(--blue-6)" />
                    </linearGradient>
                </defs>
                <path d={paths[0] + paths[1] + paths[2] + paths[3]} stroke="url(#movement-anchor-gradient)" strokeWidth=".5" fill="url(#movement-anchor-background)" />
                <path d={paths[4]} stroke="url(#movement-anchor-gradient)" strokeWidth=".5" fill="none" />
            </svg>
        </div>
    );
}
