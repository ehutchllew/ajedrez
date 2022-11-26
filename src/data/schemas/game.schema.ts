export const gameSchema = {
  $jsonSchema: {
    required: ["board", "history", "playerTurn"],
    properties: {
      board: {
        bsonType: "array",
        description: "matrix representation of a chess board",
      },
      history: {
        bsonType: "array",
        description: "list of historic actions from each player",
      },
      playerTurn: {
        enum: ["black", "white"],
      },
    },
  },
};
