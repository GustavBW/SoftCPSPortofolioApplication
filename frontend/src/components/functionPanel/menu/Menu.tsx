import React from 'react';
import './Menu.css';
import { SearchFilter } from '../../../ts/filters';
import { Champion } from '../../../ts/types';
import { AnchorTypes } from '../../movement/MovementAnchor';
import InfoPanel from '../infoPanel/InfoPanel';
import Search from './search/Search';
import FilterSelect from './filterSelect/FilterSelect';

interface MenuProps {
    setSearchTerm: (term: string) => void
    setFilterType: (filter: SearchFilter<Champion>) => void;
    setAnchorType: (type: AnchorTypes) => void;
}

export default function Menu({ setSearchTerm, setFilterType, setAnchorType }: MenuProps) {

    const [showInfo, setShowInfo] = React.useState(false);

    const getInfo = () => {
        if(showInfo){
            return (
                <InfoPanel onDeselect={() => setShowInfo(false)} visible={showInfo} title="Info" content={["some info here"]} />
            )
        }
    }

    return(
        <div className="Menu" onMouseEnter={e => setAnchorType(AnchorTypes.Mouse)} onMouseLeave={e => setAnchorType(AnchorTypes.Movement)}>

            <button className="info-container" onClick={e=>setShowInfo(true)}>
                ?
            </button>
            {getInfo()}
            <Search setSearchTerm={setSearchTerm} setAnchorType={setAnchorType} />
            
            <FilterSelect setFilterType={setFilterType} setAnchorType={setAnchorType} />
        </div>
    )
}