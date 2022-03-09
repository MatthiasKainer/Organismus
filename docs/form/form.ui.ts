import { css, html, LitElement, TemplateResult } from "lit";
import { useState } from "lit-element-state-decoupler";
import { LitElementWithProps, pureLit } from "pure-lit";
import {
  releaseHormone,
  useReceptor,
} from "../../src";
import { resetFormElements } from "../css";
import { fieldIsValid, formElements, onAborted, onRequestSubmit, onSubmit } from "./form.logic";
import {
  Form,
} from "./types";

type FormTextboxProps = {
  name: string;
  label: string;
  placeholder: string;
  rules: ((value: string) => boolean)[];
} & Form;
pureLit(
  "form-textbox",
  (el: LitElementWithProps<FormTextboxProps>) => {
    const isValid = useState(el, true);

    useReceptor(
      el,
      formElements[el.name].onChanged,
      (submittedForm) => submittedForm.form === el.form,
      async (form) => {
        isValid.publish(fieldIsValid(form.name, form.value));
      }
    );
    return html`<molecule-input-with-label-and-validation
      form=${el.form}
      name=${el.name}
      label=${el.label ?? el.name}
      placeholder=${el.placeholder}
      .isValid=${isValid.getState()}
      .receptor=${onRequestSubmit}
      .release=${formElements[el.name].onChanged}
    ></molecule-input-with-label-and-validation>`;
  },
  {
    defaults: {
      name: "",
      form: "",
      label: "",
      rules: [],
      placeholder: "Insert value",
    },
  }
);

pureLit(
  "form-app",
  (_: LitElement) => {
    const form = "form-app";
    const result = useState<() => TemplateResult>(_, () => html`<p>Waiting for form to submit</p>`);
    useReceptor(
      _,
      onSubmit,
      (value) => form === value.form,
      async (value) =>
        result.publish(() => html`Form "${value.form}" submitted successfully`)
    );
    useReceptor(
      _,
      onAborted,
      (value) => form === value.form,
      async (value) =>
        result.publish(() => 
          html`Form "${value.form}" not submitted:
            <ul>
              ${value.errors.map((error: string) => html`<li>${error}</li>`)}
            </ul>`
        )
    );
    return html`<form name="${form}">
      <form-textbox
        form=${form}
        name="firstName"
        label="First Name"
        placeholder="insert first name..."
      ></form-textbox>
      <form-textbox
        form=${form}
        name="lastName"
        label="Last Name"
        placeholder="insert last name..."
      ></form-textbox>
      <button
        form=${form}
        @click=${() => releaseHormone(onRequestSubmit, { form })}
      >
        Submit
      </button>
      <p>${result.getState()()}</p>
    </form> `;
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
