import React, { ReactNode } from 'react';
import './InfoPanel.css';

const path = "M 10 -12 C 10 -10 11 -9 13 -9 M 12 -10 C 13 -10 14 -10 14 -9 L 14 9 C 14 10 13 10 12 10 M 13 9 C 11 9 10 11 10 12 M 11 11 C 11 13 10 13 10 13 L -9 13 C -10 13 -10 12 -10 11 M -9 12 C -9 10 -10 9 -12 9 M -11 10 C -12 10 -13 10 -13 9 L -13 -9 C -13 -10 -12 -10 -11 -10 M -12 -9 C -10 -9 -9 -10 -9 -12 M -10 -11 C -10 -12 -10 -13 -9 -13 L 10 -13 C 11 -13 11 -12 11 -11";

interface InfoPanelProps {
    title: string,
    content: ReactNode[],
    /**
     * Whatever to run when the panel is closed or deselected
     */
    onDeselect: () => void,
    visible: boolean
}

export default function InfoPanel({ title, content, onDeselect, visible }: InfoPanelProps) {

    return (
        <div className="InfoPanel" onBlur={e => onDeselect()} onMouseLeave={e => onDeselect()}>
            <svg className="info-panel-frame" viewBox="-13.1 -13.1 27.2 26.2" width="100%" height="100%" style={visible ? { display: "flex" } : { display: "hidden" }}>
                <path d={path} />
            </svg>
            <button className="info-panel-close" onClick={e => onDeselect()}>X</button>
            <h1 className="info-panel-title">{title}</h1>
            <div className="info-panel-content">
                {content}
            </div>
        </div>
    )
}