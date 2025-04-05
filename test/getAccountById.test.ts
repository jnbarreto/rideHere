import Signup from "../src/application/usecase/signup";
import AccountDAODataBase from "../src/infra/repository/accountDAO";
import GetAccountId from "../src/application/usecase/getAccountById";

describe("Test Account By ID", () => {
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

  test("deve buscar um usuario valido pelo id", async function () {
    const accountData = await getAccountId.execute(account.accountId);
    expect(accountData.account_id).toBe(account.accountId);
  });

  test("deve buscar um usuario com id inválido", async function () {
    await expect(getAccountId.execute("321321321")).rejects.toThrow(
      "Account Not Found"
    );
  });
});
