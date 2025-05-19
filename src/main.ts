import {
  AccountDAODataBaseMemory,
  AccountRepositoryDB
} from "./infra/repository/accountRepository";
import { RideRepositoryDB } from "./infra/repository/RideRepository";
import { MailerGatewayMemory } from "./infra/gateway/MaillerGateway";
import Registry from "./infra/DI/Registry";
import { PgPromiseAdapter } from "./infra/database/DatabaseConnection";
import { ExpressAdapter } from "./infra/http/HttpServer";
import Signup from "./application/usecase/signup";
import GetAccountId from "./application/usecase/getAccountById";
import AccountController from "./infra/controller/AccountController";


const httpServer = new ExpressAdapter()
Registry.getInstance().provide("httpServer", httpServer);
Registry.getInstance().provide("databaseConnection",  new PgPromiseAdapter());
Registry.getInstance().provide("accountRepository", new AccountRepositoryDB());
Registry.getInstance().provide("rideRepository", new RideRepositoryDB());
Registry.getInstance().provide("mailerGateway", new MailerGatewayMemory());
Registry.getInstance().provide("signup", new Signup())
Registry.getInstance().provide("getAccountId", new GetAccountId())
Registry.getInstance().provide("accountController", new AccountController())

httpServer.listen(3002);
console.log("start in port 3002");
