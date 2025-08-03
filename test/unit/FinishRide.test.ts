import GetAccountId from "../../src/application/usecase/getAccountById";
import GetRide from "../../src/application/usecase/GetRide";
import RequestRide from "../../src/application/usecase/RequestRide";
import StartRide from "../../src/application/usecase/StartRide";
import AcceptRide from "../../src/application/usecase/AcceptRide";
import UpdatePosition from "../../src/application/usecase/UpdatePosition";
import FinishRide from "../../src/application/usecase/FinishRide";
import Signup from "../../src/application/usecase/signup";
import { PgPromiseAdapter } from "../../src/infra/database/DatabaseConnection";
import Registry from "../../src/infra/DI/Registry";
import { MailerGatewayMemory } from "../../src/infra/gateway/MaillerGateway";
import { AccountRepositoryDB } from "../../src/infra/repository/accountRepository";
import { RideRepositoryDB } from "../../src/infra/repository/RideRepository";
import { PositionRepositoryDB } from "../../src/infra/repository/PositionRepository";
import ProcessPayment from "../../src/application/usecase/ProcessPayment"
import GenerateInvoice from "../../src/application/usecase/GenerateInvoice"
import Mediator from "../../src/infra/mediator/Mediator";

describe("Finish Ride", () => {
  let signup: Signup;
  let getAccount: GetAccountId;
  let requestRide: RequestRide;
  let getRide: GetRide;
  let acceptRide: AcceptRide;
  let startRide: StartRide;
  let updatePosition: UpdatePosition;
  let finishRide: FinishRide;

  beforeEach(() => {
    const processPayment = new ProcessPayment();
    const generateInvoice = new GenerateInvoice();
    const mediator = new Mediator();
    mediator.register('rideCompleted', async function (event: any) {
      await processPayment.execute(event);
      await generateInvoice.execute(event)
    })
    Registry.getInstance().provide(
      "accountRepository",
      new AccountRepositoryDB()
    );
    Registry.getInstance().provide("mediator", mediator)
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
    acceptRide = new AcceptRide();
    startRide = new StartRide();
    updatePosition = new UpdatePosition();
    finishRide = new FinishRide();
  });
  test("deve finalizar a corrida em horario comercial", async () => {
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
    const inputStartRide = {
      rideId:outputRequestRide.rideId,
    }
    await startRide.execute(inputStartRide);
    const inputUpdatePosition1 = {
      rideId: outputRequestRide.rideId,
      lat: -27.584905257808835,
      long: -48.545022195325124,
      date: new Date("2025-03-05T10:00:00")
    };
    await updatePosition.execute(inputUpdatePosition1);
    const inputUpdatePosition2 = {
      rideId: outputRequestRide.rideId,
      lat: -27.496887588317275,
      long: -48.522234807851476,
      date: new Date("2025-03-05T10:00:00")
    }
    await updatePosition.execute(inputUpdatePosition2);
    const inputUpdatePosition3 = {
      rideId: outputRequestRide.rideId,
      lat: -27.584905257808835,
      long: -48.545022195325124,
      date: new Date("2025-03-05T10:00:00")
    };
    await updatePosition.execute(inputUpdatePosition3);
    const inputUpdatePosition4 = {
      rideId: outputRequestRide.rideId,
      lat: -27.496887588317275,
      long: -48.522234807851476,
      date: new Date("2025-03-05T10:00:00")
    }
    await updatePosition.execute(inputUpdatePosition4);
    const inputFinishRide = {
      rideId: outputRequestRide.rideId
    }
    await finishRide.execute(inputFinishRide);
    const outputGetRide = await getRide.execute(outputRequestRide.rideId);
    expect(outputGetRide.distance).toBe(30);
    expect(outputGetRide.fare).toBe(63);
    expect(outputGetRide.status).toBe("completed");
  });

  test("deve finalizar a corrida em horario noturno", async () => {
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
    const inputStartRide = {
      rideId:outputRequestRide.rideId,
    }
    await startRide.execute(inputStartRide);
    const inputUpdatePosition1 = {
      rideId: outputRequestRide.rideId,
      lat: -27.584905257808835,
      long: -48.545022195325124,
      date: new Date("2025-03-05T23:00:00")
    };
    await updatePosition.execute(inputUpdatePosition1);
    const inputUpdatePosition2 = {
      rideId: outputRequestRide.rideId,
      lat: -27.496887588317275,
      long: -48.522234807851476,
      date: new Date("2025-03-05T23:00:00")
    }
    await updatePosition.execute(inputUpdatePosition2);
    const inputUpdatePosition3 = {
      rideId: outputRequestRide.rideId,
      lat: -27.584905257808835,
      long: -48.545022195325124,
      date: new Date("2025-03-05T23:00:00")
    };
    await updatePosition.execute(inputUpdatePosition3);
    const inputUpdatePosition4 = {
      rideId: outputRequestRide.rideId,
      lat: -27.496887588317275,
      long: -48.522234807851476,
      date: new Date("2025-03-05T23:00:00")
    }
    await updatePosition.execute(inputUpdatePosition4);
    const inputFinishRide = {
      rideId: outputRequestRide.rideId
    }
    await finishRide.execute(inputFinishRide);
    const outputGetRide = await getRide.execute(outputRequestRide.rideId);
    expect(outputGetRide.distance).toBe(30);
    expect(outputGetRide.fare).toBe(117);
    expect(outputGetRide.status).toBe("completed");
  });

  test("deve finalizar a corrida em horario promocional", async () => {
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
    const inputStartRide = {
      rideId:outputRequestRide.rideId,
    }
    await startRide.execute(inputStartRide);
    const inputUpdatePosition1 = {
      rideId: outputRequestRide.rideId,
      lat: -27.584905257808835,
      long: -48.545022195325124,
      date: new Date("2025-03-01T23:00:00")
    };
    await updatePosition.execute(inputUpdatePosition1);
    const inputUpdatePosition2 = {
      rideId: outputRequestRide.rideId,
      lat: -27.496887588317275,
      long: -48.522234807851476,
      date: new Date("2025-03-01T23:00:00")
    }
    await updatePosition.execute(inputUpdatePosition2);
    const inputUpdatePosition3 = {
      rideId: outputRequestRide.rideId,
      lat: -27.584905257808835,
      long: -48.545022195325124,
      date: new Date("2025-03-01T23:00:00")
    };
    await updatePosition.execute(inputUpdatePosition3);
    const inputUpdatePosition4 = {
      rideId: outputRequestRide.rideId,
      lat: -27.496887588317275,
      long: -48.522234807851476,
      date: new Date("2025-03-01T23:00:00")
    }
    await updatePosition.execute(inputUpdatePosition4);
    const inputFinishRide = {
      rideId: outputRequestRide.rideId
    }
    await finishRide.execute(inputFinishRide);
    const outputGetRide = await getRide.execute(outputRequestRide.rideId);
    expect(outputGetRide.distance).toBe(30);
    expect(outputGetRide.fare).toBe(30);
    expect(outputGetRide.status).toBe("completed");
  });

  afterEach(async () => {
    const connection = Registry.getInstance().inject("databaseConnection");
    await connection.close();
  });
});
