import Coord from "../valueObject/Coord";
import UUID from "../valueObject/UUID";

export default class Position {
    positionId: UUID;
    rideId: UUID;
    coord: Coord;

    constructor (positionId: string, rideId: string, lat: number, long: number, readonly date: Date) {
        this.positionId = new UUID(positionId);
        this.rideId = new UUID(rideId);
        this.coord = new Coord(lat, long);
    }

    static create (rideId: string, lat: number, long: number) {
        const positionId = UUID.create().getValue();
        const date = new Date();
        return new Position(positionId, rideId, lat, long, date);
    }

    setCoord(lat: number, long: number) {
        this.coord = new Coord(lat, long);
    }
}
