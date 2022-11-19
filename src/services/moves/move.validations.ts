import {
  POSSIBLE_DIRECTIONS,
  IBishopMove,
  IPawnMove,
  MoveType,
} from "src/models/moves.model";
import { Pawn, PIECE_TYPE } from "src/models/piece.model";
import { BadRequestError, InvalidDataError } from "src/utils/errors";

export function validateMove(move: MoveType): void {
  // Need to check which player moved as well
  switch (move.type) {
    case PIECE_TYPE.BISHOP:
      validateBishopMove(move);
      break;
    case PIECE_TYPE.PAWN:
      validatePawnMove(move);
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

function validatePawnMove(move: IPawnMove): void {
  const pawn = Pawn();

  const { color, from, to } = move;
  const vector = determineVector(from, to)
  if()
}

function determineVector(from: IPawnMove["from"], to: IPawnMove["to"]): [number, number] {
    const [fromColumn, fromRow] = from.split("")
    const [toColumn, toRow] = to.split("")

    const columnDistance = toColumn.charCodeAt(0) - fromColumn.charCodeAt(0)
    const rowDistance = parseInt(toRow) - parseInt(fromRow)

    return [rowDistance, columnDistance]
}
