const regex =/^(.+)@(.+)$/

export default class Email {
    private email: string;
    constructor(email: string) {
        if (!regex.test(email)) throw new Error("Invalid Email")
        this.email = email;
    }

    getValue() {
        return this.email
    }
}