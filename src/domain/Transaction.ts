import { v4 } from "uuid";

type InputTransaction = {
  id: string;
  amount: number;
  senderId: string
  receiverId: string
  timestamp: Date;
}

export class Transaction {
  id: string;
  amount: Amount;
  senderId: string
  receiverId: string
  timestamp: Date;

  constructor(params: InputTransaction) {
    this.id = params.id;
    this.amount = new Amount(params.amount);
    this.senderId = params.senderId;
    this.receiverId = params.receiverId
    this.timestamp = params.timestamp;
  }
  static create(params: Omit<InputTransaction, "id" | "timestamp">) {
    return new Transaction({ ...params, id: v4(), timestamp: new Date() })
  }

  get() {
    return {
      id: this.id,
      amount: this.amount.value,
      senderId: this.senderId,
      receiverId: this.receiverId,
      timestamp: this.timestamp
    }
  }
}

class Amount {
  value: number;
  constructor(value: number) {
    if (value < 0) throw new Error("Amount negative")
    this.value = value
  }
}