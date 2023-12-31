import { User } from "../../../domain/User";
import { UserRepository } from "../../repository/UserRepository";

export class FindByIdUser {
  constructor(private readonly userService: UserRepository) {
  }
  async execute(id: string): Promise<User> {
    const [user] = await this.userService.list({ id: id });
    if (!user) throw new Error("User not found")
    return user;
  }
}