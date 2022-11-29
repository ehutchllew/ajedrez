import { IGame } from "src/models/game.model";
import { MoveType } from "src/models/moves.model";
import {
  Bishop,
  Empty,
  King,
  Knight,
  Pawn,
  Queen,
  Rook,
} from "src/models/piece.model";

// export function deriveBoardFromHistory(
//   history: IGame["history"]
// ): IGame["board"] {
//   const newBoard = generateNewBoard();

// }

export function generateNewBoard(): IGame["board"] {
  return [
    [
      ["a1", Rook({ color: "white", hasMoved: false })],
      ["b1", Knight({ color: "white" })],
      ["c1", Bishop({ color: "white" })],
      ["d1", King({ color: "white", hasMoved: false })],
      ["e1", Queen({ color: "white" })],
      ["f1", Bishop({ color: "white" })],
      ["g1", Knight({ color: "white" })],
      ["h1", Rook({ color: "white", hasMoved: false })],
    ],
    [
      ["a2", Pawn({ color: "white", hasMoved: false })],
      ["b2", Pawn({ color: "white", hasMoved: false })],
      ["c2", Pawn({ color: "white", hasMoved: false })],
      ["d2", Pawn({ color: "white", hasMoved: false })],
      ["e2", Pawn({ color: "white", hasMoved: false })],
      ["f2", Pawn({ color: "white", hasMoved: false })],
      ["g2", Pawn({ color: "white", hasMoved: false })],
      ["h2", Pawn({ color: "white", hasMoved: false })],
    ],
    [
      ["a3", Empty()],
      ["b3", Empty()],
      ["c3", Empty()],
      ["d3", Empty()],
      ["e3", Empty()],
      ["f3", Empty()],
      ["g3", Empty()],
      ["h3", Empty()],
    ],
    [
      ["a4", Empty()],
      ["b4", Empty()],
      ["c4", Empty()],
      ["d4", Empty()],
      ["e4", Empty()],
      ["f4", Empty()],
      ["g4", Empty()],
      ["h4", Empty()],
    ],
    [
      ["a5", Empty()],
      ["b5", Empty()],
      ["c5", Empty()],
      ["d5", Empty()],
      ["e5", Empty()],
      ["f5", Empty()],
      ["g5", Empty()],
      ["h5", Empty()],
    ],
    [
      ["a6", Empty()],
      ["b6", Empty()],
      ["c6", Empty()],
      ["d6", Empty()],
      ["e6", Empty()],
      ["f6", Empty()],
      ["g6", Empty()],
      ["h6", Empty()],
    ],
    [
      ["a7", Pawn({ color: "black", hasMoved: false })],
      ["b7", Pawn({ color: "black", hasMoved: false })],
      ["c7", Pawn({ color: "black", hasMoved: false })],
      ["d7", Pawn({ color: "black", hasMoved: false })],
      ["e7", Pawn({ color: "black", hasMoved: false })],
      ["f7", Pawn({ color: "black", hasMoved: false })],
      ["g7", Pawn({ color: "black", hasMoved: false })],
      ["h7", Pawn({ color: "black", hasMoved: false })],
    ],
    [
      ["a8", Rook({ color: "black", hasMoved: false })],
      ["b8", Knight({ color: "black" })],
      ["c8", Bishop({ color: "black" })],
      ["d8", King({ color: "black", hasMoved: false })],
      ["e8", Queen({ color: "black" })],
      ["f8", Bishop({ color: "black" })],
      ["g8", Knight({ color: "black" })],
      ["h8", Rook({ color: "black", hasMoved: false })],
    ],
  ];
}

export function updateGameStateFromMove(
  move: MoveType,
  dbGameState: IGame
): IGame {}
