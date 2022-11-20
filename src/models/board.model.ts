import { PieceType, PIECE_TYPE } from "./piece.model";

export type ColumnLetterType = "a" | "b" | "c" | "d" | "e" | "f" | "g" | "h";
export type RowNumberType = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8;
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
