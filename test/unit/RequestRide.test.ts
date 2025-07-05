import GetAccountId from "../../src/application/usecase/getAccountById";
import GetRide from "../../src/application/usecase/GetRide";
import RequestRide from "../../src/application/usecase/RequestRide";
import Signup from "../../src/application/usecase/signup";
import { PgPromiseAdapter } from "../../src/infra/database/DatabaseConnection";
import Registry from "../../src/infra/DI/Registry";
import { MailerGatewayMemory } from "../../src/infra/gateway/MaillerGateway";
import { AccountRepositoryDB } from "../../src/infra/repository/accountRepository";
import { PositionRepositoryDB } from "../../src/infra/repository/PositionRepository";
import { RideRepositoryDB } from "../../src/infra/repository/RideRepository";

describe("Request Ride", () => {
  let signup: Signup;
  let getAccount: GetAccountId;
  let requestRide: RequestRide;
  let getRide: GetRide;
  beforeEach(() => {
    Registry.getInstance().provide(
      "accountRepository",
      new AccountRepositoryDB()
    );
    Registry.getInstance().provide("mailerGateway", new MailerGatewayMemory());
    Registry.getInstance().provide("rideRepository", new RideRepositoryDB());
    Registry.getInstance().provide("positionRepository", new PositionRepositoryDB());
    Registry.getInstance().provide(
      "databaseConnection",
      new PgPromiseAdapter()
    );
    signup = new Signup();
    getAccount = new GetAccountId();
    requestRide = new RequestRide();
    getRide = new GetRide();
  });
  test("deve solicitar uma corrida", async () => {
    const inputSignup = {
      email: `codee${Math.random()}@gmail.com`,
      password: "w@awx5cB",
      name: "codee tech",
      cpf: "995.525.810-10",
      carPlate: "",
      isPassenger: true,
      isDriver: false,
    };
    const outputSignup = await signup.execute(inputSignup);
    const inputRequestRide = {
      passengerId: outputSignup.accountId,
      fromLat: -27.584905257808835,
      fromLong: -48.545022195325124,
      toLat: -27.496887588317275,
      toLong: -48.522234807851476,
    };
    const outputRequestRide = await requestRide.execute(inputRequestRide);
    expect(outputRequestRide.rideId).toBeDefined();
    const outputGetRide = await getRide.execute(outputRequestRide.rideId);
    expect(outputGetRide.rideId).toBe(outputRequestRide.rideId);
    expect(outputGetRide.passengerId).toBe(inputRequestRide.passengerId);
    expect(outputGetRide.fromLat).toBe(inputRequestRide.fromLat);
    expect(outputGetRide.fromLong).toBe(inputRequestRide.fromLong);
    expect(outputGetRide.toLat).toBe(inputRequestRide.toLat);
    expect(outputGetRide.toLong).toBe(inputRequestRide.toLong);
    expect(outputGetRide.status).toBe("requested");
  });

  test("Não deve solicitar uma corrida se a conta não for de um passageiro", async function () {
    const inputSignup = {
      email: `codee${Math.random()}@gmail.com`,
      password: "w@awx5cB",
      name: "codee tech",
      cpf: "995.525.810-10",
      carPlate: "AAA1111",
      isPassenger: false,
      isDriver: true,
    };
    const outputSignup = await signup.execute(inputSignup);
    const inputRequestRide = {
      passengerId: outputSignup.accountId,
      fromLat: -27.584905257808835,
      fromLong: -48.545022195325124,
      toLat: -27.496887588317275,
      toLong: -48.522234807851476,
    };
    await expect(() => requestRide.execute(inputRequestRide)).rejects.toThrow(
      new Error("Account must be from a passenger")
    );
  });

  afterEach(async () => {
    const connection = Registry.getInstance().inject("databaseConnection");
    await connection.close();
  });
});
