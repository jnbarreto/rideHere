import UUID from "../valueObject/UUID";
import Coord from "../valueObject/Coord";
import RideStatus, { RideStatusFactory } from "../valueObject/RideStatus";

export default class Ride {
    private rideId: UUID;
    private passengerId: UUID;
    private driverId?: UUID;
    private from: Coord;
    private to: Coord;
    private status: RideStatus;
    private date: Date;

    constructor(rideId: string , passengerId: string, fromLat: number, fromLong: number, toLat: number, toLong: number, status: string, date: Date, driverId: string = '') {
        this.rideId = new UUID(rideId);
        this.passengerId = new UUID(passengerId);
        if(driverId) this.driverId = new UUID(driverId);
        this.from = new Coord(fromLat, toLat);
        this.to = new Coord(fromLong, toLong);
        this.status = RideStatusFactory.create(status, this);
        this.date = date;
    }

    static create (passengerId: string, fromLat: number, fromLong: number, toLat: number, toLong: number) {
        const uuid = UUID.create();
        const status = 'requested';
        const date = new Date();
        return new Ride(uuid.getValue(), passengerId, fromLat, fromLong, toLat, toLong, status, date);
    }

    getRideId() {
        return this.rideId.getValue();
    }

    getPassengerId() {
        return this.passengerId.getValue();
    }

    getDriverId() {
        return this.driverId?.getValue();
    }

    getFrom() {
        return this.from;
    }

    getTo() {
        return this.to;
    }

    getStatus() {
        return this.status.value;
    }

    getDate() {
        return this.date;
    }

    setStatus (status: RideStatus) {
		this.status = status;
	}

	accept (driverId: string) {
		this.status.accept();
		this.driverId = new UUID(driverId);
	}

	start () {
		this.status.start();
	}
}
