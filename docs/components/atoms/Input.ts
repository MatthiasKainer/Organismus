import { css } from "lit-element";
import { useState } from "lit-element-state-decoupler";
import { html } from "lit-html";
import { LitElementWithProps, pureLit } from "pure-lit";
import { releaseHormone, useReceptor } from "../../../src";
import { resetFormElements } from "../../css";
import {
  FormElementHoromoneValue,
  InputProps,
  InputTriggerBehaviour,
  ReceptorProps,
  ReleaseProps,
  ValidationProps,
} from "../types";

const withTrigger = (
  triggers: InputTriggerBehaviour[],
  trigger: InputTriggerBehaviour
) => Array.isArray(triggers) && triggers.some((t) => t === trigger);

type AtomInputProps = InputProps &
  ValidationProps &
  ReleaseProps<FormElementHoromoneValue> &
  ReceptorProps<FormElementHoromoneValue>;

export const Input = pureLit(
  "component-atom-input",
  (element: LitElementWithProps<AtomInputProps>) => {
    const { getState, publish } = useState<string>(element, "");
    const value = getState();

    withSubmit(element, value, publish);

    return html`
      <input
        type="text"
        class="${element.isValid ? "" : "invalid"}"
        name="${element.name || "item"}"
        aria-label=${element.label}
        .value="${value}"
        @input="${(e: InputEvent) => {
          const value = (e.target as HTMLInputElement)?.value;
          publish(value);
          if (
            withTrigger(element.triggers, InputTriggerBehaviour.OnType) &&
            getState() !== ""
          ) {
            releaseHormone(element.release, {
              name: element.name,
              value,
              form: element.form,
            });
          }
        }}"
        @keypress=${(e: KeyboardEvent) => {
          if (
            withTrigger(element.triggers, InputTriggerBehaviour.OnEnter) &&
            getState() !== "" &&
            e.key === "Enter"
          ) {
            clear(element, publish);
            releaseHormone(element.release, {
              name: element.name,
              value,
              form: element.form,
            });
          }
        }}
        placeholder="${element.placeholder || element.label}"
      />
    `;
  },
  {
    defaults: {
      name: "input",
      label: "input",
      placeholder: "insert value",
      clear: false,
      isValid: true,
      triggers: [InputTriggerBehaviour.OnSubmit],
      form: undefined,
      release: undefined,
      receptor: undefined,
    },
    styles: [resetFormElements,
    css`
    .invalid {
      border-color: var(--alert-color);
    }`],
  }
);

async function clear(
  element: LitElementWithProps<AtomInputProps>,
  publish: (update: string) => void
) {
  if (element.clear) {
    publish("");
  }
}

function withSubmit(
  element: LitElementWithProps<AtomInputProps>,
  value: string,
  publish: (update: string) => void
) {
  if (!element.receptor) return;

  const submittedForm = useReceptor(
    element,
    element.receptor,
    (submit) => submit?.form === element.form
  );

  if (
    submittedForm &&
    withTrigger(element.triggers, InputTriggerBehaviour.OnSubmit)
  ) {
    clear(element, publish);
    releaseHormone(element.release, {
      name: element.name ?? "",
      value,
      form: element.form ?? "",
    });
  }
}
