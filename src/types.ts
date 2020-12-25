export type Parent = unknown

export type Receptor<T> = {
    parent: Parent
    key: string
    onlyIf?: (value: T) => boolean
    onTriggered: (value: T) => Promise<void | unknown>
}

export type Transport<T> = {
    name: string,
    value: T,
    defaultValue: T,
    transformation: ((value: T) => void) | undefined,
    receptors: Receptor<T>[],
    readOnce: boolean
}

// @ts-ignore required to help type hinting
export type Hormone<T> = {
    name: string
}

export type HormoneDictionary = { [key: string]: ((value: any) => void)[] };

export type HormoneResultList = {
    [hormoneName: string]: any
}

export type HormoneActionListEntries = {
    [key: string]: {
        hormones: Hormone<any>[],
        callback: ((value: HormoneResultList) => void)
    }
}
export type HormoneActionQueueEntries = {
    [key: string]: {
        hormones: Hormone<any>[],
        values: HormoneResultList,
        callback: ((value: HormoneResultList) => void)
    }
}
export type HormoneActionQueue = {
    queue: HormoneActionQueueEntries
    list: HormoneActionListEntries
}

