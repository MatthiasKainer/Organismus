import { Hormone, Transport } from "./types";
declare type HormoneOptions<T> = {
    defaultValue?: T;
    transformation?: (value: T) => void;
    readOnce?: boolean;
    loadIfExists?: boolean;
};
export declare function defineReadOnceHormone<T>(name: string, options?: HormoneOptions<T>): Hormone<T>;
export declare function defineHormone<T>(name: string, options?: HormoneOptions<T>): Hormone<T>;
export declare function releaseHormone<T>({ name }: Hormone<T>, value?: T): Promise<Transport<T>>;
export declare function releaseHormone<T>({ name }: Hormone<T>, onRelease: (values: T) => T): Promise<Transport<T>>;
export {};
//# sourceMappingURL=hormone.d.ts.map