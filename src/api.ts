import express from "express";
import Signup from "./application/usecase/signup";
import GetAccountId from "./application/usecase/getAccountById";
import AccountRepositoryDataBase, {
  AccountDAODataBaseMemory,
} from "./infra/repository/accountRepository";

const app = express();
app.use(express.json());

app.post("/signup", async function (req, res) {
  const input = req.body;
  try {
    const databaseConnect = new AccountRepositoryDataBase();
    const signup = new Signup(databaseConnect);
    const output = await signup.execute(input);
    res.status(200).json(output);
  } catch (error: any) {
    res.status(422).json(`Error: ${error.message}`);
  }
});

app.get("/account/:id", async function (req, res) {
  try {
    const databaseConnect = new AccountRepositoryDataBase();
    const getAccount = new GetAccountId(databaseConnect);
    const output = await getAccount.execute(req.params.id);
    res.status(200).json(output);
  } catch (error: any) {
    res.status(422).json(`Error: ${error.message}`);
  }
});

app.listen(3002);
console.log("start in port 3002");
