import React from 'react';
import './Menu.css';
import { SearchFilter } from '../../../ts/filters';
import { Champion } from '../../../ts/types';

interface MenuProps {
    setSearchTerm: (term: string) => void
    setFilterType: (filter: SearchFilter<Champion>) => void;
}

export default function Menu({ setSearchTerm, setFilterType }: MenuProps) {
    const [showSearch, setShowSearch] = React.useState(false);
    const [inputActive, setInputActive] = React.useState(false);

    return(
        <div className="Menu">
            <p>info</p>
            <button className="search-container"
                onMouseEnter={e => setShowSearch(true)}
                onMouseLeave={e => inputActive ? {} : setShowSearch(false)}>
                <div className="search-icon-left" style={showSearch ? { left: "-50%", borderRadius: "0" } : { height: "35%" }} />
                <input type="text" className="search-input"
                    onMouseEnter={e => setShowSearch(true)}
                    onMouseLeave={e => inputActive ? {} : setShowSearch(false)}
                    onFocus={e => setInputActive(true)}
                    onBlur={e => { setInputActive(false); setShowSearch(false) }}
                    onChange={e => setSearchTerm(e.target.value)}
                    placeholder="Search"
                    style={showSearch ? { width: "165%" } : { width: "0px", border: "none" }} />
                <div className="search-icon-right" style={showSearch ? { right: "-50%", borderRadius: "0" } : { height: "35%" }} />
            </button>
            <p>filter</p>
        </div>
    )
}