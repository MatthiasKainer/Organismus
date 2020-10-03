import { LitLikeElement } from "./types"
import { testableLitElement } from "./testHelpers"
import { useReceptor } from "./receptor"
import { organism } from "./base"
import { defineHormone } from "./hormone"

describe("[useReceptor] Given I have a receptor", () => {
    const name = "test"
    let litElement: LitLikeElement
    beforeEach(() => {
        litElement = testableLitElement()
    })

    describe("When I use the receptor for a hormone that does not exist", () => {
        it("fails", () => {
            expect(() => useReceptor(litElement, { name }))
                .toThrowError(new Error(`Hormone "${name}" is not defined`))
        })
    })

    describe("When I use the receptor in an lit-element", () => {
        beforeEach(() => {
            useReceptor(litElement, defineHormone(name))
        })

        it("adds the element to the organism", () => {
            expect(organism[name]
                .receptors
                .some(receptor => receptor.element === litElement)
            ).toBeTruthy()
        })

        it("adds the element to the organism only once", () => {
            useReceptor(litElement, { name })
            expect(organism[name]
                .receptors
                .reduce((prev, receptor) =>
                    receptor.element === litElement ? prev + 1 : prev,
                    0)
            ).toBe(1)
        })
    })

    describe("When I use the receptor with onlyIf in an lit-element", () => {
        let hormone = defineHormone(name)

        beforeEach(() => {
            hormone = defineHormone(name)

            useReceptor(litElement, hormone, (value) => value === 1)
            useReceptor(litElement, hormone, (value) => value === 2)
        })

        it("adds all the receptors to the organism", () => {
            expect(organism[name]
                .receptors
                .length
            ).toBe(2)
        })

        it("adds the exact same receptor to the organism only once", () => {
            useReceptor(litElement, hormone, (value) => value === 2)
            expect(organism[name]
                .receptors.length
            ).toBe(2)
        })
    })
})