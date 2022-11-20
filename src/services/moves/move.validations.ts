import { TileNumberingType } from "src/models/board.model";
import { IGame } from "src/models/game.model";
import { IBishopMove, IPawnMove, MoveType } from "src/models/moves.model";
import { Empty, Pawn, PIECE_TYPE } from "src/models/piece.model";
import {
  BadRequestError,
  InternalServerError,
  InvalidDataError,
} from "src/utils/errors";

export function validateMove(move: MoveType, gameState: IGame): void {
  if (move.color !== gameState.playerTurn) {
    throw new BadRequestError(
      `Invalid move: it's ${gameState.playerTurn}'s turn, but player attempted to move a ${move.color} piece`
    );
  }

  switch (move.type) {
    case PIECE_TYPE.BISHOP:
      validateBishopMove(move);
      break;
    case PIECE_TYPE.PAWN:
      validatePawnMove(move, gameState.board);
      break;
    default:
      throw new BadRequestError(
        `Unsupported piece type. Expecting one of: (${Object.keys(PIECE_TYPE)})`
      );
  }
}

function validateBishopMove(_: IBishopMove): void {
  throw new InvalidDataError("Bishop piece not yet supported");
}

function validatePawnMove(
  move: IPawnMove,
  gameState: IGame["board"]
): IGame["board"] {
  const { color, from, to } = move;
  const [fromXIndex, fromYIndex] = determineIndicesOfPieceMovement(from);
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

  const [toXIndex, toYIndex] = determineIndicesOfPieceMovement(to);
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

/**
 *
 * TODO: Expand this to include indices of ENTIRE path. Perhaps as Array<[number, number]>
 * that way we can support pieces that aren't of type `IPawn`.
 */
function determineIndicesOfPieceMovement(
  to: TileNumberingType
): [number, number] {
  const [columnPosition, rowPosition] = to.split("");
  const rowIndex = parseInt(rowPosition) - 1;
  const columnIndex = columnPosition.charCodeAt(0) - "a".charCodeAt(0);
  return [rowIndex, columnIndex];
}

/**
 *
 * FIXME: could probably get rid of this by just comparing:
 * `determineIndicesOfPieceMovement(from)` and `determineIndicesOfPieceMovement(to)`
 */
function determineVector(
  from: IPawnMove["from"],
  to: IPawnMove["to"]
): [number, number] {
  const [fromColumn, fromRow] = from.split("");
  const [toColumn, toRow] = to.split("");

  const columnDistance = toColumn.charCodeAt(0) - fromColumn.charCodeAt(0);
  const rowDistance = parseInt(toRow) - parseInt(fromRow);

  return [rowDistance, columnDistance];
}
