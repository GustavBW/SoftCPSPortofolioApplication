export function getLevenshteinDistance(a: string, b: string): number {
  const m = a.length;
  const n = b.length;

  if (m === 0) {
    return n;
  }

  if (n === 0) {
    return m;
  }

  const d: number[][] = [];

  for (let i = 0; i <= m; i++) {
    d[i] = [i];
  }

  for (let j = 0; j <= n; j++) {
    d[0][j] = j;
  }

  for (let j = 1; j <= n; j++) {
    for (let i = 1; i <= m; i++) {
      if (a[i - 1] === b[j - 1]) {
        d[i][j] = d[i - 1][j - 1];
      } else {
        d[i][j] =
          Math.min(
            d[i - 1][j], // deletion
            d[i][j - 1], // insertion
            d[i - 1][j - 1], // substitution
          ) + 1;
      }
    }
  }

  return d[m][n];
}

/**
 * Sorts an array of objects by their levenshtein distance to a given string
 * @param arr objects to sort
 * @param stringOf object to string function
 * @param term to compare to
 * @returns sorted array
 */
function levenshteinSearch<T>(arr: T[], stringOf: (t: T) => string, term: string): T[] {
    const comparator = (a: T, b: T) => {
        const distanceA = getLevenshteinDistance(stringOf(a), term);
        const distanceB = getLevenshteinDistance(stringOf(b), term);
        return distanceA - distanceB;
    };
  
    return arr.sort(comparator);
}
  