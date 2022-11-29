export interface IService<TRequestModel, TClientModel> {
  delete(id: string): void;
  get(id: string): Promise<TClientModel | null>;
  post(sessionInfo: any): Promise<TClientModel>;
  put(id: string, payload: TRequestModel): Promise<TClientModel>;
}
