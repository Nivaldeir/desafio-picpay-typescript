import { PrismaClient } from '@prisma/client';
import { User } from '../../domain/User';
import { DefaultRepositoryDatabase } from "./DefaultRepositoryDatabase";

export class UserRepositoryDatabase extends DefaultRepositoryDatabase<User> {
  constructor(private readonly client: PrismaClient) {
    super(client["user"]);
  }
}