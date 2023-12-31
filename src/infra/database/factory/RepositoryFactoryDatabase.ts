import { FactoryRepository } from "../../../aplication/factory/FactoryRepository"
import { TransactionRepository } from "../../../aplication/repository/TransactionRepository";
import { UserRepository } from "../../../aplication/repository/UserRepository";
import { TransactionRepositoryDatabase } from "../../repository/TransactionRepositoryDatabase";
import { UserRepositoryDatabase } from "../../repository/UserRepositoryDatabase";

export class RepositoryFactoryDatabase implements FactoryRepository {
  constructor(private readonly connection: any) { }
  transaction(): TransactionRepository {
    return new TransactionRepositoryDatabase(this.connection)
  }
  user(): UserRepository {
    return new UserRepositoryDatabase(this.connection);
  }
}