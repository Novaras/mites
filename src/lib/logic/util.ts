export const randIntBetween = (min: number, max: number): number => Math.floor(Math.random() * (max - min + 1) + min);

export const randArrIndex = (arr: Array<unknown>) => randIntBetween(0, arr.length - 1);
export const randArrValue = (arr: Array<unknown>) => arr[randArrIndex(arr)];

export const shuffleArray = (arr: unknown[]) => {
    for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
    }
}