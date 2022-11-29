import { PieceType } from "./piece.model";

export const ColumnLetterList = [
  "a",
  "b",
  "c",
  "d",
  "e",
  "f",
  "g",
  "h",
] as const;
export const RowNumberList = ["1", "2", "3", "4", "5", "6", "7", "8"] as const;
export type ColumnLetterType = typeof ColumnLetterList[number];
export type RowNumberType = typeof RowNumberList[number];
export type TileNumberingType = `${ColumnLetterType}${RowNumberType}`;

export type RowType<TRow extends RowNumberType> = [
  [`a${TRow}`, PieceType],
  [`b${TRow}`, PieceType],
  [`c${TRow}`, PieceType],
  [`d${TRow}`, PieceType],
  [`e${TRow}`, PieceType],
  [`f${TRow}`, PieceType],
  [`g${TRow}`, PieceType],
  [`h${TRow}`, PieceType]
];
