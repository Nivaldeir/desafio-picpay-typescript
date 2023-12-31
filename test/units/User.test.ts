import { User } from './../../src/domain/User';

describe("User", () => {
  test("generate class User", () => {
    const user = User.create({
      balance: 100,
      document: "470.649.910-04",
      email: "user@example.com",
      firstName: "John",
      lastName: "Smith",
      password: "password",
      usertype: "MERCHANT"
    });
    expect(user).toBeInstanceOf(User)
  })
})