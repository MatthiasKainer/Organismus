import { Parent, Hormone } from "./types";
import { Organism } from "./base";
export declare function useReceptor<T>(parent: Parent, { name }: Hormone<T>, onTriggered: (value: T) => Promise<void | unknown> | void): void;
export declare function useReceptor<T>(parent: Parent, { name }: Hormone<T>, onlyIf: (value: T) => boolean, onTriggered: (value: T) => Promise<void | unknown> | void): void;
export declare const useScopedReceptor: (organism: Organism) => <T>(parent: Parent, { name }: Hormone<T>, onlyIfOrOnTriggered: (value: T) => boolean | Promise<void | unknown> | void, emptyOrOnTriggered?: ((value: T) => Promise<void | unknown> | void) | undefined) => void;
//# sourceMappingURL=receptor.d.ts.map