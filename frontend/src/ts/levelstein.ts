import { levenshteinEditDistance } from "levenshtein-edit-distance";
import { SearchFilter } from "./filters";

/**
 * Levenshtein distance algorithm. NOT IN PLACE (for useEffect reasons)
 * @param arr 
 * @param stringOf 
 * @param term 
 * @returns a new array with the sorted items
 */
const levenshteinSort = <T>(arr: T[], filter: SearchFilter<T>, term: string): T[] => {
    const sorted = arr.map((item: T) => {
        const itemString = filter.apply(item);
        const distance = levenshteinEditDistance(itemString, term);
        return {
            item,
            distance
        };
    }).sort((a, b) => a.distance - b.distance);
    return sorted.map((item) => item.item);

};
export default levenshteinSort;