const regex =/[a-zA-Z] [a-zA-Z]+/

export default class Name {
    private name: string;
    constructor(name: string) {
        if (!regex.test(name)) throw new Error("Invalid Name")
        this.name = name;
    }

    getValue() {
        return this.name
    }
}