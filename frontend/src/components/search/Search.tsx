import React, { useState } from 'react';
import "./Search.css";
import DropDownList from './dropDownList/DropDownList'
import searchIcon from '../../assets/icons/search-icon.png';

interface SearchProps<T> {
    /**
     * The items to search through and suggest.
     */
    items: T[];
    /**
     * How to display the item in the search results.
     * Temporary. Will be replaced with a component.
     */
    displayMethod: (item: T) => string;
    /**
     * Callback on item select.
     */
    onResultChosen: (item: T) => void;
    /**
     * Search algorithm. Defaults to a string contains ignoring casing.
     * Default should probably be a fuzzy search or some Levenshtein distance based one.
     * https://en.wikipedia.org/wiki/Levenshtein_distance
     */
    algorithm?: (items: T[], searchTerm: string) => T[];
    /**
     * Whether to set the selected item as the placeholder on the select.
     */
    setAsPlaceholderOnSelect?: boolean;
    /**
     * The default selection.
     */
    defaultSelection: T | null;
    style?: React.CSSProperties; 
}

function Search<T>({items, displayMethod, onResultChosen, algorithm, setAsPlaceholderOnSelect, defaultSelection, style}: SearchProps<T>) {
    const [searchTerm, setSearchTerm] = useState(defaultSelection === null ? "" : displayMethod(defaultSelection));
    const [searchResults, setSearchResults] = useState<T[]>([]);
    const [selectedItem, setSelectedItem] = useState<T | null>(defaultSelection);
  
    const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
      const term = event.target.value;
      setSearchTerm(term);
  
      const results = algorithm ? algorithm(items, term) : items.filter((item) =>
        displayMethod(item).toLowerCase().includes(term.toLowerCase())
      );
  
      setSearchResults(results);
    };

    const onResultHitSelected = (result: T) => {
        if(setAsPlaceholderOnSelect){
            setSearchTerm(displayMethod(result));
        }
        setSearchResults([]);
        setSelectedItem(result);
        onResultChosen(result)
    };

    const getResultList = () => {
        if(searchResults.length === 0 ){
            return (<></>);
        }
        return (
            <DropDownList<T> items={searchResults} onOptionSelected={onResultHitSelected} displayMethod={displayMethod}/>
        )
    }

    return (
      <div className="SearchField" style={style}>
        <div className="input-and-icon">
            <img className="search-icon" src={searchIcon} alt="searchIcon"/>
            <input className="term-input" type="text" value={searchTerm} onChange={e => handleSearch(e)}/>
        </div>
        {getResultList()}
      </div>
    );
};
export default Search;