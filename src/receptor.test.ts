import { Parent } from "./types"
import { testableLitElement } from "./testHelpers"
import { useReceptor } from "./receptor"
import { organism } from "./base"
import { defineHormone } from "./hormone"

describe("[useReceptor] Given I have a receptor", () => {
    const name = "test"
    const onTriggered = jest.fn()
    let litElement: Parent
    beforeEach(() => {
        litElement = testableLitElement()
    })

    describe("When I use the receptor for a hormone that does not exist", () => {
        it("fails", () => {
            expect(() => useReceptor(litElement, { name }, onTriggered))
                .toThrowError(new Error(`Hormone "${name}" is not defined`))
        })
    })

    describe("When I use the receptor in an lit-element", () => {
        beforeEach(() => {
            useReceptor(litElement, defineHormone(name, {defaultValue: "default"}), onTriggered)
        })

        it("adds the element to the organism", () => {
            expect(organism[name]
                .receptors
                .some(receptor => receptor.parent === litElement)
            ).toBeTruthy()
        })

        it("sets the default value if there is one", () => {
            expect(
                onTriggered
            ).toBeCalledWith("default")
        })

        it("does not set the default value if there is none", () => {
            expect(
                onTriggered
            ).toBeCalledWith("default")
        })

        it("adds the element to the organism only once", () => {
            useReceptor(litElement, { name }, onTriggered)
            expect(organism[name]
                .receptors
                .reduce((prev, receptor) =>
                    receptor.parent === litElement ? prev + 1 : prev,
                    0)
            ).toBe(1)
        })
    })

    describe("When I have a hormone with a default value", () => {
        beforeEach(() => {
            useReceptor(litElement, defineHormone(name, {defaultValue: "default"}), onTriggered)
        })
        
        it("sets the default value if there is one", () => {
            expect(
                onTriggered
            ).toBeCalledWith("default")
        })
    })

    describe("When I have a hormone with a value", () => {

        beforeEach(() => {
            const h = defineHormone(name, {defaultValue: "default"})
            organism[name].value = "value"
            useReceptor(litElement, h, onTriggered)
        })
        
        it("sets the value if there is one", () => {
            expect(
                onTriggered
            ).toBeCalledWith("value")
        })
    })

    describe("When I have a hormone without a default value", () => {
        beforeEach(() => {
            useReceptor(litElement, defineHormone(name), onTriggered)
        })

        it("does not set the default value if there is none", () => {
            expect(
                onTriggered
            ).not.toBeCalled()
        })
    })

    describe("When I use the receptor with onlyIf in an lit-element", () => {
        let hormone = defineHormone(name)

        beforeEach(() => {
            hormone = defineHormone(name)

            useReceptor(litElement, hormone, (value) => value === 1, onTriggered)
            useReceptor(litElement, hormone, (value) => value === 2, onTriggered)
        })

        it("adds all the receptors to the organism", () => {
            expect(organism[name]
                .receptors
                .length
            ).toBe(2)
        })

        it("adds the exact same receptor to the organism only once", () => {
            useReceptor(litElement, hormone, (value) => value === 2, onTriggered)
            expect(organism[name]
                .receptors.length
            ).toBe(2)
        })
    })
})