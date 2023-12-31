import { PrismaClient } from "@prisma/client";
import { UserRepositoryDatabase } from "../../infra/repository/UserRepositoryDatabase";
import { GetAllUser } from "../services/User/getAll.service";
import { SaveUser } from "../services/User/save.service";
import { FactoryRepository } from "./FactoryRepository";
import { CreateTransaction } from "../services/Transaction/createTransaction.service";
import { TransactionRepositoryDatabase } from '../../infra/repository/TransactionRepositoryDatabase';
import { NotifyService } from "../services/Notify.service";
import { ListTransaction } from "../services/Transaction/list.service";

export class ServicesFactory {
  private _client = new PrismaClient()

  private _userRepository: UserRepositoryDatabase
  private _transactionRepository: TransactionRepositoryDatabase
  constructor(readonly repositoryFactory: FactoryRepository) {
    this._transactionRepository = new TransactionRepositoryDatabase(this._client)
    this._userRepository = new UserRepositoryDatabase(this._client)
  }
  User() {
    return {
      list: new GetAllUser(this._userRepository),
      save: new SaveUser(this._userRepository),
    }
  }
  Transaction() {
    return {
      createTransation: new CreateTransaction(this._transactionRepository, this._userRepository, new NotifyService()),
      list: new ListTransaction(this._transactionRepository)
    }
  }
}