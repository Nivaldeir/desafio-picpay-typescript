import { Transaction } from "../../../domain/Transaction";
import { TransactionRepository } from "../../repository/TransactionRepository";

export class SaveTransaction {
  constructor(private readonly transactionRepository: TransactionRepository) { }
  async execute(input: Transaction) {
    await this.transactionRepository.save(input);
  }
}