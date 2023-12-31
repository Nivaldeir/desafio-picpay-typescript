import { PrismaClient } from "@prisma/client";
import { ServicesFactory } from "./aplication/factory/ServicesFactory";
import { ExpressAdapter } from "./infra/http/ExpressAdapter";
import { MainController } from "./infra/http/MainController";
import { RepositoryFactoryDatabase } from "./infra/database/factory/RepositoryFactoryDatabase";

const expressAdapter = new ExpressAdapter()
const client = new PrismaClient()
const repositoryDatabase = new RepositoryFactoryDatabase(client)
const factory = new ServicesFactory(repositoryDatabase)
new MainController(expressAdapter, factory)
expressAdapter.listen(3000, "0.0.0.0")

