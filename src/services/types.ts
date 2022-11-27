export interface IService<TSchema> {
  delete(id: string): void;
  get(id: string): Promise<TSchema>;
  post(sessionInfo: any): Promise<TSchema>;
  put(payload: TSchema): Promise<TSchema>;
}
