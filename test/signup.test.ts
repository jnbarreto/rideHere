import Signup from "../src/application/usecase/signup";
import AccountRepositoryDataBase, {
  AccountDAODataBaseMemory,
} from "../src/infra/repository/accountRepository";
import { MailerGatewayMemory } from "../src/infra/gateway/MaillerGateway";
import Registry from "../src/infra/DI/Registry";
import GetAccountId from "../src/application/usecase/getAccountById";

describe("Test Signup", () => {
  let signup: any;
  let getAccount: any;
  beforeEach(async () => {
    const accountRepository = new AccountRepositoryDataBase();
    const mailerGateway = new MailerGatewayMemory();
    Registry.getInstance().provide("accountRepository", accountRepository);
    Registry.getInstance().provide("mailerGateway", mailerGateway);
    // const databaseConnect = new AccountDAODataBaseMemory();
    signup = new Signup();
    getAccount = new GetAccountId(accountRepository)
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

  test("deve retornar erro de nome inválido", async function () {
    const input = {
      email: `codee${Math.random()}@gmail.com`,
      password: "w^awx5cB",
      name: "codee",
      cpf: "995.525.810-10",
      carPlate: "",
      isPassenger: true,
      isDriver: false,
    };
    await expect(signup.execute(input)).rejects.toThrow("Invalid Name");
  });

  test("deve retornar erro de email inválido", async function () {
    const input = {
      email: `codee${Math.random()}gmail.com`,
      password: "w^awx5cB",
      name: "codee tech",
      cpf: "995.525.810-10",
      carPlate: "",
      isPassenger: true,
      isDriver: false,
    };
    await expect(signup.execute(input)).rejects.toThrow("Invalid Email");
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

  test("deve retornar erro de car plate inválido", async function () {
    const input = {
      email: `codee${Math.random()}@gmail.com`,
      password: "w^awx5cB",
      name: "codee tech",
      cpf: "995.525.810-10",
      carPlate: "abc",
      isPassenger: false,
      isDriver: true,
    };
    await expect(signup.execute(input)).rejects.toThrow("Invalid Car Plate");
  });
});
