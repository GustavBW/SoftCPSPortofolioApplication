import React from 'react';
import './Menu.css';
import { SearchFilter } from '../../../ts/filters';
import { Champion } from '../../../ts/types';
import { AnchorTypes } from '../../movement/MovementAnchor';
import Search from './search/Search';
import FilterSelect from './filterSelect/FilterSelect';

interface MenuProps {
    setSearchTerm: (term: string) => void
    setFilterType: (filter: SearchFilter<Champion,any>) => void;
    setAnchorType: (type: AnchorTypes) => void;
    toggleInfoPanel: () => void;
}

export default function Menu({ setSearchTerm, setFilterType, setAnchorType, toggleInfoPanel }: MenuProps) {

    return(
        <div className="Menu" onMouseEnter={e => setAnchorType(AnchorTypes.Mouse)} onMouseLeave={e => setAnchorType(AnchorTypes.Movement)}
            data-testid={"function-menu"}
        >

            <button className="info-container" onClick={e => toggleInfoPanel()}
                onMouseEnter={e => setAnchorType(AnchorTypes.Hand)} onMouseLeave={e => setAnchorType(AnchorTypes.Mouse)}
                data-testid={"menu-info-button"}
            >?</button>
    
            <Search setSearchTerm={setSearchTerm} setAnchorType={setAnchorType} />
            
            <FilterSelect setFilterType={setFilterType} setAnchorType={setAnchorType} />
        </div>
    )
}