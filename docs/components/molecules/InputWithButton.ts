import { html } from "lit-html";
import { pureLit, LitElementWithProps } from "pure-lit";
import { defineHormone, getOrDefineHormone, releaseHormone, useReceptor } from "../../../src";
import { resetFormElements } from "../../css";
import { FormElementHoromoneValue, FormProps, InputProps, InputTriggerBehaviour, ReleaseProps } from "../types";

const onSubmit = defineHormone<FormProps>(`molecules/InputWithButton/submit`, {
  readOnce: true
})
const onInputReceived = defineHormone<FormElementHoromoneValue>(`molecules/InputWithButton/changed`)

export const InputWithButton = pureLit(
  "molecule-input-with-button",
  (
    element: LitElementWithProps<
      InputProps & ReleaseProps<FormElementHoromoneValue>
    >
  ) => {
    const {name, label, placeholder, clear, form} = element;

    useReceptor(element, onInputReceived,
      (value) => form === value.form,
      async value => releaseHormone(element.release, value)
    )
    return html`
      <component-atom-input
        name="${name}"
        label="${label}"
        placeholder="${placeholder}"
        form="${form ?? "form"}"
        .triggers=${[InputTriggerBehaviour.OnEnter, InputTriggerBehaviour.OnSubmit]}
        .clear=${clear}
        .release=${onInputReceived}
        .receptor=${onSubmit}
      ></component-atom-input>
      <button 
        form=${form ?? "form"} 
        @click=${() => releaseHormone(onSubmit, {form})}>
        <slot></slot>
      </button>
    `;
  },
  {
    defaults: {
      name: "input",
      label: "input",
      placeholder: "insert value",
      clear: false,
      form: "",
      triggers: [InputTriggerBehaviour.OnSubmit],
      release: getOrDefineHormone("molecules/InputWithButton/release"),
    },
    styles: resetFormElements,
  }
);
