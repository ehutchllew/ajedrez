import {
  ColumnLetterList,
  ColumnLetterType,
  RowNumberList,
  RowNumberType,
} from "src/models/board.model";
import { IGame } from "src/models/game.model";
import {
  IBishopMove,
  IKingMove,
  IKnightMove,
  IPawnMove,
  IQueenMove,
  IRookMove,
  MoveType,
} from "src/models/moves.model";
import { Empty, Pawn, PIECE_TYPE } from "src/models/piece.model";
import {
  BadRequestError,
  InternalServerError,
  InvalidDataError,
} from "src/utils/errors";
import {
  determineIndicesOfPieceLocation,
  determineVector,
  getMovedPiece,
} from "./move.utils";

export function validateMove(move: MoveType, gameState: IGame): void {
  if (!move.from && !move.to && !move.type) {
    throw new BadRequestError("Missing required properties: [from, to, type]");
  }

  const piecesMinusEmpty = Object.keys(PIECE_TYPE).filter(
    (key) => key !== PIECE_TYPE.EMPTY
  );
  if (!piecesMinusEmpty.includes(move.type)) {
    throw new BadRequestError(
      `Unsupported piece type. Expecting one of: (${piecesMinusEmpty})`
    );
  }

  const fromColumn = move.from[0] as ColumnLetterType;
  const fromRow = move.from[1] as RowNumberType;
  if (
    !ColumnLetterList.includes(fromColumn) ||
    !RowNumberList.includes(fromRow)
  ) {
    throw new BadRequestError("Invalid starting point, received: " + move.from);
  }

  const toColumn = move.to![0] as ColumnLetterType;
  const toRow = move.to![1] as RowNumberType;
  if (!ColumnLetterList.includes(toColumn) || !RowNumberList.includes(toRow)) {
    throw new BadRequestError("Invalid ending point, received: " + move.to);
  }

  if (move.color && move.color !== gameState.playerTurn) {
    throw new BadRequestError(
      `Invalid move: it's ${gameState.playerTurn}'s turn, but player attempted to move a ${move.color} piece`
    );
  }

  const movedPiece = getMovedPiece(move, gameState);
  if (
    !move.color &&
    movedPiece.type !== PIECE_TYPE.EMPTY &&
    movedPiece.color === gameState.playerTurn
  ) {
    throw new BadRequestError(
      `Invalid move: it's ${gameState.playerTurn}'s turn, but player attempted to move a ${move.color} piece`
    );
  }

  switch (move.type) {
    case PIECE_TYPE.BISHOP:
      validateBishopMove(move);
      break;
    case PIECE_TYPE.KING:
      validateKingMove(move);
      break;
    case PIECE_TYPE.KNIGHT:
      validateKnightMove(move);
      break;
    case PIECE_TYPE.PAWN:
      validatePawnMove(move, gameState.board);
      break;
    case PIECE_TYPE.QUEEN:
      validateQueenMove(move);
      break;
    case PIECE_TYPE.ROOK:
      validateRookMove(move);
      break;
    default:
      break;
  }
}

function validateBishopMove(_: IBishopMove): void {
  throw new InvalidDataError("Bishop piece not yet supported");
}

function validateKingMove(_: IKingMove): void {
  throw new InvalidDataError("King piece not yet supported");
}

function validateKnightMove(_: IKnightMove): void {
  throw new InvalidDataError("Knight piece not yet supported");
}

function validateQueenMove(_: IQueenMove): void {
  throw new InvalidDataError("Queen piece not yet supported");
}

function validateRookMove(_: IRookMove): void {
  throw new InvalidDataError("Rook piece not yet supported");
}

/**
 * FIXME: A lot of this logic could be hoisted to the more general `validateMove`.
 * Like the `determineIndicesOfPieceMovement` and `gameState` accessing.
 *
 * Additionally the conditionals are a bit sloppy, should probably consider ordering by y-movements and x-movements
 */
function validatePawnMove(
  move: IPawnMove,
  gameState: IGame["board"]
): IGame["board"] {
  const { color, from, to } = move;
  const [fromRowIndex, fromColumnIndex] = determineIndicesOfPieceLocation(from);
  const fromTileState = gameState[fromRowIndex][fromColumnIndex];
  const piece = fromTileState[1];

  if (move.type !== piece.type) {
    throw new InternalServerError(
      `We messed up somewhere:( ${move.type} ) treated as ( ${piece.type} )`
    );
  }

  const [deeEx, deeWhy] = determineVector(from, to);
  if ((deeWhy < 0 && color === "white") || (deeWhy > 0 && color === "black")) {
    throw new BadRequestError("Invalid move: Pawn cannot move backwards.");
  }

  const dy = Math.abs(deeWhy);
  const dx = Math.abs(deeEx);
  if (dx > dy) {
    throw new BadRequestError("Invalid move: Pawn cannot move horizontally.");
  }

  if (dy > 2) {
    throw new BadRequestError(
      `Invalid move: Pawn cannot move that many spaces, tried to move: ${dy}`
    );
  }

  if (dy > 1) {
    if (piece.hasMoved || dx > 0) {
      throw new BadRequestError(
        "Invalid move: Pawn can only move forward 2 spaces as its first move of the game."
      );
    }
  }

  const [toRowIndex, toColumnIndex] = determineIndicesOfPieceLocation(to);
  const toTileState = gameState[toRowIndex][toColumnIndex];

  if (
    toTileState[1].type !== Empty().type &&
    piece.color === toTileState[1].color
  ) {
    throw new BadRequestError(
      "Invalid move: Pawn cannot collide with a piece of its own color."
    );
  }

  if (dx > 0 && toTileState[1].type === Empty().type) {
    throw new BadRequestError(
      "Invalid move: Pawn cannot move diagonally unless capturing."
    );
  }

  if (dx > 1) {
    throw new BadRequestError(
      "Invalid move: Pawn cannot move more than 1 space when capturing."
    );
  }

  if (dy > 0 && dx < 1) {
    let pathRowIndex = toRowIndex;
    // Temporary until `determineIndicesOfPieceMovement` supports more pieces
    if (dy > 1) {
      pathRowIndex = move.color === "black" ? toRowIndex + 1 : toRowIndex - 1;
    }

    const pathTileState = gameState[pathRowIndex][toColumnIndex];

    if (
      toTileState[1].type !== Empty().type ||
      pathTileState[1].type !== Empty().type
    )
      throw new BadRequestError(
        "Invalid move: Pawn cannot move forward when tile is occupied by another piece."
      );
  }

  const newFromTileState = [fromTileState[0], Empty()] as typeof fromTileState;

  const newToTileState = [
    toTileState[0],
    Pawn({ color: move.color, hasMoved: true }),
  ] as typeof toTileState;

  gameState[fromRowIndex][fromColumnIndex] = newFromTileState;
  gameState[toRowIndex][toColumnIndex] = newToTileState;

  return gameState;
}
