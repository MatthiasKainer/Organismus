import { pureLit } from "pure-lit";
import { html } from "lit-element";

import "./components";

import {
  defineHormone,
  hypothalamus,
  releaseHormone,
  useReceptor,
} from "../src";
import { ListReceptor } from "./components";

const query = defineHormone("search/query", {
  defaultValue: { value: "", form: undefined },
});
const filtered = defineHormone<ListReceptor>("search/filtered", {
  defaultValue: { items: [] },
});

type Colors = {
  [name: string]: string;
};

const filter = (colors: Colors, value: string) =>
  Object.entries(colors)
    .filter(
      ([key]) => key.toLowerCase().indexOf(value?.toLowerCase() ?? "_") > -1
    )
    .map(([key, value]) => `${key}: ${value}`);

hypothalamus.on(query, ({ value, form }) => {
  fetch("colors.json")
    .then((response) => response.json())
    .then((colors: Colors) =>
      releaseHormone(filtered, { items: filter(colors, value), form })
    );
  releaseHormone(filtered);
});

pureLit("search-app", (element) => {
  const results = useReceptor(element, filtered);

  if (!results) {
    return html`<div>Loading...</div>`;
  }

  return html`
    <component-headline level="1">Search for a color</component-headline>
    <div>
      <molecule-input-with-button
        form="search-colors"
        .release=${query}
        label="search"
        placeholder="insert a color name"
      >
        Search
      </molecule-input-with-button>
    </div>
    <component-headline level="2">Results</component-headline>
    <div>
      <component-list
        form="search-colors"
        .receptor=${filtered}
      ></component-list>
    </div>
  `;
});
