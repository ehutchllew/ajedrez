import { TileNumberingType } from "src/models/board.model";
import { IGame } from "src/models/game.model";
import { IPawnMove, MoveType } from "src/models/moves.model";

/**
 *
 * TODO: Expand this to include indices of ENTIRE path. Perhaps as Array<[number, number]>
 * that way we can support pieces that aren't of type `IPawn`.
 */
export function determineIndicesOfPieceLocation(
  tile: TileNumberingType
): [number, number] {
  const [columnPosition, rowPosition] = tile.split("");
  const rowIndex = parseInt(rowPosition) - 1;
  const columnIndex = columnPosition.charCodeAt(0) - "a".charCodeAt(0);
  return [rowIndex, columnIndex];
}

/**
 *
 * FIXME: could probably get rid of this by just comparing:
 * `determineIndicesOfPieceMovement(from)` and `determineIndicesOfPieceMovement(to)`
 */
export function determineVector(
  from: IPawnMove["from"],
  to: IPawnMove["to"]
): [number, number] {
  const [fromColumn, fromRow] = from.split("");
  const [toColumn, toRow] = to.split("");

  const rowDistance = toColumn.charCodeAt(0) - fromColumn.charCodeAt(0);
  const columnDistance = parseInt(toRow) - parseInt(fromRow);

  return [rowDistance, columnDistance];
}

export function getMovedPiece(move: MoveType, gameState: IGame) {
  const [movedPieceRow, movedPieceColumn] = determineIndicesOfPieceLocation(
    move.from
  );
  const movedTileState = gameState.board[movedPieceRow][movedPieceColumn];
  return movedTileState[1];
}
