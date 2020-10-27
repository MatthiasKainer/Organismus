import { LitElementWithProps } from "pure-lit";
import { FormElementHoromoneValue, InputTriggerBehaviour, ReceptorProps, ReleaseProps, ValidationProps } from "../types";
import "../atoms";
export declare const InputWithLabelAndValidation: LitElementWithProps<{
    name: string;
    label: string;
    placeholder: string;
    clear: boolean;
    triggers: InputTriggerBehaviour[];
} & import("../types").FormProps & ValidationProps & ReleaseProps<FormElementHoromoneValue> & ReceptorProps<FormElementHoromoneValue>>;
//# sourceMappingURL=InputWithLabelAndValidation.d.ts.map