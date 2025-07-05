import { inject } from "../../infra/DI/Registry";
import PositionRepository from "../../infra/repository/PositionRepository";
import RideRepository from "../../infra/repository/RideRepository";

export default class GetRide {
  @inject("rideRepository")
  rideRepository?: RideRepository;
  @inject("positionRepository")
  positionRepository?: PositionRepository;

  async execute(rideId: string): Promise<Output> {
    const ride = await this.rideRepository?.getRideById(rideId);
    if (!ride) throw new Error("Ride not found");
    const positions = await this.positionRepository?.getPositionByRideId(rideId);
    const distance = ride.getDistance(positions || []);
    return {
      rideId: ride.getRideId(),
      passengerId: ride.getPassengerId(),
      fromLat: ride.getFrom().getLat(),
      fromLong: ride.getFrom().getLong(),
      toLat: ride.getTo().getLat(),
      toLong: ride.getTo().getLong(),
      status: ride.getStatus(),
      driverId: ride.getDriverId(),
      positions: positions || [],
      distance,
    };
  }
}

type Output = {
  rideId: string,
  passengerId: string,
  fromLat: number,
  fromLong: number,
  toLat: number,
  toLong: number,
  status: string,
  driverId?: string,
  positions: any[],
  distance: number,
};
