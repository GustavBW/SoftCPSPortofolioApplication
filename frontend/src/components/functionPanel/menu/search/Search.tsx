import React from 'react';
import './Search.css';
import { AnchorTypes } from '../../../movement/MovementAnchor';

interface SearchProps {
    setSearchTerm: (term: string) => void
    setAnchorType: (type: AnchorTypes) => void;
}

export default function Search({ setSearchTerm, setAnchorType }: SearchProps) {
    const [showSearch, setShowSearch] = React.useState(false);
    const [inputActive, setInputActive] = React.useState(false);

    return(
        <button className="Search"
            onMouseEnter={e => setShowSearch(true)}
            onMouseLeave={e => { inputActive ? {} : setShowSearch(false); setAnchorType(AnchorTypes.Mouse) }}
            data-testid={"menu-search"}
        >
            <svg className="search-icon-left" //this is the left half circle
                style={showSearch ? { left: "-52%", borderRadius: "0" } : { height: "35%" }}
                xmlns="http://www.w3.org/2000/svg"
                viewBox="-0.1 -0.1 1.2 2.2">
                <defs>
                    <linearGradient id="spyglass-border-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="var(--border-gradient-1)" />
                        <stop offset="40%" stopColor="var(--border-gradient-2)" />
                        <stop offset="90%" stopColor="var(--border-gradient-3)" />
                    </linearGradient>
                </defs>
                <path d="M 1 0 A 1 1 0 0 0 1 2 M 1 2 Z" 
                    stroke={showSearch || inputActive ? "url(#spyglass-border-gradient)" : "white"}  
                    strokeWidth="0.2" fill="none" 
                />
            </svg>

            <input type="text" className="search-input" data-testid={"menu-search-input"}
                onMouseEnter={e => { setShowSearch(true); setAnchorType(AnchorTypes.Text) }}
                onMouseLeave={e => { inputActive ? {} : setShowSearch(false); setAnchorType(AnchorTypes.Mouse) }}
                onFocus={e => { setInputActive(true); setAnchorType(AnchorTypes.Text) }}
                onBlur={e => { setInputActive(false); setShowSearch(false); setAnchorType(AnchorTypes.Mouse) }}
                onChange={e => setSearchTerm(e.target.value)}
                placeholder="Search"
                style={showSearch ? { width: "165%" } : { width: "0px", backgroundColor: "transparent", border: "none" }}
            />

            <svg className="search-icon-right"
                style={showSearch ? { right: "-52%", borderRadius: "0" } : { height: "35%" }}
                xmlns="http://www.w3.org/2000/svg"
                viewBox="-0.1 -0.1 1.2 2.2">
                <path d="M 0 2 A 1 1 0 0 0 0 0 M 0 0 Z" 
                    stroke={showSearch || inputActive ? "url(#spyglass-border-gradient)" : "white"} 
                    strokeWidth="0.2" fill="none" />
            </svg>
            <div className="spyglass-doo-hickey" style={showSearch || inputActive ? { display: "none" } : {}} />
        </button>   
    )
}