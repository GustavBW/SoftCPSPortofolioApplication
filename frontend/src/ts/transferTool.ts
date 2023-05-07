export const formatDescription = (description: string): string[] => {
    if(description == undefined || description == null || description == "") return [];
    return description
        .substring(3, description.length - 3)
        .split("\",\"")
        .map((item: string) => item.trim())
        .filter((item: string) => item !== "");
}