import { Form, Elements } from "./types";
export declare const onRequestSubmit: import("../../src").Hormone<Form>;
export declare const onSubmit: import("../../src").Hormone<any>;
export declare const onAborted: import("../../src").Hormone<any>;
export declare const formElements: {
    [hormoneName: string]: Elements<any>;
};
export declare const fieldIsValid: <T>(name: string, value: T) => boolean;
//# sourceMappingURL=form.logic.d.ts.map