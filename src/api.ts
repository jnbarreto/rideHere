import express from "express";
import Signup from "./application/usecase/signup";
import GetAccountId from "./application/usecase/getAccountById";
import AccountRepositoryDataBase, {
  AccountDAODataBaseMemory,
} from "./infra/repository/accountRepository";
import { MailerGatewayMemory } from "./infra/gateway/MaillerGateway";
import Registry from "./infra/DI/Registry";

const app = express();
app.use(express.json());
// app.use(cors());

const accountRepository = new AccountRepositoryDataBase();
const mailerGateway = new MailerGatewayMemory();
Registry.getInstance().provide("accountRepository", accountRepository);
Registry.getInstance().provide("mailerGateway", mailerGateway)

app.post("/signup", async function (req, res) {
  const input = req.body;
  try {
    const signup = new Signup();
    const output = await signup.execute(input);
    res.status(200).json(output);
  } catch (error: any) {
    res.status(422).json(`Error: ${error.message}`);
  }
});

app.get("/account/:id", async function (req, res) {
  try {
    const getAccount = new GetAccountId(accountRepository);
    const output = await getAccount.execute(req.params.id);
    res.status(200).json(output);
  } catch (error: any) {
    res.status(422).json(`Error: ${error.message}`);
  }
});

app.listen(3002);
console.log("start in port 3002");
