import { TransactionRepository } from "../repository/TransactionRepository"
import { UserRepository } from "../repository/UserRepository"

export interface FactoryRepository {
  user(): UserRepository
  transaction(): TransactionRepository
}