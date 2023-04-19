import { Champion } from "./types";

export type SearchFilter<T> = {
    apply: (item: T) => string;
    displayName: string;
    description: string;
}

export const nameFilter: SearchFilter<Champion> = { 
    apply: (champion: Champion): string => champion ? champion.name.toLowerCase() : "",
    displayName: "Name",
    description: "Search by champion name"
};
export const tagFilter: SearchFilter<Champion> = {
    apply: (champion: Champion): string => champion.tags.toLowerCase(),
    displayName: "Tag",
    description: "Search by champion tags"
};
export const keyFilter: SearchFilter<Champion> = {
    apply: (champion: Champion): string => champion.champion_key.toString(),
    displayName: "Key / ID",
    description: "Search by champion key or id"
};
export const titleFilter: SearchFilter<Champion> = {
    apply: (champion: Champion): string => champion.title.toLowerCase(),
    displayName: "Title",
    description: "Search by champion title"
};
export const loreFilter: SearchFilter<Champion> = {
    apply: (champion: Champion): string => champion.blurb.toLowerCase(),
    displayName: "Lore",
    description: "Search by champion lore"
};
export const partypeFilter: SearchFilter<Champion> = {
    apply: (champion: Champion): string => champion.partype.toLowerCase(),
    displayName: "Resource Type",
    description: "Search by champion resource type"
};


export const championFilters: SearchFilter<Champion>[] = [
    nameFilter, 
    tagFilter,
    keyFilter,
    titleFilter,
    loreFilter,
    partypeFilter
];