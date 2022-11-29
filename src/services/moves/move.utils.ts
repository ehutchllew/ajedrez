import { TileNumberingType } from "src/models/board.model";
import { IPawnMove } from "src/models/moves.model";

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

  const columnDistance = toColumn.charCodeAt(0) - fromColumn.charCodeAt(0);
  const rowDistance = parseInt(toRow) - parseInt(fromRow);

  return [rowDistance, columnDistance];
}
