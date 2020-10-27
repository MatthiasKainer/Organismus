import { Parent, Hormone } from "./types";
export declare function useReceptor<T>(parent: Parent, { name }: Hormone<T>, onTriggered: (value: T) => Promise<void | unknown>): void;
export declare function useReceptor<T>(parent: Parent, { name }: Hormone<T>, onlyIf: (value: T) => boolean, onTriggered: (value: T) => Promise<void | unknown>): void;
//# sourceMappingURL=receptor.d.ts.map