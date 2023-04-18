import React from 'react';
import './Menu.css';
import { SearchFilter } from '../../../ts/filters';
import { Champion } from '../../../ts/types';
import { AnchorTypes } from '../../movement/MovementAnchor';
import InfoPanel from '../infoPanel/InfoPanel';

interface MenuProps {
    setSearchTerm: (term: string) => void
    setFilterType: (filter: SearchFilter<Champion>) => void;
    setAnchorType: (type: AnchorTypes) => void;
}

export default function Menu({ setSearchTerm, setFilterType, setAnchorType }: MenuProps) {
    const [showSearch, setShowSearch] = React.useState(false);
    const [inputActive, setInputActive] = React.useState(false);
    const [showInfo, setShowInfo] = React.useState(false);

    return(
        <div className="Menu" onMouseEnter={e => setAnchorType(AnchorTypes.Mouse)} onMouseLeave={e => setAnchorType(AnchorTypes.Movement)}>

            <button className="info-container" onClick={e=>setShowInfo(true)}>
                i
            </button>
            {/*<InfoPanel onDeselect={() => setShowInfo(false)} visible={showInfo} title="Info" content={["some info here"]} />*/}

            <button className="search-container"
                onMouseEnter={e => setShowSearch(true)}
                onMouseLeave={e => {inputActive ? {} : setShowSearch(false); setAnchorType(AnchorTypes.Mouse)}}>
                <div className="search-icon-left" style={showSearch ? { left: "-50%", borderRadius: "0" } : { height: "35%" }} />
                <input type="text" className="search-input"
                    onMouseEnter={e => { setShowSearch(true); setAnchorType(AnchorTypes.Text)}}
                    onMouseLeave={e => {inputActive ? {} : setShowSearch(false); setAnchorType(AnchorTypes.Mouse)}}
                    onFocus={e => { setInputActive(true); setAnchorType(AnchorTypes.Text) }}
                    onBlur={e => { setInputActive(false); setShowSearch(false); setAnchorType(AnchorTypes.Mouse) }}
                    onChange={e => setSearchTerm(e.target.value)}
                    placeholder="Search"
                    style={showSearch ? { width: "165%" } : { width: "0px", backgroundColor: "transparent", border: "none" }} />
                <div className="search-icon-right" style={showSearch ? { right: "-50%", borderRadius: "0" } : { height: "35%" }} />
                <div className="spyglass-doo-hickey" style={showSearch || inputActive ? { display: "none" } : {}} />
            </button>
            <p>filter</p>
        </div>
    )
}