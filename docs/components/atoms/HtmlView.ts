import { css } from "lit";
import { useOnce } from "lit-element-effect";
import { useState } from "lit-element-state-decoupler";
import { html } from "lit";
import { unsafeHTML } from "lit-html/directives/unsafe-html";
import { LitElementWithProps, pureLit } from "pure-lit";

type HTMLProps = {
  file: string;
};

export const HTMLView = pureLit(
  "html-view",
  (element: LitElementWithProps<HTMLProps>) => {
    const { getState, publish } = useState(element, "");
    useOnce(element, () => {
      fetch(`${element.file}.html`)
        .then((response) => response.text())
        .then((text) => publish(text));
    });

    return html`${unsafeHTML(getState())}`;
  },
  {
    defaults: { file: "" },
    styles: css`
      :host {
        display: block;
        width: 100%;
      }
    `,
  }
);
