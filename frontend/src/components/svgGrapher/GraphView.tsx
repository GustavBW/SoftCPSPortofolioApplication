import React, { useEffect } from 'react';
import './GraphView.css';
import { AnchorTypes } from '../movement/MovementAnchor';
import { CartesianGrid, Line, LineChart, Tooltip, XAxis, YAxis } from 'recharts';


interface GraphView<T> {
    style?: React.CSSProperties;
    data?: T[];
    xKey: string;
    yKey: string;
    contentStyle?: {};
    setAnchorType: (type: AnchorTypes) => void;
    center: { x: number, y: number};
    widthHeightScalars: { x: number, y: number};
}

export default function GraphView<T>({ style, data, xKey, yKey, setAnchorType, contentStyle, center, widthHeightScalars }: GraphView<T>) {
    return (
        <LineChart data={data} style={style} className="GraphView"
            width={(2 * center.x) * widthHeightScalars.x} 
            height={(2 * center.y) * widthHeightScalars.y} 
            onMouseEnter={e=>setAnchorType(AnchorTypes.Mouse)}
            >

            <Line type="monotone" dataKey="fetchTimeMs" stroke="#8884d8" />
            <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
            <Tooltip contentStyle={contentStyle} />
            <XAxis dataKey={xKey} />
            <YAxis dataKey={yKey} />
        </LineChart>
    );
}