import { TransactionRepository } from "../../repository/TransactionRepository";

export class ListTransaction {
  constructor(private readonly _transactinoRepository: TransactionRepository) { }
  async execute() {
    return await this._transactinoRepository.list({
      include: {
        receiver: true,
        sender: true
      }
    })
  }
}