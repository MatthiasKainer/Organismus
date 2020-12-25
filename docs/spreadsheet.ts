import { useState } from "lit-element-state-decoupler";
import { css, html } from "lit-element";
import { LitElementWithProps, pureLit } from "pure-lit";
import { useReceptor, releaseHormone, defineHormone } from "../src";
import {
  calculatedField,
  Cell,
  hasReference,
  isEqual as equal,
  isEqualValue,
  isFormula,
  isString,
  parseField,
} from "./spreadsheet-utils";
import { resetFormElements } from "./css";

const COLUMNS = "ABCDEFGHIJKLMNOPQRSTUVXYZ";
const ROWS = 10;

const onCellSet = defineHormone<Cell>("cell/set", {
  defaultValue: {
    row: -1,
    column: "",
    value: "",
  },
});
const onCellChanged = defineHormone<Cell>("cell/changed", {
  defaultValue: {
    row: -1,
    column: "",
    value: "",
  },
});

const onCellRequested = defineHormone<Cell>("cell/request");

const inputValue = (e: InputEvent) => (e.target as HTMLInputElement)?.value;

pureLit(
  "cell-element",
  (element: LitElementWithProps<Cell>) => {
    const { row, column } = element;
    const { getState: getValue, publish: storeValue } = useState(element, "");
    const { getState: isFocused, publish: setFocused } = useState(
      element,
      false
    );
    const references = useState<Cell[]>(element, []);
    const displayValue = () =>
      isFormula(getValue())
        ? calculatedField(getValue(), references.getState())
        : getValue();

    const setValue = async (value: string) => {
      storeValue(value);
      if (isFormula(value)) {
        for (const field of parseField(value).filter(
          (field: any) => !isString(field)
        )) {
          const ref = references.getState().find(cell => equal(cell, field))
          if (ref?.value && !Number.isNaN(ref.value)) continue;

          references.publish([
            ...references.getState().filter((cell) => !equal(cell, field)),
            { ...field },
          ]);
          await releaseHormone(onCellRequested, field);
        }
      }
      cellChanged();
    };

    let cellChangedTrigger: any;
    const cellChanged = () =>(
      cellChangedTrigger && clearTimeout(cellChangedTrigger),
      cellChangedTrigger = setTimeout(() => releaseHormone(onCellChanged, {
        value: displayValue(),
        row,
        column,
      }), 5)
    );

    useReceptor(
      element,
      onCellSet,
      (cell) => equal(cell, element),
      async (cell) => setValue(cell.value)
    );

    useReceptor(
      element,
      onCellRequested,
      (cell) => equal(cell, element),
      async () => cellChanged()
    );

    useReceptor(
      element,
      onCellChanged,
      ({ row, column }) =>
        isFormula(getValue()) && hasReference(getValue(), { row, column }),
      async (result) => {
        if (!references.getState().every((cell) => isEqualValue(cell, result))) {
          references.publish([
            ...references.getState().filter((cell) => !equal(cell, result)),
            { ...result },
          ]);
          cellChanged();
        }
      }
    );

    return html`<input
      type="text"
      class="${isFormula(getValue()) ? "formula" : ""}"
      @focus=${() => setFocused(true)}
      @blur=${() => setFocused(false)}
      @input=${(e: InputEvent) => {
        storeValue(inputValue(e));
        if (!isFormula(inputValue(e))) {
          cellChanged();
        }
      }}
      @change=${async (e: InputEvent) => {
        setValue(inputValue(e));
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
  (element) => {
    const { getState: getCounter, publish: increment } = useState(element, 0);

    useReceptor(
      element,
      onCellSet,
      async () => increment(getCounter() + 1)
    );

    useReceptor(
      element,
      onCellRequested,
      async () => increment(getCounter() + 1)
    );

    useReceptor(
      element,
      onCellChanged,
      async () => increment(getCounter() + 1)
    )
    return html`
      <button @click=${() => increment(0)}>Reset counter</button>
      <pre>Hormones released: ${getCounter()}</pre>
      <button @click=${() => init()}>Init Example</button>
      <table>
        <tr>
          <th>&nbsp;</th>
          ${[...COLUMNS].map((column) => html`<th>${column}</th>`)}
        </tr>
        ${[...new Array(ROWS)].map(
          (_, row) =>
            html`<tr>
              <th>${row}</th>
              ${[...COLUMNS].map(
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
  const arr = [...new Array(ROWS)].map((_, index) => index);
  const targetCols = [...COLUMNS].filter(c => !["B", "C", "D"].includes(c))
  releaseHormone(onCellSet, {
    column: "C",
    row: 4,
    value:
      "=B0+B1-C0" +
      arr.reduce(
        (prev, _, index) => `${prev}${targetCols.reduce((f, col, i) => i%2===0 ? `${f}+${col}${index}` : `${f}-${col}${index}`, "")}`,
        ""
      ),
  });
  releaseHormone(onCellSet, {
    column: "D",
    row: 4,
    value: "=C4-C0",
  });
  for (const key of arr) {
    targetCols.forEach((column) => 
      releaseHormone(onCellSet, {
        column,
        row: key,
        value: Math.round(Math.random() * 1000).toString(),
      })
    )
  }
  releaseHormone(onCellSet, {
    column: "B",
    row: 0,
    value: "0",
  });
  releaseHormone(onCellSet, {
    column: "B",
    row: 1,
    value: "123",
  });
  releaseHormone(onCellSet, {
    column: "C",
    row: 0,
    value: "23134",
  });
};
