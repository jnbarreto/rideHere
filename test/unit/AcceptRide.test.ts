import GetAccountId from "../../src/application/usecase/getAccountById";
import GetRide from "../../src/application/usecase/GetRide";
import RequestRide from "../../src/application/usecase/RequestRide";
import AcceptRide from "../../src/application/usecase/AcceptRide";
import Signup from "../../src/application/usecase/signup";
import { PgPromiseAdapter } from "../../src/infra/database/DatabaseConnection";
import Registry from "../../src/infra/DI/Registry";
import { MailerGatewayMemory } from "../../src/infra/gateway/MaillerGateway";
import { AccountRepositoryDB } from "../../src/infra/repository/accountRepository";
import { RideRepositoryDB } from "../../src/infra/repository/RideRepository";

describe("Request Ride", () => {
  let signup: Signup;
  let getAccount: GetAccountId;
  let requestRide: RequestRide;
  let getRide: GetRide;
  let acceptRide: AcceptRide;
  beforeEach(() => {
    Registry.getInstance().provide(
      "accountRepository",
      new AccountRepositoryDB()
    );
    Registry.getInstance().provide("mailerGateway", new MailerGatewayMemory());
    Registry.getInstance().provide("rideRepository", new RideRepositoryDB());
    Registry.getInstance().provide(
      "databaseConnection",
      new PgPromiseAdapter()
    );
    signup = new Signup();
    getAccount = new GetAccountId();
    requestRide = new RequestRide();
    getRide = new GetRide();
    acceptRide = new AcceptRide();
  });
  test("deve aceitar uma corrida", async () => {
    const inputSignupPassenger = {
      email: `codee${Math.random()}@gmail.com`,
      password: "w@awx5cB",
      name: "codee tech",
      cpf: "995.525.810-10",
      carPlate: "",
      isPassenger: true,
      isDriver: false,
    };
    const inputSignupDriver = {
      email: `codee${Math.random()}@gmail.com`,
      password: "w@awx5cB",
      name: "codee tech",
      cpf: "995.525.810-10",
      carPlate: "AAA9999",
      isPassenger: false,
      isDriver: true,
    };
    const outputSignupPassenger = await signup.execute(inputSignupPassenger);
    const outputSignupDriver = await signup.execute(inputSignupDriver);

    const inputRequestRide = {
      passengerId: outputSignupPassenger.accountId,
      fromLat: -27.584905257808835,
      fromLong: -48.545022195325124,
      toLat: -27.496887588317275,
      toLong: -48.522234807851476,
    };
    const outputRequestRide = await requestRide.execute(inputRequestRide);
    const inputAcceptRide = {
      rideId: outputRequestRide.rideId,
      driverId: outputSignupDriver.accountId,
    }
    await acceptRide.execute(inputAcceptRide);
    const outputGetRide = await getRide.execute(outputRequestRide.rideId);
    expect(outputGetRide.status).toBe("accepted");
    expect(outputGetRide.driverId).toBe(outputSignupDriver.accountId);
  });

  test("não deve aceitar uma corrida que já foi aceita", async () => {
    const inputSignupPassenger = {
      email: `codee${Math.random()}@gmail.com`,
      password: "w@awx5cB",
      name: "codee tech",
      cpf: "995.525.810-10",
      carPlate: "",
      isPassenger: true,
      isDriver: false,
    };
    const inputSignupDriver = {
      email: `codee${Math.random()}@gmail.com`,
      password: "w@awx5cB",
      name: "codee tech",
      cpf: "995.525.810-10",
      carPlate: "AAA9999",
      isPassenger: false,
      isDriver: true,
    };
    const outputSignupPassenger = await signup.execute(inputSignupPassenger);
    const outputSignupDriver = await signup.execute(inputSignupDriver);

    const inputRequestRide = {
      passengerId: outputSignupPassenger.accountId,
      fromLat: -27.584905257808835,
      fromLong: -48.545022195325124,
      toLat: -27.496887588317275,
      toLong: -48.522234807851476,
    };
    const outputRequestRide = await requestRide.execute(inputRequestRide);
    const inputAcceptRide = {
      rideId: outputRequestRide.rideId,
      driverId: outputSignupDriver.accountId,
    }
    await acceptRide.execute(inputAcceptRide);
    await expect(() => acceptRide.execute(inputAcceptRide)).rejects.toThrow(new Error("Invalid status"));

  });



  afterEach(async () => {
    const connection = Registry.getInstance().inject("databaseConnection");
    await connection.close();
  });
});
