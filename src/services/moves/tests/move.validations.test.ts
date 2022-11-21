import { MoveType } from "src/models/moves.model";
import { IEmpty, PIECE_TYPE } from "src/models/piece.model";
import { createGame } from "src/services/game/post/post.service";
import { BadRequestError, InvalidDataError } from "src/utils/errors";
import { validateMove } from "../move.validations";

describe("Move Validations", () => {
  const pieceTypes = Object.values(PIECE_TYPE);

  pieceTypes.forEach((piece) => {
    if (piece === PIECE_TYPE.PAWN || piece === PIECE_TYPE.EMPTY) return;
    it(`should throw an Invalid Data Error when validating against a type of (${piece})`, () => {
      try {
        const moveType: MoveType = {
          from: "a1",
          to: "a2",
          color: "white",
          type: piece,
        };
        validateMove(moveType, createGame());
      } catch (err) {
        expect(err).toBeInstanceOf(InvalidDataError);
        expect(err).toMatchSnapshot({
          stack: expect.any(String),
        });
      }
    });
  });

  it("should trhow a Bad Request Error when validating against EMPTY or an unknown piece type", () => {
    try {
      const moveType: MoveType = {
        // @ts-expect-error
        type: PIECE_TYPE.EMPTY,
      };
      validateMove(moveType, createGame());
    } catch (err) {
      expect(err).toBeInstanceOf(BadRequestError);
      expect(err).toMatchInlineSnapshot(
        {
          stack: expect.any(String),
        },
        `
{
  "message": "Unsupported piece type. Expecting one of: (BISHOP,KING,KNIGHT,PAWN,QUEEN,ROOK)",
  "stack": Any<String>,
  "statusCode": 400,
}
`
      );
    }
  });

  // TODO: Fill this out!
  describe("PAWN Move Validations", () => {});
});
