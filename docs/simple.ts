import { html } from "lit-element";
import { pureLit } from "pure-lit";
import { defineHormone, releaseHormone, useReceptor } from "../src";
import { resetFormElements } from "./css";

const inputReceivedHormone = defineHormone<string>("simple-app/input-received");

export default pureLit("simple-app", (element) => {
  const result = useReceptor(element, inputReceivedHormone);

  return html` <div>
      <input
        type="text"
        @input="${(e: InputEvent) => {
          const value = (e.target as HTMLInputElement)?.value;
          releaseHormone(inputReceivedHormone, value);
        }}"
        placeholder="Insert something"
      />
    </div>
    Receptor received: ${result}`;
}, {
  styles: resetFormElements
});
