export interface IIdentifiable {
    id: string;
}

export class Storage<T extends IIdentifiable> {
    protected items: Map<string, T> = new Map();

    add(item: T): void {
        if (this.items.has(item.id)) {
            throw new Error(`Item with ID ${item.id} already exists.`);
        }
        this.items.set(item.id, item);
    }

    getById(id: string): T | undefined {
        return this.items.get(id);
    }

    getAll(): T[] {
        return Array.from(this.items.values());
    }

    update(id: string, updatedItem: Partial<T>): T {
        const item = this.getById(id);
        if (!item) {
            throw new Error(`Item with ID ${id} not found.`);
        }
        const newItem = { ...item, ...updatedItem } as T;
        this.items.set(id, newItem);
        return newItem;
    }

    delete(id: string): boolean {
        return this.items.delete(id);
    }

    find(predicate: (item: T) => boolean): T | undefined {
        for (const item of this.items.values()) {
            if (predicate(item)) return item;
        }
        return undefined;
    }

    filter(predicate: (item: T) => boolean): T[] {
        return Array.from(this.items.values()).filter(predicate);
    }
}
