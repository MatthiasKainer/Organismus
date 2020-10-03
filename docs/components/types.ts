import { Hormone } from "../../src";

export type ReleaseProps<T> = {
  release: Hormone<T>;
};

export type ReceptorProps<T> = {
  receptor: Hormone<T>;
};

export type FormProps = {
  form?: string;
};

export type ListReceptor = {
  items: string[];
} & FormProps;

export enum InputTriggerBehaviour {
    OnType,
    OnSubmit,
    OnEnter,
    OnBlur,
}

export type InputProps = {
  name: string;
  label: string;
  placeholder: string;
  clear: boolean;
  triggers: InputTriggerBehaviour[];
} & FormProps;

export type ButtonProps = {};
export type ValidationProps = {
  isValid: boolean;
};

export type FormElementHoromoneValue = {
  form: string;
  name: string;
  value: string;
};
