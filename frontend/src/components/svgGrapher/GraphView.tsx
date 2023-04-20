import React, { useEffect } from 'react';
import './GraphView.css';
import { AnchorTypes } from '../movement/MovementAnchor';
import { CartesianGrid, Line, LineChart, Tooltip, XAxis, YAxis } from 'recharts';


interface GraphView<T> {
    style?: React.CSSProperties;
    data?: T[];
    colors?: string[];
    contentStyle?: {};
    setAnchorType: (type: AnchorTypes) => void;
    center: { x: number, y: number};
    widthHeightScalars?: { x: number, y: number};
}

export default function GraphView<T>({ style, data, colors, setAnchorType, contentStyle, center, widthHeightScalars }: GraphView<T>) {
    const [scalars, setScalars] = React.useState(widthHeightScalars ? widthHeightScalars : { x: 1, y: 1 });


    useEffect(() => { //safeguarding against any unexpected async behavior
 
    }, [data]);

    return (
        <LineChart data={data} style={style} className="GraphView"
            width={(2 * center.x) * scalars.x} 
            height={(2 * center.y) * scalars.y} 
            onMouseEnter={e=>setAnchorType(AnchorTypes.Mouse)}
            >

            <Line type="monotone" dataKey="fetch_time_ms" stroke="#8884d8" />
            <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
            <Tooltip contentStyle={contentStyle} />
            <XAxis dataKey="timestamp" />
            <YAxis dataKey="fetch_time_ms" />
        </LineChart>
    );
}