import Signup from "../src/application/usecase/signup";
import AccountRepositoryDataBase from "../src/infra/repository/accountRepository";
import GetAccountId from "../src/application/usecase/getAccountById";
import { MailerGatewayMemory } from "../src/infra/gateway/MaillerGateway";
import Registry from "../src/infra/DI/Registry";

describe("Test Account By ID", () => {
  let account: { accountId: string };
  let getAccountId: any;

  beforeEach(async () => {
    const input = {
      email: `codee${Math.random()}@gmail.com`,
      password: "@Codee2025",
      name: "codee tech",
      cpf: "995.525.810-10",
      carPlate: "",
      isPassenger: true,
      isDriver: false,
    };
    const accountRepository = new AccountRepositoryDataBase();
    const mailerGateway =  new MailerGatewayMemory();
    Registry.getInstance().provide("accountRepository", accountRepository);
    Registry.getInstance().provide("mailerGateway", mailerGateway);
    const signup = new Signup();
    getAccountId = new GetAccountId();
    account = await signup.execute(input);
  });

  test("deve buscar um usuario valido pelo id", async function () {
    const accountData = await getAccountId.execute(account.accountId);
    expect(accountData.accountId).toBe(account.accountId);
  });

  test("deve buscar um usuario com id inválido", async function () {
    await expect(getAccountId.execute("321321321")).rejects.toThrow(
      "Account Not Found"
    );
  });
});
