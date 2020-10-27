import { Hormone } from "../../src";
export declare type Form = {
    form: string;
};
export declare type FormWithValue<T> = {
    name: string;
    value: T;
} & Form;
export declare type ValidatedFormWithValue<T> = {
    valid: boolean;
} & FormWithValue<T>;
export declare type Elements<T> = {
    rules: ((value: T) => boolean)[];
    onChanged: Hormone<FormWithValue<T>>;
    onValidate: Hormone<ValidatedFormWithValue<T>>;
};
//# sourceMappingURL=types.d.ts.map