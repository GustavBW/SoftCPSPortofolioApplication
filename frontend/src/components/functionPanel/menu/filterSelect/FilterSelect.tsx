import React from 'react';
import './FilterSelect.css';
import { SearchFilter, championFilters } from '../../../../ts/filters';
import { Champion } from '../../../../ts/types';
import { AnchorTypes } from '../../../movement/MovementAnchor';


interface FiltersProps {
    setFilterType: (filter: SearchFilter<Champion>) => void;
    setAnchorType: (type: AnchorTypes) => void;
}
const path = "M 1 0 A 1 1 0 0 0 1 2 L 7 2 A 1 1 0 0 0 7 0 Z M 1 5 A 1 1 0 0 0 1 7 L 12 7 A 1 1 0 0 0 12 5 Z M 1 10 A 1 1 0 0 0 1 12 L 16 12 A 1 1 0 0 0 16 10 Z Z";
export default function FilterSelect({ setFilterType, setAnchorType }: FiltersProps) {
    const [showFilters, setShowFilters] = React.useState(false);
    const [hover, setHover] = React.useState(false);

    return (
        <div className="FilterSelect">
            <div className="filter-menu"
                style={showFilters || hover ? { width: "300%", right: "-10rem", display: "flex" } : { width: "0", display: "none" }}
                onMouseEnter={e => {setShowFilters(true); setHover(true); setAnchorType(AnchorTypes.Mouse)}}
                onMouseLeave={e => { setShowFilters(false); setHover(false)}}
            >
                {championFilters.map((filter, i) => {
                    return (
                        <button key={i} className="filter-menu-item" onClick={e => {
                            setFilterType(filter);
                            setShowFilters(false);
                            setHover(false);
                        }}>
                            {filter.displayName}
                        </button>
                    );
                })}
            </div>
            <button  className="filter-button"
                onMouseEnter={e=>setHover(true)} 
                onMouseLeave={e=>setHover(false)}
                > 
                <svg className="filter-icon" xmlns="http://www.w3.org/2000/svg" 
                    viewBox="-0.1 -0.1 17.2 12.2" width="100%" height="100%"
                    style={hover || showFilters ? {transform: "rotate(270deg)"} : {}}
                    >
                    <path d={path} fill="var(--blue-6)" />
                </svg>
            </button>

        </div>
    );
}