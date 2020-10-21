enum ParserState {
  COLUMN,
  ROW,
}

export type Cell = {
  row: number;
  column: string;
  value: string;
};

export function parseField(value: string) {
  if (!isFormula(value)) throw new Error("Not a formula");
  let state: ParserState = ParserState.COLUMN;
  let result: any = [];
  let currentField: any = {};
  [...value.substr(1)].forEach((char) => {
    if (char === " ") return;
    switch (state) {
      case ParserState.COLUMN:
        currentField.column = char;
        state = ParserState.ROW;
        break;
      case ParserState.ROW:
        const value = parseInt(char, 10);
        if (isNaN(value)) {
          // next operator
          result.push({...currentField});
          result.push(char);
          currentField = {};
          state = ParserState.COLUMN;
        } else {
          currentField.row = currentField.row ? parseInt(`${currentField.row}${value}`, 10) : value
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
      parseInt(a.row.toString(), 10) === parseInt(b.row.toString(), 10)
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
        : parseInt(
            results?.find(
              (result) => isEqual(result, field)
            )?.value ?? "NaN",
            10
          )
    )
    .reduce(
      (prev: number, curr: any) =>
        isString(curr) ? ((op = curr), prev) : math(prev, curr),
      0
    );
  return parsed;
};
