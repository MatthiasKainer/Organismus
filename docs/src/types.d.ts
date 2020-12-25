export declare type Parent = unknown;
export declare type Receptor<T> = {
    parent: Parent;
    key: string;
    onlyIf?: (value: T) => boolean;
    onTriggered: (value: T) => Promise<void | unknown>;
};
export declare type Transport<T> = {
    name: string;
    value: T;
    defaultValue: T;
    transformation: ((value: T) => void) | undefined;
    receptors: Receptor<T>[];
    readOnce: boolean;
};
export declare type Hormone<T> = {
    name: string;
};
export declare type HormoneDictionary = {
    [key: string]: ((value: any) => void)[];
};
export declare type HormoneResultList = {
    [hormoneName: string]: any;
};
export declare type HormoneActionListEntries = {
    [key: string]: {
        hormones: Hormone<any>[];
        callback: ((value: HormoneResultList) => void);
    };
};
export declare type HormoneActionQueueEntries = {
    [key: string]: {
        hormones: Hormone<any>[];
        values: HormoneResultList;
        callback: ((value: HormoneResultList) => void);
    };
};
export declare type HormoneActionQueue = {
    queue: HormoneActionQueueEntries;
    list: HormoneActionListEntries;
};
//# sourceMappingURL=types.d.ts.map