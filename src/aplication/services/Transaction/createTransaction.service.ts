import { UserType } from "@prisma/client";
import { Transaction } from "../../../domain/Transaction";
import { NotifyService } from "../Notify.service";
import { User } from "../../../domain/User";
import { TransactionRepository } from "../../repository/TransactionRepository";
import { UserRepository } from "../../repository/UserRepository";

export class CreateTransaction {
  constructor(private readonly transactionRepository: TransactionRepository, private readonly userRepository: UserRepository, private readonly notifyService: NotifyService) { }
  async execute(input: Input) {
    const [sender] = await this.userRepository.list({
      where: {
        id: input.senderId
      }
    })
    const [receiver] = await this.userRepository.list({
      where: {
        id: input.receiverId
      }
    });
    this.validadeTransaction(sender, input.value)
    if (!this.authrizaTransaction()) throw new Error("Not authenticated")
    const transaction = Transaction.create({
      amount: input.value,
      senderId: input.senderId,
      receiverId: input.receiverId
    })
    sender.balance = parseFloat(sender.balance.toFixed(2)) - input.value
    receiver.balance = parseFloat(receiver.balance.toFixed(2)) + input.value
    await this.transactionRepository.save(transaction)
    await this.userRepository.update(receiver)
    await this.userRepository.update(sender)
    await this.notifyService.sendNotification(sender, "Enviando")
    return {
      id: transaction.id,
      amount: transaction.amount.value,
      sender: sender,
      receiver: receiver,
    }
  }
  private validadeTransaction(sender: User,
    amount: number) {
    if (sender.usertype == UserType.MERCHANT) throw new Error("User from type common is not allowed")
    if (sender.balance < amount) throw new Error("Insufficient funds")
  }
  private async authrizaTransaction() {
    const config = {
      method: "GET",
    }
    const url = "https://run.mocky.io/v3/5794d450-d2e2-4412-8131-73d0293ac1cc"
    const respose = await fetch(url, config)
    if (respose.status == 200 && respose?.body) return true
    return false
  }
}

type Input = {
  value: number,
  senderId: string
  receiverId: string
}