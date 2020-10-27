import { useState } from "lit-element-state-decoupler";
import { css, html } from "lit-element";
import { LitElementWithProps, pureLit } from "pure-lit";
import { defineSingleHormone, useReceptor, releaseHormone } from "../src";
import {
  calculatedField,
  Cell,
  hasReference,
  isEqual,
  isFormula,
  isString,
  parseField,
} from "./spreadsheet-utils";
import { resetFormElements } from "./css";

const onCellSet = defineSingleHormone<Cell>("cell/set", {
  defaultValue: {
    row: -1,
    column: "",
    value: "",
  },
});
const onCellChanged = defineSingleHormone<Cell>("cell/changed", {
  defaultValue: {
    row: -1,
    column: "",
    value: "",
  },
});

const onCellRequested = defineSingleHormone<Cell>("cell/request");

const inputValue = (e: InputEvent) => (e.target as HTMLInputElement)?.value;

pureLit(
  "cell-element",
  (element: LitElementWithProps<Cell>) => {
    const { row, column } = element;
    const { getState: getValue, publish: setValue } = useState(element, "");
    const { getState: isFocused, publish: setFocused } = useState(
      element,
      false
    );
    const references = useState<Cell[]>(element, []);
    const displayValue = () =>
      isFormula(getValue())
        ? calculatedField(getValue(), references.getState())
        : getValue();

    const releaseCellChanged = () =>
      releaseHormone(onCellChanged, {
        value: displayValue(),
        row,
        column,
      });

    useReceptor(
      element,
      onCellSet,
      (cell) =>
        isEqual(cell, { column: element.column, row: element.row, value: "" }),
      async (cell) => (setValue(cell.value), releaseCellChanged())
    );

    useReceptor(
      element,
      onCellRequested,
      (cell) =>
        isEqual(cell, { column: element.column, row: element.row, value: "" }),
      async () => releaseCellChanged()
    );

    useReceptor(
      element,
      onCellChanged,
      ({ row, column }) =>
        isFormula(getValue()) && hasReference(getValue(), { row, column }),
      async (result) => {
        if (references.getState().find((cell) => isEqual(cell, result))?.value !== result.value) {
          references.publish([
            ...references.getState().filter((cell) => !isEqual(cell, result)),
            { ...result },
          ]);
          releaseCellChanged()
        }
      }
    );

    return html`<input
      type="text"
      class="${isFormula(getValue()) ? "formula" : ""}"
      @focus=${() => setFocused(true)}
      @blur=${() => setFocused(false)}
      @input=${(e: InputEvent) => {
        setValue(inputValue(e));
        if (!isFormula(inputValue(e))) {
          releaseCellChanged()
        }
      }}
      @change=${async (e: InputEvent) => {
        const value = inputValue(e);
        if (isFormula(value)) {
          const fields = parseField(value).filter(
            (field: any) => !isString(field)
          );
          for (const field of fields) {
            await releaseHormone(onCellRequested, field);
          }
          releaseCellChanged()
        }
      }}
      .value=${!isFocused() ? displayValue() : getValue()}
    />`;
  },
  {
    defaults: {
      row: 0,
      column: "A",
      value: "",
    },
    styles: [
      resetFormElements,
      css`
        .formula {
          background-color: var(--highlight-color);
          border: none;
        }
      `,
    ],
  }
);

export default pureLit(
  "spreadsheet-app",
  () => {
    const columns = "ABCDEFGHIJKLMNOPQRSTUVXYZ";
    const rows = 99;
    return html`
      <button @click=${() => init()}>Init Example</button>
      <table>
        <tr>
          <th>&nbsp;</th>
          ${[...columns].map((column) => html`<th>${column}</th>`)}
        </tr>
        ${[...new Array(rows)].map(
          (_, row) =>
            html`<tr>
              <th>${row}</th>
              ${[...columns].map(
                (column) =>
                  html`<td>
                    <cell-element .row=${row} column="${column}"></cell-element>
                  </td>`
              )}
            </tr>`
        )}
      </table>
    `;
  },
  {
    styles: [
      resetFormElements,
      css`
        td {
          padding: 0;
          margin: 0;
        }
      `,
    ],
  }
);

const init = async () => {
  const arr = [...new Array(99)].map((_, index) => index);
  await releaseHormone(onCellSet, {
    column: "D",
    row: 4,
    value: "=C4",
  });
  await releaseHormone(onCellSet, {
    column: "C",
    row: 4,
    value:
      "=B0+B1-C0" + arr.reduce((prev, _, index) => `${prev}+A${index}`, ""),
  });
  for (const key of arr) {
    await releaseHormone(onCellSet, {
      column: "A",
      row: key,
      value: Math.round(Math.random() * 1000).toString(),
    });
  }
  await releaseHormone(onCellSet, {
    column: "B",
    row: 0,
    value: "324",
  });
  await releaseHormone(onCellSet, {
    column: "B",
    row: 1,
    value: "123",
  });
  await releaseHormone(onCellSet, {
    column: "C",
    row: 0,
    value: "23134",
  });
};
