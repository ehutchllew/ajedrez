import { IGame } from "src/models/game.model";
import { PIECE_TYPE } from "src/models/piece.model";

// export function deriveBoardFromHistory(
//   history: IGame["history"]
// ): IGame["board"] {
//   const newBoard = generateNewBoard();

// }

export function generateNewBoard(): IGame["board"] {
  return [
    [
      ["a1", { color: "white", type: PIECE_TYPE.ROOK }],
      ["b1", { color: "white", type: PIECE_TYPE.KNIGHT }],
      ["c1", { color: "white", type: PIECE_TYPE.BISHOP }],
      ["d1", { color: "white", type: PIECE_TYPE.KING }],
      ["e1", { color: "white", type: PIECE_TYPE.QUEEN }],
      ["f1", { color: "white", type: PIECE_TYPE.BISHOP }],
      ["g1", { color: "white", type: PIECE_TYPE.KNIGHT }],
      ["h1", { color: "white", type: PIECE_TYPE.ROOK }],
    ],
    [
      ["a2", { color: "white", type: PIECE_TYPE.PAWN }],
      ["b2", { color: "white", type: PIECE_TYPE.PAWN }],
      ["c2", { color: "white", type: PIECE_TYPE.PAWN }],
      ["d2", { color: "white", type: PIECE_TYPE.PAWN }],
      ["e2", { color: "white", type: PIECE_TYPE.PAWN }],
      ["f2", { color: "white", type: PIECE_TYPE.PAWN }],
      ["g2", { color: "white", type: PIECE_TYPE.PAWN }],
      ["h2", { color: "white", type: PIECE_TYPE.PAWN }],
    ],
    [
      ["a3", { type: null }],
      ["b3", { type: null }],
      ["c3", { type: null }],
      ["d3", { type: null }],
      ["e3", { type: null }],
      ["f3", { type: null }],
      ["g3", { type: null }],
      ["h3", { type: null }],
    ],
    [
      ["a4", { type: null }],
      ["b4", { type: null }],
      ["c4", { type: null }],
      ["d4", { type: null }],
      ["e4", { type: null }],
      ["f4", { type: null }],
      ["g4", { type: null }],
      ["h4", { type: null }],
    ],
    [
      ["a5", { type: null }],
      ["b5", { type: null }],
      ["c5", { type: null }],
      ["d5", { type: null }],
      ["e5", { type: null }],
      ["f5", { type: null }],
      ["g5", { type: null }],
      ["h5", { type: null }],
    ],
    [
      ["a6", { type: null }],
      ["b6", { type: null }],
      ["c6", { type: null }],
      ["d6", { type: null }],
      ["e6", { type: null }],
      ["f6", { type: null }],
      ["g6", { type: null }],
      ["h6", { type: null }],
    ],
    [
      ["a7", { color: "black", type: PIECE_TYPE.PAWN }],
      ["b7", { color: "black", type: PIECE_TYPE.PAWN }],
      ["c7", { color: "black", type: PIECE_TYPE.PAWN }],
      ["d7", { color: "black", type: PIECE_TYPE.PAWN }],
      ["e7", { color: "black", type: PIECE_TYPE.PAWN }],
      ["f7", { color: "black", type: PIECE_TYPE.PAWN }],
      ["g7", { color: "black", type: PIECE_TYPE.PAWN }],
      ["h7", { color: "black", type: PIECE_TYPE.PAWN }],
    ],
    [
      ["a8", { color: "black", type: PIECE_TYPE.ROOK }],
      ["b8", { color: "black", type: PIECE_TYPE.KNIGHT }],
      ["c8", { color: "black", type: PIECE_TYPE.BISHOP }],
      ["d8", { color: "black", type: PIECE_TYPE.KING }],
      ["e8", { color: "black", type: PIECE_TYPE.QUEEN }],
      ["f8", { color: "black", type: PIECE_TYPE.BISHOP }],
      ["g8", { color: "black", type: PIECE_TYPE.KNIGHT }],
      ["h8", { color: "black", type: PIECE_TYPE.ROOK }],
    ],
  ];
}
