export interface BaseRepository<T> {
  list(query?: QueryParams): Promise<T[]>
  save(data: T): Promise<any>
  update(data: T, options?: any): Promise<any>
  delete(id: string): Promise<any>
}

export interface QueryParams {}