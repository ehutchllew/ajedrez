import {
  Callback as MongoCallback,
  CreateCollectionOptions as MongoCreateCollectionOptions,
} from "mongodb";
import { gameSchema, logSchema } from "./schemas";
import {
  AbstractDb,
  CollectionReturnType,
  COLLECTION_TYPES,
  ICollection,
} from "./types";

export class AppDb {
  /**
   * @param db will be of type `AbstractDb` (which will itself extend MongoDb)
   */
  constructor(private readonly db: AbstractDb) {
    this.createCollections(db);
  }

  public collection<K extends COLLECTION_TYPES>(
    type: K
  ): ICollection<CollectionReturnType[K]> {
    switch (type) {
      case COLLECTION_TYPES.GAMES:
        return this.db.collection(COLLECTION_TYPES.GAMES);
      case COLLECTION_TYPES.LOGS:
        return this.db.collection(COLLECTION_TYPES.LOGS);
    }

    throw new Error("Collection does not exist");
  }

  protected createCollections(db: AbstractDb): void {
    Object.keys(COLLECTION_TYPES).forEach((name) => {
      const typedName = name as keyof CollectionReturnType;
      db.createCollection(
        typedName,
        this.mapCollectionNameToSchema(typedName),
        this.mapCollectionNameToCallback(typedName)
      );
    });
  }

  protected mapCollectionNameToCallback(
    name: COLLECTION_TYPES
  ): MongoCallback<ICollection<CollectionReturnType[COLLECTION_TYPES]>> {
    switch (name) {
      case COLLECTION_TYPES.GAMES:
        return (err, result) => {
          if (err)
            console.error("Failed to create collection::: ", name, "\n", err);
          else {
            console.log("Created collection: ", name, "\n", result);
          }
        };
      case COLLECTION_TYPES.LOGS:
        return (err, result) => {
          if (err)
            console.error("Failed to create collection::: ", name, "\n", err);
          else {
            result?.createIndex("path", { unique: false });
          }
        };
      default:
        return (_, __) => {};
    }
  }

  protected mapCollectionNameToSchema(
    name: COLLECTION_TYPES
  ): MongoCreateCollectionOptions {
    switch (name) {
      case COLLECTION_TYPES.GAMES:
        return { validator: gameSchema };
      case COLLECTION_TYPES.LOGS:
        return { validator: logSchema };
      default:
        return {};
    }
  }
}
