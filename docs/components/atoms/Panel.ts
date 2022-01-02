import { css } from "lit-element";
import { useState } from "lit-element-state-decoupler";
import { html } from "lit-html";
import { LitElementWithProps, pureLit } from "pure-lit";
import { getOrDefineHormone, useReceptor } from "../../../src";
import { ReceptorProps } from "../types";

export const Panel = pureLit(
    "component-toggle-panel",
    (element: LitElementWithProps<PanelProps & ReceptorProps<string>>) => {
        const activePanel = useState(element, "")
        useReceptor(element, element.receptor, async val => activePanel.publish(val));
        return element.name === activePanel.getState() ? html`<slot></slot>` : html``;
    },
    {
        defaults: { name: "", receptor: getOrDefineHormone("panel") },
        styles: css`
        slot {
          display:block;
          padding-top: 4rem;
        }`
    }
);
type PanelProps = {
    name: string;
};
