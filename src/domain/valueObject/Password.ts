const regex =/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&^])[A-Za-z\d@$!%*?&^]{8,}$/

export default class Password {
    private password: string;
    constructor(password: string) {
        if (!regex.test(password)) throw new Error("Invalid Password")
        this.password = password;
    }

    getValue() {
        return this.password
    }
}