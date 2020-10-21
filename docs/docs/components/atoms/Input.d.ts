import { LitElementWithProps } from "pure-lit";
import { FormElementHoromoneValue, InputProps, ReceptorProps, ReleaseProps, ValidationProps } from "../types";
declare type AtomInputProps = InputProps & ValidationProps & ReleaseProps<FormElementHoromoneValue> & ReceptorProps<FormElementHoromoneValue>;
export declare const Input: LitElementWithProps<AtomInputProps>;
export {};
//# sourceMappingURL=Input.d.ts.map