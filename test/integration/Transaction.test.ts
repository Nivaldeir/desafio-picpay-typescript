import { CreateTransaction } from './../../src/aplication/services/Transaction/createTransaction.service';
import { NotifyService } from '../../src/aplication/services/Notify.service';
import { UserRepository } from '../../src/aplication/repository/UserRepository';
import { User } from '../../src/domain/User';
import { TransactionRepository } from '../../src/aplication/repository/TransactionRepository';

describe("Should transaction", () => {
  const userRepositoryMock: UserRepository = {
    list: jest.fn(),
    save: jest.fn(),
    update: jest.fn(),
    delete: jest.fn()
  }
  const transactionRepositoryMock: TransactionRepository = {
    list: jest.fn(),
    save: jest.fn(),
    update: jest.fn(),
    delete: jest.fn()
  }
  beforeAll(async () => {
    const user_1 = User.create({
      balance: 100,
      document: "398.205.360-90",
      email: "user@example.com",
      firstName: "John",
      lastName: "Smith",
      password: "password",
      usertype: "COMMON"
    })
    const user_2 = User.create({
      balance: 1000,
      document: "398.205.360-90",
      email: "user@example.com",
      firstName: "John",
      lastName: "Smith",
      password: "password",
      usertype: "COMMON"
    })
    jest.spyOn(userRepositoryMock, 'list').mockResolvedValue([user_1, user_2]);
    jest.spyOn(transactionRepositoryMock, 'save')
    jest.spyOn(transactionRepositoryMock, 'list')
  })

  beforeEach(() => {
    jest.clearAllMocks();
  });
  test("Should create new transaction", async () => {
    const users = await userRepositoryMock.list();
    const input = {
      value: 100,
      senderId: users[0].id,
      receiverId: users[1].id
    }
    // const repository = new TransactionRepositoryDatabase(client)
    const createTransaction = new CreateTransaction(transactionRepositoryMock, userRepositoryMock, new NotifyService())
    const ouput = await createTransaction.execute(input)
    expect(ouput.id).toBeDefined()
  })
})