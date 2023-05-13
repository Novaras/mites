export const randIntBetween = (min: number, max: number): number => Math.floor(Math.random() * (max - min + 1) + min);

export const randArrIndex = (arr: Array<unknown>) => randIntBetween(0, arr.length - 1);
export const randArrValue = (arr: Array<unknown>) => arr[randArrIndex(arr)];