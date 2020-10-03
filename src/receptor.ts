import { LitLikeElement, Hormone } from "./types"
import { organism } from "./base"
import { error, trace, info } from "./log"

const receptorRegistered = <T>(
    element: LitLikeElement, 
    name: string, 
    onlyIf? : (value: T) => boolean) => 
        !organism[name]
        .receptors
        .some(receptor => 
            receptor.element === element
            && receptor.onlyIf?.toString() === onlyIf?.toString()
        )

export function useReceptor<T>(
    element: LitLikeElement, 
    {name}: Hormone<T>,
    onlyIf? : (value: T) => boolean): T | undefined {
    if (!organism[name]) {
        error("receptor.useReceptor", new Error(`Hormone is not defined`), name)
        throw new Error(`Hormone "${name}" is not defined`)
    }

    if (receptorRegistered(element, name, onlyIf)) {
        info("receptor.useReceptor", "Pushing new receptor to hormone", name, {element})
        organism[name].receptors.push({
            element,
            onlyIf
        })
    } else {
        trace("receptor.useReceptor", "Receptor not pushed because already subscribed", name, {element})
    }

    return !onlyIf || onlyIf(organism[name].value as T) ? organism[name].value : undefined
}