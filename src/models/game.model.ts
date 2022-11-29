import { RowType } from "./board.model";
import { MoveType } from "./moves.model";
import { ColorType } from "./piece.model";

export interface IGame {
  _id: string;
  board: [
    RowType<"1">,
    RowType<"2">,
    RowType<"3">,
    RowType<"4">,
    RowType<"5">,
    RowType<"6">,
    RowType<"7">,
    RowType<"8">
  ];
  history: MoveType[];
  playerTurn: ColorType;
}

interface IGameParams extends Readonly<IGame> {}
export function Game(params: IGameParams): IGame {
  const { _id, board, history, playerTurn } = params;
  return {
    _id,
    board,
    history,
    playerTurn,
  };
}
