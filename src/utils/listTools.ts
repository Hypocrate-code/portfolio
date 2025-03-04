export function getRandomElements<T>(arr: T[], n: number): T[] {
    const result = new Set<T>();
    while (result.size < n) {
        const randomIndex = Math.floor(Math.random() * arr.length);
        result.add(arr[randomIndex]);
    }
    return Array.from(result);
}
