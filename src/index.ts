import { Organism } from "./base";
import { defineScopedHormone, releaseScopedHormone } from "./hormone";
import { useScopedReceptor } from "./receptor";

export { defineHormone, getOrDefineHormone, defineSingleHormone, releaseHormone } from "./hormone";

export { useReceptor } from "./receptor";
export { hypothalamus } from "./hypothalamus"

export * from "./types";
export {setLoglevel, LOGLEVEL} from "./log"

export function Organismus() {
    const organism: Organism = {}
    return {
        defineHormone: defineScopedHormone(organism),
        releaseHormone: releaseScopedHormone(organism),
        useReceptor: useScopedReceptor(organism)
    }
}