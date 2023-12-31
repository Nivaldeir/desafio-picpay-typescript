import { PrismaClient } from '@prisma/client';
import { DefaultRepositoryDatabase } from "./DefaultRepositoryDatabase";
import { Transaction } from '../../domain/Transaction';

export class TransactionRepositoryDatabase extends DefaultRepositoryDatabase<Transaction> {
  constructor(private readonly client: PrismaClient) {
    super(client["transaction"]);
  }
}