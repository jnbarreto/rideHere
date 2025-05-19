import GetAccountId from "../../application/usecase/getAccountById";
import Signup from "../../application/usecase/signup";
import { inject } from "../DI/Registry";
import HttpServer from "../http/HttpServer";

export default class AccountController {
    @inject("httpServer")
    httpServer?: HttpServer;
    @inject("signup")
    signup?: Signup;
    @inject("getAccountId")
    getAccountId?: GetAccountId;

    constructor() {
        this.httpServer?.register("post", "/signup", async  (params: any, body: any) => {
            const output = await this.signup?.execute(body);
            return output;
        });

        this.httpServer?.register("get","/account/:id", async (params: any, body: any) => {
            const output = await this.getAccountId?.execute(params.id);
            return output;
        });
    }
}
