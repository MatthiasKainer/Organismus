import { Hormone } from "../../src";

export type Form = {
  form: string;
};

export type FormWithValue<T> = {
  name: string;
  value: T;
} & Form;

export type ValidatedFormWithValue<T> = {
  valid: boolean;
} & FormWithValue<T>;

export type Elements<T> = {
  rules: ((value: T) => boolean)[];
  onChanged: Hormone<FormWithValue<T>>;
  onValidate: Hormone<ValidatedFormWithValue<T>>;
};
