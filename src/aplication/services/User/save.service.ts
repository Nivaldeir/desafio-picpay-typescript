import { User } from "../../../domain/User";
import { UserRepository } from "../../repository/UserRepository";

export class SaveUser {
  constructor(private readonly userService: UserRepository) { }
  async execute(user: User): Promise<void> {
    return this.userService.save(user)
  }
}