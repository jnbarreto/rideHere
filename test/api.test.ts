import axios from "axios";
import Signup from "../src/signup";
import AccountDAODataBase from "../src/accountDAO";
import GetAccountId from "../src/getAccountById";

describe("Test Integrarion", () => {
  let account: { accountId: string };
  let getAccountId: any;

  beforeAll(async () => {
    const input = {
      email: `codee${Math.random()}@gmail.com`,
      password: "@Codee2025",
      name: "codee tech",
      cpf: "995.525.810-10",
      carPlate: "",
      isPassenger: true,
      isDriver: false,
    };
    const databaseConnect = new AccountDAODataBase();
    const signup = new Signup(databaseConnect);
    getAccountId = new GetAccountId(databaseConnect);
    account = await signup.execute(input);
  });

  test("deve cadastrar um passageiro válido", async function () {
    const request = await axios.post("http://localhost:3002/signup", {
      email: `codee${Math.random()}@gmail.com`,
      password: "@Codee2025",
      name: "codee tech",
      cpf: "995.525.810-10",
      carPlate: "",
      isPassenger: true,
      isDriver: false,
    });
    expect(request.status).toBe(200);
  });

  test("deve verifícar se a api retorna o usuário pelo id", async function () {
    const accountData = await axios.get(
      `http://localhost:3002/account/${account.accountId}`
    );
    expect(accountData.status).toBe(200);
  });
});
