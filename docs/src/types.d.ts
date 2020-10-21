export declare type LitLikeElement = {
    updateComplete: Promise<unknown>;
    requestUpdate: () => void;
};
export declare type Receptor<T> = {
    onlyIf?: (value: T) => boolean;
    element: LitLikeElement;
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