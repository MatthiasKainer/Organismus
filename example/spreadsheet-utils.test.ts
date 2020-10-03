import { calculatedField, Cell, parseField } from "./spreadsheet-utils";

describe("parse", () => {
  it("parse a single field correctly as a value reference", () => {
    expect(parseField("=A1")).toEqual([{ column: "A", row: 1 }]);
  });
  it("parse a sum correctly", () => {
    expect(parseField("=A1+A2")).toEqual([
      { column: "A", row: 1 },
      "+",
      { column: "A", row: 2 },
    ]);
  });
  it("parse a minus correctly", () => {
    expect(parseField("=A1-A2")).toEqual([
      { column: "A", row: 1 },
      "-",
      { column: "A", row: 2 },
    ]);
  });

  it("parse a more complex formula correctly", () => {
    expect(parseField("=A1-A2 + B3 -C1")).toEqual([
      { column: "A", row: 1 },
      "-",
      { column: "A", row: 2 },
      "+",
      { column: "B", row: 3 },
      "-",
      { column: "C", row: 1 },
    ]);
  });
});

describe("calculated field", () => {
  const cell = (column: string, row: number, value: string) =>
    ({
      column,
      row,
      value,
    } as Cell);

  it("returns the correct result", () => {
    expect(
      calculatedField("=A1+A4-A2", [
        cell("A", 1, "1"),
        cell("A", 4, "1"),
        cell("A", 2, "5"),
      ])
    ).toBe(-3);
  });
  it("returns the correct result for two digit rows", () => {
    expect(
      calculatedField("=A1+A40-A22", [
        cell("A", 1, "1"),
        cell("A", 40, "1"),
        cell("A", 22, "5"),
      ])
    ).toBe(-3);
  });

  it("returns NaN on invalid reference", () => {
    expect(
      calculatedField("=A1+A4-A2", [cell("A", 1, "1"), cell("A", 4, "1")])
    ).toBe(Number.NaN);
  });
});
