import React from 'react';
import './HealthPanel.css';
import { getLatestFetchTimeData } from '../../../ts/api';
import { FetchTimeData } from '../../../ts/types';
import { AnchorTypes } from '../../movement/MovementAnchor';

interface HealthPanelProps {
    onDeselect: () => void;
    style: {},
    setAnchorType: (type: AnchorTypes) => void;
}

export default function HealthPanel({ onDeselect, style, setAnchorType }: HealthPanelProps) {
    const [entries, setEntries] = React.useState(100);
    const [pollingRate, setPollingRate] = React.useState(1000);
    const [fetchTimes, setFetchTimes] = React.useState<FetchTimeData[]>([]);

    React.useEffect(() => {
        const interval = setInterval(() => {
            getLatestFetchTimeData(entries).then(times => {
                setFetchTimes(times);
            });
        }, pollingRate);
        return () => clearInterval(interval);
    }, [entries, pollingRate]);

    return(
        <div className="HealthPanel" style={style} onMouseLeave={e=>onDeselect()}>
            <div className="HealthPanel-header">
                <h1 className="title">SLS Health</h1>
            </div>
            <div className="fetch-time-container">

                <h2 className="fetch-time-title">Fetch Times</h2>

                <p>GRAPH HERE</p>

                <div className="fetch-time-options">
                    <div className="input-label-pair" onMouseEnter={e => setAnchorType(AnchorTypes.Text)} onMouseLeave={e => setAnchorType(AnchorTypes.Mouse)}>
                        <label htmlFor="entries" className="entries-label" title="How many entries to gather and show">Entries ?</label>
                        <input name="entries" className="entries-input" type="number" value={entries} onChange={e => setEntries(parseInt(e.target.value))} />
                    </div>
                    <div className="input-label-pair" onMouseEnter={e => setAnchorType(AnchorTypes.Text)} onMouseLeave={e => setAnchorType(AnchorTypes.Mouse)}>
                        <label htmlFor="polling-rate" className="fetch-time-label" title="How often to refresh data">Polling Rate ?</label>
                        <input name="polling-rate" className="polling-rate-input" type="number" value={pollingRate} onChange={e=>setPollingRate(parseInt(e.target.value))} />
                       
                    </div>
                </div>
            </div>
        </div>
    );
}