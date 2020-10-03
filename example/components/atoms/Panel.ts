import { css } from "lit-element";
import { html } from "lit-html";
import { LitElementWithProps, pureLit } from "pure-lit";
import { useReceptor } from "../../../src";
import { ReceptorProps } from "../types";



export const Panel = pureLit(
    "component-toggle-panel",
    (element: LitElementWithProps<PanelProps & ReceptorProps<string>>) => {
        const activePanel = useReceptor(element, element.receptor);
        return element.name === activePanel ? html`<slot></slot>` : html``;
    },
    {
        defaults: { name: "" },
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
