import { defineHormone, defineSingleHormone, hypothalamus, releaseHormone, } from "../../src";
import { Form, Elements, FormWithValue, ValidatedFormWithValue } from "./types";
import { isNotEmpty } from "./validators";

export const onRequestSubmit = defineSingleHormone<Form>("form/requestSubmit");
export const onSubmit = defineSingleHormone<any>("form/submit");
export const onAborted = defineSingleHormone<any>("form/abort");

export const formElements: { [hormoneName: string]: Elements<any> } = {
  firstName: {
    rules: [isNotEmpty],
    onChanged: defineHormone<FormWithValue<string>>("form/field/firstName"),
    onValidate: defineHormone<ValidatedFormWithValue<string>>(
      "form/validator/firstName"
    ),
  },
  lastName: {
    rules: [isNotEmpty],
    onChanged: defineHormone<FormWithValue<string>>("form/field/lastName"),
    onValidate: defineHormone<ValidatedFormWithValue<string>>(
      "form/validator/lastName"
    ),
  },
};
const onChangedHormones = Object.values(formElements).map(
  ({ onChanged }) => onChanged
);
const onValidatedHormones = Object.values(formElements).map(
  ({ onValidate }) => onValidate
);

export const fieldIsValid = <T>(name: string, value: T) =>
  formElements[name].rules.reduce(
    (prev: boolean, curr: (value: T) => boolean) =>
      !prev ? prev : curr(value),
    true
  );

hypothalamus.on(onChangedHormones, (fields) => {
  Object.values(fields).forEach(({ name, value, form }: FormWithValue<any>) => {
    releaseHormone(formElements[name].onValidate, {
      value,
      name,
      form,
      valid: fieldIsValid(name, value),
    });
  });
});

hypothalamus.on(
  [onRequestSubmit, ...onValidatedHormones],
  (fieldsPerValidation) => {
    const { form } = fieldsPerValidation["form/requestSubmit"];
    delete fieldsPerValidation["form/requestSubmit"];
    const fields = Object.values(fieldsPerValidation);
    if (fields.every((field) => field.valid)) {
      return releaseHormone(onSubmit, { form });
    }
    const invalidFields = fields.filter((field) => !field.valid);
    return releaseHormone(onAborted, {
      form,
      errors: invalidFields.map((field) => `Field ${field.name} is not valid`),
    });
  }
);
