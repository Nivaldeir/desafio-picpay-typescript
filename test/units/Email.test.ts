import { Email } from './../../src/domain/Email';
describe("Email", () => {
  test('should email valid', () => {
    const isValid = new Email('john.doe@gmail.com');
    expect(isValid).toBeTruthy()
  })
  test('should throw error with email not valid', () => {
    const email = "john.doe@gmail";
    expect(() => new Email(email)).toThrow(new Error("Invalid email"))
  })
})