
import express, { Response, Request } from "express"
import swaggerUi from "swagger-ui-express"
import { HttpServer } from "./httpServer";
import cors from "cors"
import path from "path"
const configSwagger = require(path.resolve("swagger.json"))
export class ExpressAdapter implements HttpServer {
  private app: any
  constructor() {
    this.app = express();
    this.app.use(express.json());
    this.app.use(cors())
    this.app.use("/docs",
      swaggerUi.serve,
      swaggerUi.setup(configSwagger))
  }
  on(method: string, url: string, callback: Function): void {
    this.app[method](url, async function (req: Request, res: Response) {
      // try {
        const output = await callback(req.params, req.body)
        res.json(output)
      // } catch (e: any) {
        // res.status(425).send({
        //   error: true,
        //   message: e.message
        // })
      // }
    })
  }
  listen(port: number, host: string): void {
    this.app.listen(port, host)
    console.log("listening on port " + host + port);
  }
}