export default class UUID {
    private id: string;

    constructor(id: string) {
        this.id = id;
    }

    static generateUUID(){
        const id = crypto.randomUUID();
        return new UUID(id);
    }

    getValue() {
        return this.id
    }
}