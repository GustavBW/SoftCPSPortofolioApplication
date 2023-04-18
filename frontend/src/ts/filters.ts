import { Champion } from "./types";

export type SearchFilter<T> = {
    apply: (item: T) => string;
    displayName: string;
}

export const nameFilter: SearchFilter<Champion> = { 
    apply: (champion: Champion): string => champion ? champion.name.toLowerCase() : "",
    displayName: "Name"
};
export const tagFilter: SearchFilter<Champion> = {
    apply: (champion: Champion): string => champion.tags.toLowerCase(),
    displayName: "Tag"
};

export const championFilters: SearchFilter<Champion>[] = [nameFilter, tagFilter];