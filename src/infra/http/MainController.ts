import { ServicesFactory } from "../../aplication/factory/ServicesFactory";
import { User } from "../../domain/User";
import { HttpServer } from "./httpServer";
export class MainController {
  constructor(private readonly route: HttpServer, private readonly repositoryService: ServicesFactory) {
    this.init()
  }
  private init() {
    this.route.on("post", "/users", async (_: any, body: any) => {
      const requiredFiels = ["firstName", "lastName", "document", "email", "balance", "password", "usertype"]
      const missingFileds = requiredFiels.filter(field => !(field in body))
      if (missingFileds.length > 0) {
        throw new Error(`Missing required fields: ${missingFileds.join(', ')}`);
      }
      const newUser = User.create({ ...body });
      return await this.repositoryService.User().save.execute(newUser)
    })

    this.route.on("get", "/users", async (__: any, _: any, query: any) => {
      const users = await this.repositoryService.User().list.execute()
      users.forEach(user => {
        user.balance = parseFloat(user.balance.toFixed(2))
      })
      return users
    })

    this.route.on("post", "/transaction", async (__: any, body: any) => {
      const requiredFields = ["receiverId", "senderId", "value"]
      const missingFields = requiredFields.filter(field => !(field in body))
      if (missingFields.length > 0) {
        throw new Error(`Missing required fields: ${missingFields.join(', ')}`);
      }
      return await this.repositoryService.Transaction().createTransation.execute(body)
    })

    this.route.on("get", "/transaction", async () => {
      return await this.repositoryService.Transaction().list.execute()
    })
  }
}