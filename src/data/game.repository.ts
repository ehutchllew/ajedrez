import { Collection, DeleteResult, WithId } from "mongodb";
import { IGame } from "src/models/game.model";

export interface IGameRepository {
  createGame(game: IGame): Promise<IGame>;
  deleteGame(id: string): Promise<DeleteResult>;
  getGameById(id: string): Promise<WithId<IGame> | null>;
  updateGame(gameUpdate: IGame): Promise<IGame>;
}
export function createGameRepository(
  collection: Collection<IGame>
): IGameRepository {
  return {
    async createGame(game: IGame) {
      await collection.insertOne(game);
      return game;
    },

    async deleteGame(id: string) {
      const deleteResult = await collection.findOneAndDelete({
        _id: id,
      });

      return {
        acknowledged: Boolean(deleteResult.value),
        deletedCount: deleteResult.ok,
      };
    },
    async getGameById(id: string) {
      const foundGame = await collection.findOne({ _id: id });
      return foundGame;
    },
    async updateGame(gameUpdate: IGame) {
      await collection.findOneAndUpdate({ _id: gameUpdate._id }, gameUpdate);

      return gameUpdate;
    },
  };
}
