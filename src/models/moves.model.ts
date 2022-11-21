import { TileNumberingType } from "./board.model";
import { ColorType, PIECE_TYPE } from "./piece.model";

export type MoveType =
  | IBishopMove
  | IKingMove
  | IKnightMove
  | IPawnMove
  | IQueenMove
  | IRookMove;

export enum POSSIBLE_DIRECTIONS {
  BACKWARD = "BACKWARD",
  DIAGONAL = "DIAGONAL",
  FORWARD = "FORWARD",
  HORIZONTAL = "HORIZONTAL",
}

type BaseMoveType<TPiece extends PIECE_TYPE> = {
  color: ColorType;
  from: TileNumberingType;
  to: TileNumberingType;
  type: TPiece;
};

export interface IBishopMove extends BaseMoveType<PIECE_TYPE.BISHOP> {}
export interface IKingMove extends BaseMoveType<PIECE_TYPE.KING> {}
export interface IKnightMove extends BaseMoveType<PIECE_TYPE.KNIGHT> {}
export interface IPawnMove extends BaseMoveType<PIECE_TYPE.PAWN> {}
export interface IQueenMove extends BaseMoveType<PIECE_TYPE.QUEEN> {}
export interface IRookMove extends BaseMoveType<PIECE_TYPE.ROOK> {}
