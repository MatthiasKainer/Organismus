import { css } from "lit-element";
import { useOnce } from "lit-element-effect";
import { useState } from "lit-element-state-decoupler";
import { html } from "lit-html";
import { unsafeHTML } from "lit-html/directives/unsafe-html";
import { LitElementWithProps, pureLit } from "pure-lit";

type CodeProps = {
  file: string;
};

export const CodeView = pureLit(
  "code-view",
  (element: LitElementWithProps<CodeProps>) => {
    const { getState, publish } = useState(element, "");
    useOnce(element, () => {
      fetch(`${element.file}.html`)
        .then((response) => response.text())
        .then((text) => publish(text));
    });

    return html`<pre>${element.file}</pre>
    ${unsafeHTML(getState())}`;
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
