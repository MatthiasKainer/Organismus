enum ParserState {
  COLUMN,
  ROW,
}

export type Cell = {
  row: number;
  column: string;
  value: string;
};

type FuzzyCell = {
  row?: number;
  column?: string;
}

function saveParseInt(value : string | number | undefined) {
  const v = (!value || value === "") ? "0" : value.toString()
  return parseInt(v, 10)
}

export function parseField(value: string) {
  if (!isFormula(value)) throw new Error("Not a formula");
  let state: ParserState = ParserState.COLUMN;
  let result: any = [];
  let currentField: FuzzyCell = {};
  [...value.substr(1)].forEach((char) => {
    if (char === " ") return;
    switch (state) {
      case ParserState.COLUMN:
        currentField.column = char;
        state = ParserState.ROW;
        break;
      case ParserState.ROW:
        const value = saveParseInt(char);
        if (isNaN(value)) {
          // next operator
          result.push({...currentField});
          result.push(char);
          currentField = {};
          state = ParserState.COLUMN;
        } else {
          currentField.row = currentField.row ? saveParseInt(`${currentField.row}${value}`) : value
        }
        break;
      default:
        break;
    }
  });
  result.push({...currentField});
  return result;
}

export const isEqual = (a : Cell, b: Cell) => {
    if (!a || !a.column) {
        return !b || !b.column
    } else if (!b || !b.column) {
        return false;
    }
    return a.column.toUpperCase() === b.column.toUpperCase() && 
    saveParseInt(a.row) === saveParseInt(b.row)
}
export const isEqualValue = (a : Cell, b: Cell) => {
    return isEqual(a, b) &&
      a.value === b.value
}

export const isFormula = (value: string) => value.indexOf("=") === 0;

export const hasReference = (
  value: string,
  { row, column }: { row: number; column: string }
) => value.indexOf(`${column}${row}`) !== -1;

export const isString = (value: any) =>
  typeof value === "string" || value instanceof String;

export const calculatedField = (value: string, results?: Cell[]) => {
  let op = "+";
  const math = (total: number, next: any) => {
    if (Number.isInteger(next)) {
      switch (op) {
        case "+":
          return total + next;
        case "-":
          return total - next;
      }
    }
    return Number.NaN;
  };
  const parsed = parseField(value)
    .map((field: any) =>
      isString(field)
        ? field
        : saveParseInt(
            results?.find(
              (result) => isEqual(result, field)
            )?.value ?? field
          )
    )
    .reduce(
      (prev: number, curr: any) =>
        isString(curr) ? ((op = curr), prev) : math(prev, curr),
      0
    );
  return parsed;
};
