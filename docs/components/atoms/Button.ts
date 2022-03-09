import { html } from "lit";
import { LitElementWithProps, pureLit } from "pure-lit";
import { releaseHormone } from "../../../src";
import { resetFormElements } from "../../css";
import { ReleaseProps } from "../types";


export const Button = pureLit(
    "component-atom-buttom",
    (element: LitElementWithProps<ReleaseProps<string>>) => {
        return html`<button @onclick=${() => releaseHormone(element.release)}>
      <slot></slot>
    </button>`;
    }, {
      styles: resetFormElements
    }
);
