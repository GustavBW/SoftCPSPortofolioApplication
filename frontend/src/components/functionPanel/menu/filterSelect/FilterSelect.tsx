import React from 'react';
import './FilterSelect.css';
import { SearchFilter, championFilters } from '../../../../ts/filters';
import { Champion } from '../../../../ts/types';
import { AnchorTypes } from '../../../movement/MovementAnchor';


interface FiltersProps {
    setFilterType: (filter: SearchFilter<Champion,any>) => void;
    setAnchorType: (type: AnchorTypes) => void;
    buttonStyle?: React.CSSProperties;
}
const path = "M 1 0 A 1 1 0 0 0 1 2 L 7 2 A 1 1 0 0 0 7 0 Z M 1 5 A 1 1 0 0 0 1 7 L 12 7 A 1 1 0 0 0 12 5 Z M 1 10 A 1 1 0 0 0 1 12 L 16 12 A 1 1 0 0 0 16 10 Z Z";
export default function FilterSelect({ setFilterType, setAnchorType, buttonStyle }: FiltersProps) {
    const [showFilters, setShowFilters] = React.useState(false);
    const [selectedFilter, setSelectedFilter] = React.useState<SearchFilter<Champion,any> | null>(null); // internal only
    const [hover, setHover] = React.useState(false);

    const getButtonStyle = () => {
        if(hover || showFilters){
            return { ...{ filter: "drop-shadow(0 0 .5rem white)", borderRadius: "0" }, ...buttonStyle };
        }
        return buttonStyle;
    }

    const getMenuStyle = () => {
        if (hover || showFilters) {
            return { height: "100%" };
        }
        return { height: "0", margin: "0", padding: "0", bottom: "-100rem" };
    }

    const getAdditionalStyles = (filter: SearchFilter<Champion,any>): any => {
        if (selectedFilter && selectedFilter.displayName === filter.displayName) {
            return { borderColor: "var(--gold-2)" };
        }
        return {};
    }

    const handleFilterSelect = (filter: SearchFilter<Champion,any>) => {
        setFilterType(filter);
        setShowFilters(false);
        setHover(false);
        setSelectedFilter(filter);
    }

    return (
        <div className="FilterSelect" 
            data-testid={"filter-select"}
            >
            <button  className="filter-button"
                style={getButtonStyle()}
                
                onMouseEnter={e=>setHover(true)} 
                onMouseLeave={e=>setHover(false)}
                > 
                <svg className="filter-icon" xmlns="http://www.w3.org/2000/svg" 
                    viewBox="-0.1 -0.1 17.2 12.2" width="100%" height="100%"
                    style={hover || showFilters ? {transform: "rotate(270deg)"} : {}}
                    >
                    <path d={path} fill="white" />
                </svg>
            </button>
            <div className="filter-menu"
                style={getMenuStyle()}
                onMouseEnter={e => { setShowFilters(true); setHover(true); setAnchorType(AnchorTypes.Mouse) }}
                onMouseLeave={e => { setShowFilters(false); setHover(false) }}
            >
                {championFilters.map((filter, i) => {
                    return (
                        <button key={i} className="filter-menu-item" onClick={e => handleFilterSelect(filter)}
                            style={{ ...getMenuStyle(), ...getAdditionalStyles(filter)}}
                            title={filter.description}
                        >
                            {filter.displayName}
                        </button>
                    );
                })}
            </div>
        </div>
    );
}