import { CreateTransaction } from './../../src/aplication/services/Transaction/createTransaction.service';
import { TransactionRepositoryDatabase } from './../../src/infra/repository/TransactionRepositoryDatabase';
import { PrismaClient } from '@prisma/client';
import { UserRepositoryDatabase } from '../../src/infra/repository/UserRepositoryDatabase';
import { NotifyService } from '../../src/aplication/services/Notify.service';
describe("Should transaction", () => {
  const client = new PrismaClient()

  test("Should create new transaction", async () => {

    const input = {
      value: 100,
      senderId: "577a603a-22df-4e6c-ae06-03ad3791e49c",
      receiverId: "e041bea2-67e8-4323-b956-c6a8b107cb2b"
    }
    const repositoryUser = new UserRepositoryDatabase(client)
    const repository = new TransactionRepositoryDatabase(client)
    const createTransaction = new CreateTransaction(repository, repositoryUser, new NotifyService())
    const ouput = await createTransaction.execute(input)
    console.log(ouput)
    const [trans] = await repository.list({
      where: {
        id: ouput.id
      }
    })
    expect(trans.id).toBeDefined()
  })

})