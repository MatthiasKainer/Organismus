import { css, html, LitElement } from "lit-element";
import { pureLit } from "pure-lit";
import {
  defineHormone,
  hypothalamus,
  releaseHormone,
  useReceptor,
} from "../src";
import { resetFormElements } from "./css";
import { isNotEmpty } from "./form/validators";

type Form = {
  form: string;
};

type FormWithValue<T> = {
  value: T;
} & Form;

type ValidatedFormWithValue<T> = {
  valid: boolean;
} & FormWithValue<T>;

type FormResult = {
  [field: string]: any;
};

const requestSubmit = defineHormone<Form>("form/requestSubmit");
const formElements = {
  firstName: defineHormone<FormWithValue<string>>("form/field/firstName"),
  lastName: defineHormone<FormWithValue<string>>("form/field/lastName"),
};
const validators: { [hormoneName: string]: any } = {
  "form/field/firstName": {
    rules: [isNotEmpty],
    hormone: defineHormone<ValidatedFormWithValue<string>>(
      "form/validator/firstName"
    ),
  },
  "form/field/lastName": {
    rules: [isNotEmpty],
    hormone: defineHormone<ValidatedFormWithValue<string>>(
      "form/validator/lastName"
    ),
  },
};
const submit = defineHormone<FormWithValue<FormResult>>("form/submit");

hypothalamus.on([...Object.values(formElements)], (fields) => {
  Object.entries(fields).forEach(([key, item]) => {
    releaseHormone(validators[key].hormone, {
      value: item,
      valid: validators[key].rules.reduce(
        (prev: boolean, curr: (value: string) => boolean) =>
          !prev ? prev : curr(item.value),
        true
      ),
      form: Object.values(fields)[0]?.form,
    });
  });
});

hypothalamus.on(
  Object.values(validators).map(({ hormone }) => hormone),
  (fields) => {
    releaseHormone(submit, {
      value: fields,
      form: Object.values(fields)[0]?.form,
    });
  }
);

pureLit(
  "form-app",
  (_: LitElement) => {
    const form = "form-app";
    const formValues = useReceptor(
      _,
      submit,
      (form) => form?.form === "form-app"
    );
    return html`<form name="${form}">
        <molecule-input-with-label-and-validation
          form=${form}
          label="First Name"
          placeholder="insert first name..."
          .isValid=${formValues?.value["form/validator/firstName"]?.valid ?? true}
          .receptor=${requestSubmit}
          .release=${formElements.firstName}
        ></molecule-input-with-label-and-validation>
        <molecule-input-with-label-and-validation
          form=${form}
          label="Last Name"
          placeholder="insert last name..."
          .isValid=${formValues?.value["form/validator/lastName"]?.valid ?? true}
          .receptor=${requestSubmit}
          .release=${formElements.lastName}
        ></molecule-input-with-label-and-validation>
        <button
          form=${form}
          @click=${() => releaseHormone(requestSubmit, { form })}
        >
          Submit
        </button>
      </form>
      <pre>${JSON.stringify(formValues?.value ?? "", undefined, 4)}</pre>
      `;
  },
  {
    styles: [
      resetFormElements,
      css`
        :host {
          display: block;
          width: 80%;
          margin: 0 auto;
        }
        molecule-input-with-label-and-validation {
          display: block;
          margin: 0.5rem auto;
        }
      `,
    ],
  }
);
