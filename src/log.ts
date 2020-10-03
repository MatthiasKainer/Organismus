export enum LOGLEVEL {
    SILENT = 0,
    ERROR = 1,
    INFO=80,
    DEBUG=90,
    TRACE = 100
}

let loglevel = LOGLEVEL.SILENT
export const setLoglevel = (level: LOGLEVEL) => loglevel = level

type Subscriber = (level: LOGLEVEL, origin: string, message: any, ...additionals: any[]) => void

let subscribers: Subscriber[] = []
export const addSubscriber = (subscriber: Subscriber) => {
    subscribers.push(subscriber)
}

export const error = (origin: string, message: any, ...additionals: any[]) => {
    subscribers.forEach(subscriber => subscriber(LOGLEVEL.ERROR, origin, message, ...additionals))
    if (loglevel >= LOGLEVEL.ERROR) {
        console.error(message, origin, ...additionals)
    }
}

export const info = (origin: string, message: any, ...additionals: any[]) => {
    subscribers.forEach(subscriber => subscriber(LOGLEVEL.INFO, origin, message, ...additionals))
    if (loglevel >= LOGLEVEL.INFO) {
        const log = loglevel === LOGLEVEL.TRACE ? console.trace : console.log
        log(message, origin, ...additionals)
    }
}

export const debug = (origin: string, message: any, ...additionals: any[]) => {
    subscribers.forEach(subscriber => subscriber(LOGLEVEL.DEBUG, origin, message, ...additionals))
    if (loglevel >= LOGLEVEL.DEBUG) {
        const log = loglevel === LOGLEVEL.TRACE ? console.trace : console.log
        log(message, origin, ...additionals)
    }
}

export const trace = (origin: string, message: any, ...additionals: any[]) => {
    subscribers.forEach(subscriber => subscriber(LOGLEVEL.TRACE, origin, message, ...additionals))
    if (loglevel === LOGLEVEL.TRACE) {
        console.trace(message, origin, ...additionals)
    }
}