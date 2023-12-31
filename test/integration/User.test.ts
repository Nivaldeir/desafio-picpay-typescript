import { UserRepositoryDatabase } from '../../src/infra/repository/UserRepositoryDatabase';
import { User } from '../../src/domain/User';
import { PrismaClient } from '@prisma/client';
import { Email } from '../../src/domain/Email';
describe("Should User", () => {
  const user = User.create({
    balance: 100,
    document: "470.649.910-04",
    email: "user@example.com",
    firstName: "John",
    lastName: "Smith",
    password: "password",
    usertype: "MERCHANT"
  });
  test("should create new User", async () => {
    const client = new PrismaClient()
    const repository = new UserRepositoryDatabase(client)
    await repository.save(user);
    const [output] = await repository.list({
      where: {
        id: user.id,
      }
    })
    expect(output.id).toBe(user.id)
  })
  test("It should throw an error when registering user and email already registered", async () => {
    const client = new PrismaClient()
    const repository = new UserRepositoryDatabase(client)
    expect(async () => await repository.save(user)).rejects.toThrow("User with the email field is already registered")
  })
  test("It should throw an error when registering user and dcument already registered", async () => {
    user.email = new Email("user@example.com.btr")
    const client = new PrismaClient()
    const repository = new UserRepositoryDatabase(client)
    expect(async () => await repository.save(user)).rejects.toThrow("User with the document field is already registered")
  })
})