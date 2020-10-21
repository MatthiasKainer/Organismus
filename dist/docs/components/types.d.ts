import { Hormone } from "../../src";
export declare type ReleaseProps<T> = {
    release: Hormone<T>;
};
export declare type ReceptorProps<T> = {
    receptor: Hormone<T>;
};
export declare type FormProps = {
    form?: string;
};
export declare type ListReceptor = {
    items: string[];
} & FormProps;
export declare enum InputTriggerBehaviour {
    OnType = 0,
    OnSubmit = 1,
    OnEnter = 2,
    OnBlur = 3
}
export declare type InputProps = {
    name: string;
    label: string;
    placeholder: string;
    clear: boolean;
    triggers: InputTriggerBehaviour[];
} & FormProps;
export declare type ButtonProps = {};
export declare type ValidationProps = {
    isValid: boolean;
};
export declare type FormElementHoromoneValue = {
    form: string;
    name: string;
    value: string;
};
//# sourceMappingURL=types.d.ts.map