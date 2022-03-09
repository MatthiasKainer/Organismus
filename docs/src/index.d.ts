export { defineHormone, getOrDefineHormone, defineSingleHormone, releaseHormone } from "./hormone";
export { useReceptor } from "./receptor";
export { hypothalamus } from "./hypothalamus";
export * from "./types";
export { setLoglevel, LOGLEVEL } from "./log";
export declare function Organismus(): {
    defineHormone: <T>(name: string, options?: {
        defaultValue?: T | undefined;
        transformation?: ((value: T) => void) | undefined;
        readOnce?: boolean | undefined;
        loadIfExists?: boolean | undefined;
    }) => import("./types").Hormone<T>;
    releaseHormone: <T_1>(hormone: import("./types").Hormone<T_1>, value?: T_1 | ((values: T_1) => T_1) | undefined) => Promise<import("./types").Transport<T_1>>;
    useReceptor: <T_2>(parent: unknown, { name }: import("./types").Hormone<T_2>, onlyIfOrOnTriggered: (value: T_2) => boolean | void | Promise<unknown>, emptyOrOnTriggered?: ((value: T_2) => void | Promise<unknown>) | undefined) => void;
};
//# sourceMappingURL=index.d.ts.map