export const DEFAULT_ID_LENGTH = 10;

export class Manager<T extends { id: string, update: (manager: Manager<T>) => void }> {
    entities: Set<T>;

    constructor(entities?: Iterable<T>) {
        this.entities = new Set([...(entities ?? [])]);
    }

    add(entity: T) {
        this.entities.add(entity);
    }

    delete(entity: T | string) {
        const to_delete = typeof entity === "string" ? [...this.entities].find(m => m.id === entity) : entity;
        if (to_delete) {
            this.entities.delete(to_delete);
        }
    }

    update() {
        for (const entity of this.entities) {
            entity.update(this);
        }
    }
}
