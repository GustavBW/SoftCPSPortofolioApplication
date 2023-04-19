import React from 'react';
import './HealthMonitor.css';


interface HealthMonitorProps {
}

export default function HealthMonitor({ }: HealthMonitorProps) {

    
    return(
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="-2.1 -4.78301 16.2 16.88">
            <path d="M 0 0 A 1 1 0 0 1 6 0 A 1 1 0 0 1 12 0 C 12 4 9 8 6 10 C 3 8 0 4 0 0 Z M -2 3 L 2 3 L 4 0 L 8 6 L 10 3 L 14 3 M 6 12 C 11 9 14 4 14 0 C 14 -3 10 -7 6 -3 C 2 -7 -2 -3 -2 0 C -2 4 1 9 6 12" stroke="#FF0000" stroke-width="0.1" fill="none" />
        </svg>
    );
}