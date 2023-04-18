import React from   'react' ;
import "./DropDownList.css";


interface DropDownListProps<T> {
    /**
     * The items to search through and suggest.
     * @param items
    */
    items: T[];
    /**
     * Callback on option select.
     */
    onOptionSelected: (item: T) => void;
    /**
     * How to display each item in the results.
     * Temporary. Will be replaced with a component.
     */ 
    displayMethod: (item: T) => string;
}

function DropDownList<T>({items, onOptionSelected, displayMethod}: DropDownListProps<T>): JSX.Element {
    return (
        <ul className="DropDownList" >
            {items.map((option,index) => (
                <li key={index} className="option" onClick={e => onOptionSelected(option)}>{displayMethod(option)}</li>
            ))}
        </ul>
    );
}
export default DropDownList;