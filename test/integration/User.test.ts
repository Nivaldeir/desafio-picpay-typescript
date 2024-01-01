import { SaveUser } from './../../src/aplication/services/User/save.service';
import { UserRepository } from '../../src/aplication/repository/UserRepository';
import { UserType } from '@prisma/client';
describe("Should User", () => {
  const userRepositoryMock: UserRepository = {
    list: jest.fn(),
    save: jest.fn(),
    update: jest.fn(),
    delete: jest.fn()
  }
  beforeAll(async () => {
    jest.spyOn(userRepositoryMock, "save")
  })


  test("should create new User", async () => {
    const input = {
      balance: 100,
      document: "470.649.910-04",
      email: "user@example.com",
      firstName: "John",
      lastName: "Smith",
      password: "password",
      usertype: UserType.COMMON
    }
    const createUser = new SaveUser(userRepositoryMock)
    await createUser.execute(input)
  })
  test("It should throw an error when registering user and email already registered", async () => {
    const input = {
      balance: 100,
      document: "470.649.910-04",
      email: "user@example",
      firstName: "John",
      lastName: "Smith",
      password: "password",
      usertype: UserType.COMMON
    }
    const createUser = new SaveUser(userRepositoryMock)
    expect(async () => await createUser.execute(input)).rejects.toThrow("Error: Invalid email")
  })
})