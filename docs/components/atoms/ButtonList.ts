import { css, html } from "lit-element";
import { useState } from "lit-element-state-decoupler";
import { LitElementWithProps, pureLit } from "pure-lit";
import { releaseHormone, useReceptor } from "../../../src";
import { resetFormElements } from "../../css";
import { ReleaseProps } from "../types";

export const ButtonList = pureLit(
  "component-button-list",
  (element: LitElementWithProps<ButtonProps & ReleaseProps<string>>) => {
    const active = useState(element, "")
    useReceptor(element, element.release, async val => active.publish(val))
    return html`<div>
      ${element.items.map(
        (item) => html`<button
          class="${item === active.getState() ? "active" : ""}"
          @click=${() => releaseHormone(element.release, item)}
        >
          ${item}
        </button>`
      )}
    </div>`;
  },
  {
    defaults: {
      level: 1,
    },
    styles: [resetFormElements, css`.active { background-color:var(--highlight-color); }`],
  }
);
type ButtonProps = {
  items: string[];
};
