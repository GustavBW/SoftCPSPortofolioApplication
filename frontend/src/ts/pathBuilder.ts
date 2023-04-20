/**
 * The probability distribution function for a normal distribution. 
 * As a goes towards infinity, the result approaches rangeEnd.Same goes for when a goes towards negative infinity.
 * In this case pulled from own project "Procedual-Web-Graphics" 
 * @param value the value to map to the range
 * @param rangeStart exclusive
 * @param rangeEnd exclusive
 * @returns the value mapped to the range
 */
export function mapToRange(value: number, rangeStart: number, rangeEnd: number): number {
    return (1 / (1 + Math.E ** -value)) * (rangeEnd - rangeStart) + rangeStart;
}

/**
 * The path generated will expect a 0 0 1 1 viewBox.
 * @param objects Objects to derive path from
 * @param getX method with which to get an X "coordinate"
 * @param getY method with which to get a Y "coordinate"
 * @param scew makes differences in values more pronounced
 * @returns 
 */
export function toPath<T>(objects: T[], getY: (object: T) => number, scew: number): string{
    let path = "M 1 " + getY(objects[0]) + " ";

    for(let i = 1; i < objects.length; i++) {
        if (!isValidEntry(getY(objects[i]))) continue;
        path += "L " + i + " " + getY(objects[i]) + " ";
    }

    //now walk it back so it doesnt fill
    for(let i = objects.length - 1; i >= 0; i--) {
        if (!isValidEntry(getY(objects[i]))) continue;
        path += "L " + i + " " + getY(objects[i]) + " ";
    }

    path += "Z";

    return path;
}

export const toPolyLine = <T>(objects: T[], getY: (object: T) => number): string => {

    let path = "";

    for(let i = 0; i < objects.length; i++) {
        path += 0 + "," + getY(objects[i]) + " ";
    }

    path += " Z";

    return path;

}

export const isValidEntry = (value: number): boolean => {
    return value !== Number.NEGATIVE_INFINITY && value !== Number.POSITIVE_INFINITY && value !== undefined;
}

export const onInfiniteReturnN = (value: number, n: number): number => {
    if(value === Number.NEGATIVE_INFINITY || value === Number.POSITIVE_INFINITY) return n;
    return value;
}