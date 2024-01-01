import { UserType } from "@prisma/client";
import { User } from "../../../domain/User";
import { UserRepository } from "../../repository/UserRepository";

export class SaveUser {
  constructor(private readonly userService: UserRepository) { }
  async execute(user: Input): Promise<void> {
    try {
      const newUser = User.create(user)
      await this.userService.save(newUser)
    } catch (error: any) {
      throw new Error(error)
    }
  }
}

type Input = {
  balance: number,
  document: string,
  email: string,
  firstName: string,
  lastName: string,
  password: string,
  usertype: UserType
}