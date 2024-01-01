import { UserType } from "@prisma/client";
import { User } from "../../../domain/User";
import { UserRepository } from "../../repository/UserRepository";

export class SaveUser {
  constructor(private readonly userService: UserRepository) { }
  async execute(user: Input): Promise<void> {
    const newUser = User.create(user)
    return this.userService.save(newUser)
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