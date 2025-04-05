const regex =/[A-Z]{3}[0-9]{4}/

export default class CarPlate {
    private carPlate: string;
    constructor(carPlate: string) {
        if (!regex.test(carPlate)) throw new Error("Invalid Car Plate")
        this.carPlate = carPlate;
    }

    getValue() {
        return this.carPlate
    }
}