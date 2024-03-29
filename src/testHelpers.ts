export type LitLikeElement = {
    dispatchEvent: (e: Event) => boolean
    updateComplete: Promise<any>
    requestUpdate: () => void
}

export const testableLitElement = (): LitLikeElement => ({
    dispatchEvent: jest.fn(),
    requestUpdate: jest.fn(),
    updateComplete: Promise.resolve(),
})

beforeEach(() => jest.resetAllMocks())