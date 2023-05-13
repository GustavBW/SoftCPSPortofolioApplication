import { getNewestRotation } from "./api";
import { Champion, Rotation } from "./types";

export interface SearchFilter<T,R> {
    /**
     * The function to use to derive a string from an item.
     */
    apply: (item: T) => string;
    /**
     * The displayed name of the filter.
     */
    displayName: string;
    /**
     * The description of the filter.
     */
    description: string;
    /**
     * Whether or not to cull items from the list.
     * And if so, the function to use to do so.
     * gatherReducerProps must be defined alongside this.
     */
    reducer?: (item: T, state: R) => boolean;
    /**
     * The function to used to gather the reducer props.
     * As in: The state variables a given reducer function need to work.
     */
    gatherReducerProps?: () => Promise<R>;
}


export const rotationNewPlayerFilter: SearchFilter<Champion, Rotation> = {
    apply: (champion: Champion) => champion.name.toLowerCase(),
    displayName: "New Player Rotation",
    description: "Search in the current rotation available to new players",
    reducer: (champion: Champion, rotation: Rotation) => rotation.freeChampionIdsForNewPlayers.includes(champion.champion_key),
    gatherReducerProps: () => getNewestRotation()
};

export const rotationFilter: SearchFilter<Champion, Rotation> = {
    apply: (champion: Champion) => champion.name.toLowerCase(),
    displayName: "Rotation",
    description: "Search in the current rotation available to all players",
    reducer: (champion: Champion, rotation: Rotation) => rotation.freeChampionIds.includes(champion.champion_key),
    gatherReducerProps: () => getNewestRotation()
};

export const nameFilter: SearchFilter<Champion, void> = { 
    apply: (champion: Champion): string => champion ? champion.name.toLowerCase() : "",
    displayName: "Name",
    description: "Search by champion name"
};
export const tagFilter: SearchFilter<Champion, void> = {
    apply: (champion: Champion): string => champion.tags.toLowerCase(),
    displayName: "Tag",
    description: "Search by champion tags"
};
export const keyFilter: SearchFilter<Champion, void> = {
    apply: (champion: Champion): string => champion.champion_key.toString(),
    displayName: "Key / ID",
    description: "Search by champion key or id"
};
export const titleFilter: SearchFilter<Champion, void> = {
    apply: (champion: Champion): string => champion.title.toLowerCase(),
    displayName: "Title",
    description: "Search by champion title"
};
export const loreFilter: SearchFilter<Champion, void> = {
    apply: (champion: Champion): string => champion.blurb.toLowerCase(),
    displayName: "Lore",
    description: "Search by champion lore"
};
export const partypeFilter: SearchFilter<Champion, void> = {
    apply: (champion: Champion): string => champion.partype.toLowerCase(),
    displayName: "Resource Type",
    description: "Search by champion resource type"
};


export const championFilters: SearchFilter<Champion,any>[] = [
    nameFilter,
    rotationNewPlayerFilter,
    rotationFilter,
    tagFilter,
    keyFilter,
    titleFilter,
    loreFilter,
    partypeFilter
];