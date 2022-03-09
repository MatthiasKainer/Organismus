import { css } from "lit";
import { State, useState } from "lit-element-state-decoupler";
import { html } from "lit";
import { LitElementWithProps, pureLit } from "pure-lit";
import { getOrDefineHormone, releaseHormone, useReceptor } from "../../../src";
import { resetFormElements } from "../../css";
import {
  FormElementHoromoneValue,
  InputProps,
  InputTriggerBehaviour,
  ReceptorProps,
  ReleaseProps,
  ValidationProps,
} from "../types";

const release = getOrDefineHormone("atoms/input/release");
const receptor = getOrDefineHormone("atoms/input/receptor");

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
    const value = useState<string>(element, "");

    withSubmit(element, value);

    const {publish, getState} = value

    return html`
      <input
        type="text"
        class="${element.isValid ? "" : "invalid"}"
        name="${element.name || "item"}"
        aria-label=${element.label}
        .value="${value.getState()}"
        @input="${(e: InputEvent) => {
          const value = (e.target as HTMLInputElement)?.value;
          publish(value);
          if (
            withTrigger(element.triggers, InputTriggerBehaviour.OnType)
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
            e.key === "Enter"
          ) {
            releaseHormone(element.release, {
              name: element.name,
              value: getState(),
              form: element.form,
            });
            clear(element, publish);
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
      release,
      receptor,
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
  value: State<string>
) {
  if (!element.receptor) return;
  const form = element.form ?? ""
  const name = element.name ?? ""
  
  useReceptor(
    element,
    element.receptor,
    (submit) => submit?.form === element.form,
    async () => {
      if (
        withTrigger(element.triggers, InputTriggerBehaviour.OnSubmit)
      ) {
        releaseHormone(element.release, {
          name,
          value: value.getState(),
          form,
        });
        clear(element, value.publish);
      }
    }
  );
}
