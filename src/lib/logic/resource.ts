import { nanoid } from "nanoid";
import { DEFAULT_ID_LENGTH } from "./manager";

export type ResourceLike = Resource | { id?: string, age?: number, red?: number, green?: number, blue?: number } | number;

export class Resource {
    id: string;

    age: number;

    red: number;
    green: number;
    blue: number;

    get white() {
        return (this.red + this.green + this.blue) / 3;
    }

    constructor(resource_like: ResourceLike) {
        const as_obj = typeof resource_like === "number" ? { red: resource_like, green: resource_like, blue: resource_like } : resource_like;

        this.age = as_obj.age ?? 0;

        this.red = as_obj.red ?? 0;
        this.green = as_obj.green ?? 0;
        this.blue = as_obj.blue ?? 0;

        this.id = as_obj.id ?? nanoid(DEFAULT_ID_LENGTH);
    }

    update() {
        this.age += 1;
    }
}