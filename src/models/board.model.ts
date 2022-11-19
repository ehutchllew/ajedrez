import { PIECE_TYPE } from "./piece.model";

export type ColumnLetterType = "a" | "b" | "c" | "d" | "e" | "f" | "g" | "h";
export type RowNumberType = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8;
export type TileType =
  | {
      type: PIECE_TYPE;
      color: "white" | "black";
    }
  | {
      type: null;
      color?: never;
    };

export type RowType<TRow extends RowNumberType> = [
  [`a${TRow}`, TileType],
  [`b${TRow}`, TileType],
  [`c${TRow}`, TileType],
  [`d${TRow}`, TileType],
  [`e${TRow}`, TileType],
  [`f${TRow}`, TileType],
  [`g${TRow}`, TileType],
  [`h${TRow}`, TileType]
];
