export const formatDescription = (description: string): string[] => {
    if(description == undefined || description == null || description == "") return [];
    return JSON.parse(description);
}

export const formatCost = (cost: string): string[] => {
    if(cost == undefined || cost == null || cost == "" || cost == "\"none\"") return [];
    return new Array(JSON.parse(cost));
}