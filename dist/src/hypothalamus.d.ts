import { Hormone, HormoneDictionary, HormoneResultList } from "./types";
export declare function getValue<T>(hormone: Hormone<T>, values: HormoneResultList): T;
export declare function getId(hormone: Hormone<any>[]): string;
declare class Hypothalamus {
    actionDictionary: HormoneDictionary;
    on<T>(hormone: Hormone<T>, release: (value: T) => void): void;
    on<T>(hormone: Hormone<any>[], release: (value: {
        [hormoneName: string]: any;
    }) => void): void;
    drop<T>(hormone: Hormone<T>): void;
    drop<T>(hormone: Hormone<any>[]): void;
    dropAll(): void;
    collect<T>(allOf: Hormone<T>, triggerOn: Hormone<T>, release: (value: {
        [hormoneName: string]: any;
    }) => void): void;
    orchestrate<T>(hormone: Hormone<T>, value: T): void;
}
export declare const hypothalamus: Hypothalamus;
export {};
//# sourceMappingURL=hypothalamus.d.ts.map