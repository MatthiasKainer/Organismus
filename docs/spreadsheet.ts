import { State, useState } from "lit-element-state-decoupler";
import { css, html } from "lit-element";
import { LitElementWithProps, pureLit } from "pure-lit";
import { defineHormone, useReceptor, releaseHormone } from "../src";
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

const cellSet = defineHormone<Cell>("cell/set", {
  defaultValue: {
    row: -1,
    column: "",
    value: "",
  },
  readOnce: true,
});
const cellChanged = defineHormone<Cell>("cell/changed", {
  defaultValue: {
    row: -1,
    column: "",
    value: "",
  },
  readOnce: true,
});

const cellRequest = defineHormone<Cell>("cell/request", { readOnce: true });

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

    if (
      hasChanges(element, getValue, references) ||
      isValueRequested(element) ||
      isSet(element, setValue)
    ) {
      releaseHormone(cellChanged, {
        value: displayValue(),
        row,
        column,
      });
    }

    return html`<input
      type="text"
      class="${isFormula(getValue()) ? "formula" : ""}"
      @focus=${() => setFocused(true)}
      @blur=${() => setFocused(false)}
      @input=${(e: InputEvent) => {
        setValue(inputValue(e));
        if (!isFormula(inputValue(e))) {
          releaseHormone(cellChanged, {
            value: displayValue(),
            row,
            column,
          });
        }
      }}
      @change=${async (e: InputEvent) => {
        const value = inputValue(e);
        if (isFormula(value)) {
          const fields = parseField(value).filter(
            (field: any) => !isString(field)
          );
          for (const field of fields) {
            await releaseHormone(cellRequest, field);
          }
          releaseHormone(cellChanged, {
            value: displayValue(),
            row,
            column,
          });
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

function isSet(
  element: LitElementWithProps<Cell>,
  setValue: (value: string) => void
) {
  const isSet = useReceptor(element, cellSet, (cell) =>
    isEqual(cell, { column: element.column, row: element.row, value: "" })
  );
  if (isSet !== undefined) {
    setValue(isSet.value);
  }
  return isSet !== undefined;
}

function isValueRequested(element: LitElementWithProps<Cell>) {
  const elementCell = { column: element.column, row: element.row, value: "" };
  const valueRequest = useReceptor(element, cellRequest, (cell) =>
    isEqual(cell, elementCell)
  );
  return valueRequest;
}

function hasChanges(
  element: LitElementWithProps<Cell>,
  getValue: () => string,
  references: State<Cell[]>
): boolean {
  // receptor to collect all changes from other fields
  const result = useReceptor(
    element,
    cellChanged,
    // the filter that only applies if the field has a formula and references the field that changed
    ({ row, column }) =>
      isFormula(getValue()) && hasReference(getValue(), { row, column })
  );
  if (!result) return false;

  let hasChanges = false;
  hasChanges =
    references.getState().find((cell) => isEqual(cell, result))?.value !==
    result.value;

  if (hasChanges) {
    references.publish([
      ...references.getState().filter((cell) => !isEqual(cell, result)),
      { ...result },
    ]);
  }
  return hasChanges;
}

const init = async () => {
  const arr = [...new Array(99)].map((_, index) => index);
  await releaseHormone(cellSet, {
    column: "D",
    row: 4,
    value: "=C4",
  });
  await releaseHormone(cellSet, {
    column: "C",
    row: 4,
    value:
      "=B0+B1-C0" + arr.reduce((prev, _, index) => `${prev}+A${index}`, ""),
  });
  for (const key of arr) {
    await releaseHormone(cellSet, {
      column: "A",
      row: key,
      value: Math.round(Math.random() * 1000).toString(),
    });
  }
  await releaseHormone(cellSet, {
    column: "B",
    row: 0,
    value: "324",
  });
  await releaseHormone(cellSet, {
    column: "B",
    row: 1,
    value: "123",
  });
  await releaseHormone(cellSet, {
    column: "C",
    row: 0,
    value: "23134",
  });
};
