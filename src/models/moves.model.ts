import { TileNumberingType } from "./board.model";
import { ColorType, PIECE_TYPE } from "./piece.model";

export type MoveType = IBishopMove | IPawnMove;

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

export interface IPawnMove extends BaseMoveType<PIECE_TYPE.PAWN> {}
