import { useState } from "lit-element-state-decoupler";
import { html } from "lit";
import { LitElementWithProps, pureLit } from "pure-lit";
import { getOrDefineHormone, useReceptor } from "../../../src";
import { FormProps, ListReceptor, ReceptorProps } from "../types";

export const List = pureLit(
  "component-list",
  (element: LitElementWithProps<ReceptorProps<ListReceptor>> & FormProps) => {
    const list = useState<ListReceptor | undefined>(element, { items: [] });

    useReceptor(
      element,
      element.receptor,
      (list) => list?.form === element.form,
      async (result) => list.publish(result)
    );
    return html`<ul>
      ${list.getState()?.items.map((item) => html`<li>${item}</li>`)}
    </ul>`;
  },
  { defaults: { form: "", receptor: getOrDefineHormone("list") } }
);
