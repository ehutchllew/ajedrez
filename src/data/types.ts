import {
  Collection as MongoCollection,
  CreateCollectionOptions,
  Document as MongoDocument,
  MongoError,
} from "mongodb";
import { IGame } from "src/models/game.model";
import { ILog } from "src/models/log.model";

export enum COLLECTION_TYPES {
  GAMES = "GAMES",
  LOGS = "LOGS",
}

export type CollectionReturnType = {
  [COLLECTION_TYPES.GAMES]: IGame;
  [COLLECTION_TYPES.LOGS]: ILog;
};

export interface ICollection<T extends MongoDocument>
  extends MongoCollection<T> {}

export type ICollectionCallback<T> = (error: MongoError, result: T) => void;

export interface ICollectionCreateOptions extends CreateCollectionOptions {}

export abstract class AbstractDb {
  public abstract collection<TSchema extends MongoDocument>(
    name: keyof CollectionReturnType
  ): ICollection<TSchema>;

  public abstract createCollection<TSchema extends MongoDocument>(
    name: keyof CollectionReturnType,
    options: ICollectionCreateOptions,
    callback: ICollectionCallback<ICollection<TSchema>>
  ): void;
}
