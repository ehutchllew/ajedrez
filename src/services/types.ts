export interface IService<TSchema> {
  delete(id: string): void;
  get(id: string): Promise<TSchema>;
  post(payload: TSchema): Promise<TSchema>;
  put(payload: Partial<TSchema>): Promise<TSchema>;
}
