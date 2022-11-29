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
import { determineIndicesOfPieceLocation, determineVector } from "./move.utils";

export function validateMove(move: MoveType, gameState: IGame): void {
  if (!move.from && !move.to && !move.type) {
    throw new BadRequestError("Missing required properties: [from, to, type]");
  }

  const fromColumn = move.from![0] as ColumnLetterType;
  const fromRow = move.from![1] as RowNumberType;
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

  const [movedPieceRow, movedPieceColumn] = determineIndicesOfPieceLocation(
    move.from
  );
  const movedTileState = gameState.board[movedPieceRow][movedPieceColumn];
  const movedPiece = movedTileState[1];
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
      const piecesMinusEmpty = Object.keys(PIECE_TYPE).filter(
        (key) => key !== PIECE_TYPE.EMPTY
      );
      throw new BadRequestError(
        `Unsupported piece type. Expecting one of: (${piecesMinusEmpty})`
      );
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
 */
function validatePawnMove(
  move: IPawnMove,
  gameState: IGame["board"]
): IGame["board"] {
  const { color, from, to } = move;
  const [fromXIndex, fromYIndex] = determineIndicesOfPieceLocation(from);
  const fromTileState = gameState[fromXIndex][fromYIndex];
  const piece = fromTileState[1];

  if (move.type !== piece.type) {
    throw new InternalServerError(
      `We messed up somewhere:( ${move.type} ) treated as ( ${piece.type} )`
    );
  }

  const [dx, dy] = determineVector(from, to);
  if ((dy < 0 && color === "white") || (dy > 0 && color === "black")) {
    throw new BadRequestError("Invalid move: Pawn cannot move backwards.");
  }

  if (dx > dy) {
    throw new BadRequestError("Invalid move: Pawn cannot move horizontally.");
  }

  if ((dy > 1 && piece.hasMoved) || (dy > 1 && dx > 0)) {
    throw new BadRequestError(
      "Invalid move: Pawn can only move forward 2 spaces as its first move of the game."
    );
  }

  const [toXIndex, toYIndex] = determineIndicesOfPieceLocation(to);
  const toTileState = gameState[toXIndex][toYIndex];
  if (dx > 0 && toTileState[1].type === Empty().type) {
    throw new BadRequestError(
      "Invalid move: Pawn cannot move diagonally unless capturing."
    );
  }

  if (dy > 0) {
    // Temporary until `determineIndicesOfPieceMovement` supports more pieces
    const pathYIndex = move.color === "black" ? toYIndex + 1 : toYIndex - 1;
    const pathTileState = gameState[toXIndex][pathYIndex];

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

  gameState[fromXIndex][fromYIndex] = newFromTileState;
  gameState[toXIndex][toYIndex] = newToTileState;

  return gameState;
}
