// Type definitions for [enumbookjs] [v1.0.0]
// Project: [enumbookjs]
// Definitions by: [HughLK] <[https://github.com/HughLK]>

type EnumItem<V> = {
    field: string,
    value: V,
    desc?:string
}

type Pair<V> = {
    key: string,
    value: EnumItem<V>[],
    next: Pair<V> | null
}

type Entry<V> = {
    next: Pair<V> | null
}

export { EnumItem, Pair, Entry }