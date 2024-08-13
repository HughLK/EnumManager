import { Entry, Pair, EnumItem } from './type';
// @ts-ignore
import getHash from 'js-hash-code';

class HashTable<V> {
    private _size: number;
    public _entries: Entry<V>[];
    private _DIGIT = 4;

    constructor() {
        this._size = 16;
        this._entries = new Array(this._size);
    }

    indexFor(hash: string, size: number): number {
        return Math.abs(parseInt(hash, Math.pow(2, this._DIGIT))) & size;
    }

    put(key: string, value: EnumItem<V>): void {
        const hashCode = getHash(key);
        const index = this.indexFor(hashCode, this._size);

        let entry = this._entries[index];
        if (!entry) {
            entry = {
                next: null
            }
            this._entries[index] = entry;
        }

        const { prevNode, node } = this.iterByKey(entry, key);

        // same key
        if (node) {
            node.value.push(value);
        } else {
            prevNode.next = {
                key,
                value: [value],
                next: null
            }
        }
    }

    iterByKey(entry: Entry<V>, key: string): { prevNode: Pair<V> | Entry<V>, node: Pair<V> | null } {
        let prevNode = entry;
        let node = entry.next;

        while (node && node.key !== key) {
            prevNode = prevNode.next as Pair<V>;
            node = node.next;
        }
        return { prevNode, node }
    }

    has(key: string): boolean {
        const hashCode = getHash(key);
        const index = this.indexFor(hashCode, this._size);
        let entry = this._entries[index];

        if (!entry) {
            return false;
        }

        const { node } = this.iterByKey(entry, key);
        if (node) {
            return true;
        }
        return false;
    }

    get(key: string): EnumItem<V>[] | null {
        const hashCode = getHash(key);
        const index = this.indexFor(hashCode, this._size);
        let entry = this._entries[index];

        if (!entry) {
            return null;
        }

        const { node } = this.iterByKey(entry, key);
        return node?.value ?? null;
    }
}

class EnumManager<V extends string | number | boolean> {
    private _hashTable: HashTable<V>;
    private _enumName: string = "";

    constructor() {
        this._hashTable = new HashTable();
    }

    private _getEnum() {
        return this._hashTable.get(this._enumName);
    }

    put(name: string, data: [string, V, string][]): void {
        data.forEach(item => {
            const [field, value, desc] = item;
            this._hashTable.put(name, {field, value, desc});
        });
    }

    get(name: string) {
        this._enumName = name;
        return this;
    }

    findByField(field: string) {
        const items = this._getEnum();
        return items?.find(item => item.field === field);
    }

    findByValue(value: V) {
        const items = this._getEnum();
        return items?.find(item => item.value === value);
    }

    findByDesc(desc: string) {
        const items = this._getEnum();
        return items?.find(item => item.desc === desc);
    }

    getList() {
        let items = this._getEnum();
        if(!items) {
            return [];
        }

        return items;
    }

    has(name: string) {
        return this._hashTable.has(name);
    }
}

export {EnumManager}