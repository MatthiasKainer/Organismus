export declare enum LOGLEVEL {
    SILENT = 0,
    ERROR = 1,
    INFO = 80,
    DEBUG = 90,
    TRACE = 100
}
export declare const setLoglevel: (level: LOGLEVEL) => LOGLEVEL;
declare type Subscriber = (level: LOGLEVEL, origin: string, message: any, ...additionals: any[]) => void;
export declare const addSubscriber: (subscriber: Subscriber) => void;
export declare const error: (origin: string, message: any, ...additionals: any[]) => void;
export declare const info: (origin: string, message: any, ...additionals: any[]) => void;
export declare const debug: (origin: string, message: any, ...additionals: any[]) => void;
export declare const trace: (origin: string, message: any, ...additionals: any[]) => void;
export {};
//# sourceMappingURL=log.d.ts.map