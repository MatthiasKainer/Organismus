import { getId, getValue, hypothalamus } from "./hypothalamus"
import { defineHormone, releaseHormone } from "./hormone"
import { Hormone } from "./types"
import { organism } from "./base"

describe("hormones => get id", () => {
    it("should create the correct ids", () => {
        expect(getId([])).toBe("")
        expect(getId([{name: "name1"}])).toBe(";name1;")
        expect(getId([{name: "name1"}, {name: "name2"}])).toBe(";name1;;name2;")
    })
})

describe("[hypothalamus] Given I have a hyptholamus", () => {
    let corticoliberin  : Hormone<boolean>
    let adrenocorticotropin: Hormone<boolean>
    beforeEach(() => {
        corticoliberin  = defineHormone("Corticoliberin", {defaultValue: false})
        adrenocorticotropin  = defineHormone("Adrenocorticotropin", {defaultValue: false})
    })

    describe("when the hypothalamus has a connection", () => {
        beforeEach(() => {
            hypothalamus.on(corticoliberin, (value) => {
                releaseHormone(adrenocorticotropin, value)
            })
        })

        it("triggers a hormon cascade", async () => {
            // when
            hypothalamus.orchestrate(corticoliberin, true)

            // then
            expect(organism[adrenocorticotropin.name].value).toBe(true)
        })

        describe("and all connections for this hormone are dropped", () => {
            beforeEach(() => {
                hypothalamus.drop(corticoliberin)
            })
    
            it("does not trigger anything", async () => {
                // when
                hypothalamus.orchestrate(corticoliberin, true)
    
                // then
                expect(organism[adrenocorticotropin.name].value).toBe(false)
            })
        })
    })
    describe("when the hypothalamus has multiple connections", () => {
        let callCount = 0

        beforeEach(() => {
            callCount = 0
            hypothalamus.on(corticoliberin, (value) => {
                releaseHormone(adrenocorticotropin, value)
                callCount++
            })
            hypothalamus.on(corticoliberin, (value) => {
                releaseHormone(adrenocorticotropin, !value)
                callCount++
            })
        })

        it("triggers a hormon cascade and, if one hormone has multiple, it applies the last", async () => {
            // when
            hypothalamus.orchestrate(corticoliberin, true)

            // then
            expect(callCount).toBe(2)
            expect(organism[adrenocorticotropin.name].value).toBe(false)
        })
    })

    describe("when the hypothalamus has a connection with a hormone list", () => {
        let receiver = jest.fn()

        beforeEach(() => {
            hypothalamus.drop([corticoliberin, adrenocorticotropin])
            hypothalamus.on([corticoliberin, adrenocorticotropin], (result) => {
                receiver(result)
            })
        })

        it("fails if the some connection list is added multiple times", () => {
            expect(() => hypothalamus.on([corticoliberin, adrenocorticotropin], () => null))
                .toThrowError(new Error("Cannot register the same list of hormones twice"))
        })

        it("does not trigger when only no hormone is released", () => {
            expect(receiver).not.toBeCalled()
        })

        it("does not trigger when only one hormone is released", () => {
            releaseHormone(corticoliberin)
            expect(receiver).not.toBeCalled()
        })

        it("triggers the connection when all hormones are released", () => {
            releaseHormone(adrenocorticotropin)
            releaseHormone(corticoliberin)
            expect(receiver).toBeCalled()
        })

        it("doesn't triggers the connection again after all hormones are released but only after all hormones are released a second time", () => {
            releaseHormone(adrenocorticotropin)
            releaseHormone(corticoliberin)
            expect(receiver).toBeCalledTimes(1)
            releaseHormone(corticoliberin)
            expect(receiver).toBeCalledTimes(1)
            releaseHormone(adrenocorticotropin)
            expect(receiver).toBeCalledTimes(2)
        })

        it("returns a valid hormone-getter", () => {
            releaseHormone(adrenocorticotropin, true)
            releaseHormone(corticoliberin, false)
            const result = receiver.mock.calls[0][0]
            expect(getValue(adrenocorticotropin, result)).toBe(true)
            expect(getValue(corticoliberin, result)).toBe(false)
        })

        it("passes all the correct values to the receiver", () => {
            releaseHormone(adrenocorticotropin, true)
            releaseHormone(corticoliberin, true)
            expect(receiver).toBeCalledWith({
                Adrenocorticotropin: true,
                Corticoliberin: true,
            })
            releaseHormone(adrenocorticotropin, true)
            releaseHormone(corticoliberin, false)
            expect(receiver).toBeCalledWith({
                Adrenocorticotropin: true,
                Corticoliberin: false,
            })
            releaseHormone(adrenocorticotropin, false)
            releaseHormone(corticoliberin, true)
            expect(receiver).toBeCalledWith({
                Adrenocorticotropin: false,
                Corticoliberin: true,
            })
        })
    })
})