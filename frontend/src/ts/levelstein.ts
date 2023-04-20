import { levenshteinEditDistance } from "levenshtein-edit-distance";
import { SearchFilter } from "./filters";
import { Champion } from "./types";

/**
 * Levenshtein distance algorithm. NOT IN PLACE (for useEffect reasons).
 * Scewed based on a simple string.contains() check.
 * @param arr 
 * @param stringOf 
 * @param term 
 * @returns a new array with the sorted items
 */
const levenshteinSort = <T>(arr: T[], filter: SearchFilter<T>, term: string): T[] => {
    const sorted = arr.map((item: T) => {
        const itemString = filter.apply(item);
        //applying bonus distance if the term is not contained in the item
        const distance = levenshteinEditDistance(itemString, term) + (itemString.includes(term) ? 0 : 1000);
        return {
            item,
            distance
        };
    }).sort((a, b) => a.distance - b.distance);
    return sorted.map((item) => item.item);
};
export default levenshteinSort;


/**
 * Use case specific implementation.
 * Sorts a T[] based on the values of some R[].
 * @param arr Array to sort.
 * @param filter How to derive a string from an <R> value.
 * @param term What term to compare against when doing the Levenshtein distance.
 * @param guideArray Array of <R> values to compare the term agains.
 * @returns T[]
 */
export const levenshteinSort2 = <T,R>(arr: T[], filter: SearchFilter<R>, term: string, guideArray: R[]): T[] => {
    const sorted = arr.map((item: T, index: number) => {
        const championValue = filter.apply(guideArray[index]).toLowerCase();
        const distance = levenshteinEditDistance(championValue, term) + (championValue.includes(term) ? 0 : 1000);
        return {
            item,
            distance,
        };
    }).sort((a, b) => a.distance - b.distance);
    return sorted.map((item) => item.item);
};