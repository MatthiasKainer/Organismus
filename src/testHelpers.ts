import { LitLikeElement } from "./types";

export const testableLitElement = (): LitLikeElement => ({
    requestUpdate: jest.fn(),
    updateComplete: Promise.resolve(),
})