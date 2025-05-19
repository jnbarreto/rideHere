import AccountRepository from "../../infra/repository/accountRepository";
import { inject } from "../../infra/DI/Registry";
import Ride from "../../domain/entity/Ride";
import RideRepository from "../../infra/repository/RideRepository";

export default class RequestRide {
  @inject("accountRepository")
  accountRepository?: AccountRepository;
  @inject("rideRepository")
  rideRepository?: RideRepository;

  async execute(input: Input): Promise<Output> {
      const account = await this.accountRepository?.getAccountById(input.passengerId);
      if (!account) throw new Error("Account does not exist");
      if (account.isPassenger === false) throw new Error("Account must be from a passenger");
      const ride = Ride.create(input.passengerId, input.fromLat, input.fromLong, input.toLat, input.toLong);
      await this.rideRepository?.saveRide(ride);
      return {
        rideId: ride.getRideId(),
      }
  }
}

type Input = {
  passengerId: string;
  fromLat: number;
  fromLong: number;
  toLat: number;
  toLong: number;
}

type Output = {
  rideId: string;
}
