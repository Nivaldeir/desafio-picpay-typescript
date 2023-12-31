import { User } from "../../domain/User"

export class NotifyService {
  async sendNotification(user: User, message: string) {
    const email = user.email
    const config = {
      method: "GET",
    }
    const url = "https://run.mocky.io/v3/54dc2cf1-3add-45b5-b5a9-6bf7e7f1f4a6"
    const respose = await fetch(url, config)
    if (respose.status != 200) throw new Error("Error ao")
  }
}