import { Transaction } from './../../src/domain/Transaction';

describe("Transaction", () => {
  test("should create Transaction", () => {
    const transaction = Transaction.create({
      amount: 100,
      receiverId: '123',
      senderId: '123'
    })
    expect(transaction).toBeInstanceOf(Transaction)
  })
  test("should new error with amount negative", () => {

    expect(() => Transaction.create({
      amount: -100,
      receiverId: '123',
      senderId: '123'
    })).toThrow("Amount negative")
  })
})