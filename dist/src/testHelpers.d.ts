export declare type LitLikeElement = {
    dispatchEvent: (e: Event) => boolean;
    updateComplete: Promise<any>;
    requestUpdate: () => void;
};
export declare const testableLitElement: () => LitLikeElement;
//# sourceMappingURL=testHelpers.d.ts.map