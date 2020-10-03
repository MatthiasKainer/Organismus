import { html } from "lit-html";
import { LitElementWithProps, pureLit } from "pure-lit";
import { useReceptor } from "../../../src";
import { FormProps, ListReceptor, ReceptorProps } from "../types";

export const List = pureLit(
  "component-list",
  (element: LitElementWithProps<ReceptorProps<ListReceptor>> & FormProps) => {
    const list = useReceptor(
      element,
      element.receptor,
      (list) => list.form === element.form
    );
    return list?.items && Array.isArray(list.items)
      ? html`<ul>
          ${list.items.map((item) => html`<li>${item}</li>`)}
        </ul>`
      : html``;
  },
  { defaults: { form: "" } }
);
