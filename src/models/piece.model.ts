import { POSSIBLE_DIRECTIONS } from "./moves.model";

export enum PIECE_TYPE {
  BISHOP,
  KING,
  KNIGHT,
  PAWN,
  QUEEN,
  ROOK,
}

export type ColorType = "black" | "white";

type BasePieceType<
  TPiece extends PIECE_TYPE,
  TAllowed extends POSSIBLE_DIRECTIONS[],
  TCapture extends POSSIBLE_DIRECTIONS[]
> = {
  allowed: Set<Extract<POSSIBLE_DIRECTIONS, TAllowed[number]>>;
  capture: Set<Extract<POSSIBLE_DIRECTIONS, TCapture[number]>>;
  type: TPiece;
};

export interface IBishop
  extends BasePieceType<
    PIECE_TYPE.BISHOP,
    [POSSIBLE_DIRECTIONS.DIAGONAL],
    [POSSIBLE_DIRECTIONS.DIAGONAL]
  > {}

export interface IPawn
  extends BasePieceType<
    PIECE_TYPE.PAWN,
    [POSSIBLE_DIRECTIONS.DIAGONAL, POSSIBLE_DIRECTIONS.FORWARD],
    [POSSIBLE_DIRECTIONS.DIAGONAL]
  > {}

export function Pawn(): IPawn {
  return {
    allowed: new Set([
      POSSIBLE_DIRECTIONS.DIAGONAL,
      POSSIBLE_DIRECTIONS.FORWARD,
    ]),
    capture: new Set([POSSIBLE_DIRECTIONS.DIAGONAL]),
    type: PIECE_TYPE.PAWN,
  };
}
