import { Collection, DeleteResult, WithId } from "mongodb";
import { IGame } from "src/models/game.model";

export interface IGameRepository {
  createGame(game: IGame): Promise<IGame>;
  deleteGame(id: string): Promise<DeleteResult>;
  getGameById(id: string): Promise<WithId<IGame> | null>;
  updateGame(gameUpdate: Partial<IGame>): Promise<IGame>;
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
    getGameById(id: string) {
      return collection.findOne({ _id: id });
    },
    async updateGame(gameUpdate: IGame) {
      await collection.findOneAndUpdate({ _id: gameUpdate._id }, gameUpdate);

      return gameUpdate;
    },
  };
}
