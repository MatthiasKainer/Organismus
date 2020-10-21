export declare type Cell = {
    row: number;
    column: string;
    value: string;
};
export declare function parseField(value: string): any;
export declare const isEqual: (a: Cell, b: Cell) => boolean;
export declare const isFormula: (value: string) => boolean;
export declare const hasReference: (value: string, { row, column }: {
    row: number;
    column: string;
}) => boolean;
export declare const isString: (value: any) => boolean;
export declare const calculatedField: (value: string, results?: Cell[] | undefined) => any;
//# sourceMappingURL=spreadsheet-utils.d.ts.map