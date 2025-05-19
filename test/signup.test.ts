import Signup from "../src/application/usecase/signup";
import  {
  AccountDAODataBaseMemory,
  AccountRepositoryDB
} from "../src/infra/repository/accountRepository";
import { MailerGatewayMemory } from "../src/infra/gateway/MaillerGateway";
import Registry from "../src/infra/DI/Registry";
import GetAccountId from "../src/application/usecase/getAccountById";
import { PgPromiseAdapter } from "../src/infra/database/DatabaseConnection";

describe("Test Signup", () => {
  let signup: any;
  let getAccount: any;
  beforeEach(async () => {
    Registry.getInstance().provide("accountRepository", new AccountRepositoryDB());
    Registry.getInstance().provide("mailerGateway", new MailerGatewayMemory());
    Registry.getInstance().provide("databaseConnection", new PgPromiseAdapter());
    // const databaseConnect = new AccountDAODataBaseMemory();
    signup = new Signup();
    getAccount = new GetAccountId()
  });

  test("deve cadastrar um passageiro válido", async function () {
    const input = {
      email: `codee${Math.random()}@gmail.com`,
      password: "w@awx5cB",
      name: "codee tech",
      cpf: "995.525.810-10",
      carPlate: "",
      isPassenger: true,
      isDriver: false,
    };
    await expect(signup.execute(input)).resolves.toBeDefined();
  });

  test("deve cadastrar um passageiro inválido", async function () {
    const input = {
      email: `codee${Math.random()}@gmail.com`,
      password: "w^awx5cB",
      name: "codee tech",
      cpf: "995.525.810-11",
      carPlate: "",
      isPassenger: true,
      isDriver: false,
    };
    await expect(signup.execute(input)).rejects.toThrow("Invalid CPF");
  });

  test("deve retornar erro de usuário duplicado", async function () {
    const input = {
      email: `codee${Math.random()}@gmail.com`,
      password: "@Codee2025",
      name: "codee tech",
      cpf: "995.525.810-10",
      carPlate: "",
      isPassenger: true,
      isDriver: false,
    };
    await signup.execute(input);
    await expect(() => signup.execute(input)).rejects.toThrow(
      new Error("User already exists")
    );
  });

  test("deve cadastrar um motorista válido", async function () {
    const input = {
      email: `jhonDoe${Math.random()}@gmail.com`,
      password: "w^awx5cB",
      name: "codee tech",
      cpf: "995.525.810-10",
      carPlate: "ARZ6389",
      isPassenger: false,
      isDriver: true,
    };
    const result = await signup.execute(input);
    expect(result).toBeDefined();
  });
  afterEach(async ()=> {
      const connection = Registry.getInstance().inject("databaseConnection");
      await connection.close();
  })
});
