import { html } from "lit";
import { useState } from "lit-element-state-decoupler";
import { pureLit } from "pure-lit";
import { defineHormone, releaseHormone, useReceptor } from "../src";
import { resetFormElements } from "./css";

type InputHormone = {
  form: string;
  value?: string;
};

const inputReceivedHormone = defineHormone<InputHormone>(
  "two-form-app/input-received"
);

export default pureLit("two-form-app", (element) => {
  const first = useState<InputHormone | undefined>(element, undefined)
  const second = useState<InputHormone | undefined>(element, undefined)
  const third = useState<InputHormone | undefined>(element, undefined)

  useReceptor(element, inputReceivedHormone,
    (form) => form?.form === "form-1",
    async form => first.publish(form)
  );
  useReceptor(element, inputReceivedHormone,
    (form) => form?.form === "form-2",
    async form => second.publish(form)
  );
  useReceptor(element, inputReceivedHormone,
    async form => third.publish(form)
  );

  return html` <div>
      <input
        type="text"
        @input="${(e: InputEvent) => {
          const value = (e.target as HTMLInputElement)?.value;
          releaseHormone(inputReceivedHormone, {
            form: "form-1",
            value,
          });
        }}"
        placeholder="Insert something"
      />
      Receptor form-1 received: ${JSON.stringify(first.getState())}
    </div>
    <div>
    <input
        type="text"
        @input="${(e: InputEvent) => {
          const value = (e.target as HTMLInputElement)?.value;
          releaseHormone(inputReceivedHormone, {
            form: "form-2",
            value,
          });
        }}"
        placeholder="Insert something"
      />
      Receptor form-2 received: ${JSON.stringify(second.getState())}
    </div>
    Global receptor received: ${JSON.stringify(third.getState())}`;
}, {
  styles: resetFormElements
});
