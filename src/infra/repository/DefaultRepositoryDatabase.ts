import { PrismaClientKnownRequestError, PrismaClientUnknownRequestError } from "@prisma/client/runtime/library";
import { BaseRepository, QueryParams } from "../../aplication/repository/BaseRepository";

type ParamsGeneric = {
  get: Function
  id: string
}
export class DefaultRepositoryDatabase<T extends ParamsGeneric> implements BaseRepository<T> {
  constructor(private readonly database: any) { }
  async list(query?: QueryParams | undefined): Promise<T[]> {
    return await this.database.findMany(query)
  }
  async save(data: T): Promise<any> {
    try {
      return await this.database.create({
        data: data.get(),
      })
    } catch (error: any) {
      if (error instanceof PrismaClientKnownRequestError) {
        console.log(error.message)
        throw new Error(`${error?.meta?.modelName} with the ${error?.meta?.target} field is already registered`)
      }
    }
  }
  async update(data: T): Promise<any> {
    return await this.database.update({
      where: { id: data.id },
      data: data,
    })
  }
  delete(id: string): Promise<any> {
    throw new Error("Method not implemented.");
  }
}