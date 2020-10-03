import { html } from "lit-element";
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
  const firstResult = useReceptor(element, inputReceivedHormone,
    (form) => form?.form === "form-1"
  );
  const secondResult = useReceptor(element, inputReceivedHormone,
    (form) => form?.form === "form-2"
  );
  const anyResult = useReceptor(element, inputReceivedHormone);

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
      Receptor form-1 received: ${JSON.stringify(firstResult)}
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
      Receptor form-2 received: ${JSON.stringify(secondResult)}
    </div>
    Global receptor received: ${JSON.stringify(anyResult)}`;
}, {
  styles: resetFormElements
});
