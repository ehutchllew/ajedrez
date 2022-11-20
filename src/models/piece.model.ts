import { POSSIBLE_DIRECTIONS } from "./moves.model";

export enum PIECE_TYPE {
  BISHOP = "BISHOP",
  EMPTY = "EMPTY",
  KING = "KING",
  KNIGHT = "KNIGHT",
  PAWN = "PAWN",
  QUEEN = "QUEEN",
  ROOK = "ROOK",
}

export type ColorType = "black" | "white";
export type PieceType =
  | IBishop
  | IEmpty
  | IKing
  | IKnight
  | IPawn
  | IQueen
  | IRook;

export type ToJSONPieceType = Omit<PieceType, "allowed" | "capture">;

const allDirections = [
  POSSIBLE_DIRECTIONS.BACKWARD,
  POSSIBLE_DIRECTIONS.DIAGONAL,
  POSSIBLE_DIRECTIONS.FORWARD,
  POSSIBLE_DIRECTIONS.HORIZONTAL,
];

/**
 * This looks confusing, but what it's doing is saying that if the generjic type
 * `TPiece` is of any `PIECE_TYPE` type EXCEPT for `PIECE_TYPE.EMPTY` then `allowed`, `capture`,
 * and `color` properties should be defined; otherwise only `{ type: TPiece }` should be used.
 */
type BasePieceType<
  TPiece extends
    | Exclude<PIECE_TYPE, PIECE_TYPE.EMPTY>
    | Extract<PIECE_TYPE, PIECE_TYPE.EMPTY>,
  TAllowed extends POSSIBLE_DIRECTIONS[],
  TCapture extends POSSIBLE_DIRECTIONS[]
> = TPiece extends Exclude<PIECE_TYPE, PIECE_TYPE.EMPTY>
  ? {
      allowed: Set<Extract<POSSIBLE_DIRECTIONS, TAllowed[number]>>;
      capture: Set<Extract<POSSIBLE_DIRECTIONS, TCapture[number]>>;
      color: ColorType;
      type: TPiece;
      toJSON: () => ToJSONPieceType;
    }
  : {
      type: TPiece;
    };

/**
 * * * * * * * * * * * *
 * * * * BISHOP * * * * *
 * * * * * * * * * * * *
 */
export interface IBishop
  extends BasePieceType<
    PIECE_TYPE.BISHOP,
    [POSSIBLE_DIRECTIONS.DIAGONAL],
    [POSSIBLE_DIRECTIONS.DIAGONAL]
  > {}
interface IBishopParameters {
  color: ColorType;
}
export function Bishop({ color }: IBishopParameters): IBishop {
  return {
    allowed: new Set([POSSIBLE_DIRECTIONS.DIAGONAL]),
    capture: new Set([POSSIBLE_DIRECTIONS.DIAGONAL]),
    color,
    type: PIECE_TYPE.BISHOP,
    toJSON() {
      return {
        ...this,
        allowed: [...this.allowed],
        capture: [...this.capture],
      };
    },
  };
}

/**
 * * * * * * * * * * * *
 * * * * EMPTY * * * * *
 * * * * * * * * * * * *
 */
export interface IEmpty extends BasePieceType<PIECE_TYPE.EMPTY, never, never> {}
export function Empty(): IEmpty {
  return {
    type: PIECE_TYPE.EMPTY,
  };
}

/**
 * * * * * * * * * * * *
 * * * * KING * * * * *
 * * * * * * * * * * * *
 */
export interface IKing
  extends BasePieceType<
    PIECE_TYPE.KING,
    typeof allDirections,
    typeof allDirections
  > {
  hasMoved: boolean;
}
interface IKingParameters {
  color: ColorType;
  hasMoved: boolean;
}
export function King({ color, hasMoved }: IKingParameters): IKing {
  return {
    allowed: new Set(allDirections),
    capture: new Set(allDirections),
    color,
    hasMoved,
    type: PIECE_TYPE.KING,
    toJSON() {
      return {
        ...this,
        allowed: [...this.allowed],
        capture: [...this.capture],
      };
    },
  };
}

/**
 * * * * * * * * * * * *
 * * * * KNIGHT * * * * *
 * * * * * * * * * * * *
 */
export interface IKnight
  extends BasePieceType<
    PIECE_TYPE.KNIGHT,
    [
      POSSIBLE_DIRECTIONS.BACKWARD,
      POSSIBLE_DIRECTIONS.FORWARD,
      POSSIBLE_DIRECTIONS.HORIZONTAL
    ],
    [
      POSSIBLE_DIRECTIONS.BACKWARD,
      POSSIBLE_DIRECTIONS.FORWARD,
      POSSIBLE_DIRECTIONS.HORIZONTAL
    ]
  > {}
interface IKnightParameters {
  color: ColorType;
}
export function Knight({ color }: IKnightParameters): IKnight {
  return {
    allowed: new Set([
      POSSIBLE_DIRECTIONS.BACKWARD,
      POSSIBLE_DIRECTIONS.FORWARD,
      POSSIBLE_DIRECTIONS.HORIZONTAL,
    ]),
    capture: new Set([
      POSSIBLE_DIRECTIONS.BACKWARD,
      POSSIBLE_DIRECTIONS.FORWARD,
      POSSIBLE_DIRECTIONS.HORIZONTAL,
    ]),
    color,
    type: PIECE_TYPE.KNIGHT,
    toJSON() {
      return {
        ...this,
        allowed: [...this.allowed],
        capture: [...this.capture],
      };
    },
  };
}

/**
 * * * * * * * * * * * *
 * * * * PAWN * * * * * *
 * * * * * * * * * * * *
 */
export interface IPawn
  extends BasePieceType<
    PIECE_TYPE.PAWN,
    [POSSIBLE_DIRECTIONS.DIAGONAL, POSSIBLE_DIRECTIONS.FORWARD],
    [POSSIBLE_DIRECTIONS.DIAGONAL]
  > {
  hasMoved: boolean;
}
interface IPawnParameters {
  color: ColorType;
  hasMoved: boolean;
}
export function Pawn({ color, hasMoved }: IPawnParameters): IPawn {
  return {
    allowed: new Set([
      POSSIBLE_DIRECTIONS.DIAGONAL,
      POSSIBLE_DIRECTIONS.FORWARD,
    ]),
    capture: new Set([POSSIBLE_DIRECTIONS.DIAGONAL]),
    color,
    hasMoved,
    type: PIECE_TYPE.PAWN,
    toJSON() {
      return {
        ...this,
        allowed: [...this.allowed],
        capture: [...this.capture],
      };
    },
  };
}

/**
 * * * * * * * * * * * *
 * * * * QUEEN * * * * *
 * * * * * * * * * * * *
 */
export interface IQueen
  extends BasePieceType<
    PIECE_TYPE.QUEEN,
    typeof allDirections,
    typeof allDirections
  > {}
interface IQueenParameters {
  color: ColorType;
}
export function Queen({ color }: IQueenParameters): IQueen {
  return {
    allowed: new Set(allDirections),
    capture: new Set(allDirections),
    color,
    type: PIECE_TYPE.QUEEN,
    toJSON() {
      return {
        ...this,
        allowed: [...this.allowed],
        capture: [...this.capture],
      };
    },
  };
}

/**
 * * * * * * * * * * * *
 * * * * ROOK * * * * * *
 * * * * * * * * * * * *
 */
export interface IRook
  extends BasePieceType<
    PIECE_TYPE.ROOK,
    [
      POSSIBLE_DIRECTIONS.BACKWARD,
      POSSIBLE_DIRECTIONS.FORWARD,
      POSSIBLE_DIRECTIONS.HORIZONTAL
    ],
    [
      POSSIBLE_DIRECTIONS.BACKWARD,
      POSSIBLE_DIRECTIONS.FORWARD,
      POSSIBLE_DIRECTIONS.HORIZONTAL
    ]
  > {
  hasMoved: boolean;
}
interface IRookParameters {
  color: ColorType;
  hasMoved: boolean;
}
export function Rook({ color, hasMoved }: IRookParameters): IRook {
  return {
    allowed: new Set([
      POSSIBLE_DIRECTIONS.BACKWARD,
      POSSIBLE_DIRECTIONS.FORWARD,
      POSSIBLE_DIRECTIONS.HORIZONTAL,
    ]),
    capture: new Set([
      POSSIBLE_DIRECTIONS.BACKWARD,
      POSSIBLE_DIRECTIONS.FORWARD,
      POSSIBLE_DIRECTIONS.HORIZONTAL,
    ]),
    color,
    hasMoved,
    type: PIECE_TYPE.ROOK,
    toJSON() {
      return {
        ...this,
        allowed: [...this.allowed],
        capture: [...this.capture],
      };
    },
  };
}
